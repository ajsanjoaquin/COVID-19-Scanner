#############################GRAD-Cam#############################

#@title Grad-CAM code with full-credit to Jimin Tan (https://github.com/tanjimin/grad-cam-pytorch-light)
import torch ,cv2
from PIL import Image
import numpy as np
import os
class InfoHolder():

    def __init__(self, heatmap_layer):
        self.gradient = None
        self.activation = None
        self.heatmap_layer = heatmap_layer

    def get_gradient(self, grad):
        self.gradient = grad

    def hook(self, model, input, output):
        if output.requires_grad:
            output.register_hook(self.get_gradient)
        self.activation = output.detach()

def generate_heatmap(weighted_activation):
    raw_heatmap = torch.mean(weighted_activation, 0)
    heatmap = np.maximum(raw_heatmap.detach().cpu(), 0)
    heatmap /= torch.max(heatmap) + 1e-10
    return heatmap.numpy()

def superimpose(input_img, heatmap):
    img = to_RGB(input_img)  
    heatmap = cv2.resize(heatmap, (img.shape[0], img.shape[1]))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    superimposed_img = np.uint8(heatmap * 0.6 + img * 0.4)
    pil_img = cv2.cvtColor(superimposed_img,cv2.COLOR_BGR2RGB)
    return pil_img

def to_RGB(tensor):
    tensor = (tensor - tensor.min())
    tensor = tensor/(tensor.max() + 1e-10)
    image_binary = np.transpose(tensor.numpy(), (1, 2, 0))
    image = np.uint8(255 * image_binary)
    return image

def grad_cam(model, input_tensor, heatmap_layer, truelabel=None):
    
    info = InfoHolder(heatmap_layer)
    heatmap_layer.register_forward_hook(info.hook)
    
    output = model(input_tensor.unsqueeze(0))[0]
    truelabel = truelabel if truelabel else torch.argmax(output)

    output[truelabel].backward()

    weights = torch.mean(info.gradient, [0, 2, 3])
    activation = info.activation.squeeze(0)

    weighted_activation = torch.zeros(activation.shape)
    for idx, (weight, activation) in enumerate(zip(weights, activation)):
        weighted_activation[idx] = weight * activation
    heatmap = generate_heatmap(weighted_activation)
    return superimpose(input_tensor, heatmap)

def use_gradcam(img_path,dest_path,model,transforms):
    image=Image.open(img_path).convert('RGB')
    layer4=model[0][-1]
    heatmap_layer=layer4[2].conv2
    input_tensor=transforms(image)

    #get filename without extension
    filename=os.path.splitext(os.path.basename(img_path))[0]
    grad_cam_image= grad_cam(model, input_tensor, heatmap_layer)
    cv2.imwrite(dest_path+'/(gradcam)'+filename+'.png',grad_cam_image)