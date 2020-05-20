import io
import json
from typing import Optional # required for "Optional[type]"
from PIL import Image
from flask import Flask, jsonify, request

from torch import nn
from torch import Tensor
from torchvision import models
import torchvision.transforms as transforms
import torch
import torchvision

from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)
UPLOAD_FOLDER = './uploaded_images/'
ALLOWED_EXTENSIONS = {'png', 'dcm'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#CLASSES: [0] covid, [1] opacity, [2] nofinding 
imagenet_class_index = json.load(open('covid_model.json'))

################ MODEL ################
device = torch.device("cpu")

class Flatten(nn.Module):
    "Flatten `x` to a single dimension, often used at the end of a model. `full` for rank-1 tensor"
    def __init__(self, full:bool=False):
        super().__init__()
        self.full = full

    def forward(self, x):
        return x.view(-1) if self.full else x.view(x.size(0), -1)

class AdaptiveConcatPool2d(nn.Module):
    "Layer that concats `AdaptiveAvgPool2d` and `AdaptiveMaxPool2d`." # from pytorch
    def __init__(self, sz:Optional[int]=None): 
        "Output will be 2*sz or 2 if sz is None"
        super().__init__()
        self.output_size = sz or 1
        self.ap = nn.AdaptiveAvgPool2d(self.output_size)
        self.mp = nn.AdaptiveMaxPool2d(self.output_size)
    def forward(self, x): return torch.cat([self.mp(x), self.ap(x)], 1)
    
def myhead(nf, nc):
    '''
    Inputs: nf=  # of in_features in the 4th layer , nc= # of classes
    '''
    return \
    nn.Sequential(        # the dropout is needed otherwise you cannot load the weights
            AdaptiveConcatPool2d(),
            Flatten(),
            nn.BatchNorm1d(nf,eps=1e-05,momentum=0.1,affine=True,track_running_stats=True),
            nn.Dropout(p=0.25,inplace=False),
            nn.Linear(nf, 512,bias=True),
            nn.ReLU(inplace=True),
            nn.BatchNorm1d(512,eps=1e-05,momentum=0.1,affine=True,track_running_stats=True),
            nn.Dropout(p=0.5,inplace=False),
            nn.Linear(512, nc,bias=True),
        )


my_model=torchvision.models.resnet34() 
modules=list(my_model.children())
modules.pop(-1) 
modules.pop(-1) 
temp=nn.Sequential(nn.Sequential(*modules))
tempchildren=list(temp.children()) 

#append the special fastai head
#Configured according to Model Architecture

tempchildren.append(myhead(1024,3))
model_r34=nn.Sequential(*tempchildren)

#LOAD MODEL
state = torch.load('corona_resnet34.pth',map_location=torch.device('cpu'))
model_r34.load_state_dict(state['model'])

#important to set to evaluation mode
model_r34.eval()

################ MODEL ################

def transform_image(image_bytes):
    test_transforms = transforms.Compose([
    transforms.Resize(512),
    transforms.CenterCrop(512),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225])])
    image= Image.open(io.BytesIO(image_bytes))
    return test_transforms(image).unsqueeze(0)
    
def get_prediction(image_bytes):
    
    tensor = transform_image(image_bytes=image_bytes)
    
    outputs = model_r34.forward(tensor)
    _, y_hat = outputs.max(1)
    predicted_idx = str(y_hat.item())
    return imagenet_class_index[predicted_idx]
    
@app.route('/', methods=['POST'])
def predict():
    if request.method == 'POST':
        # we will get the file from the request
        data = dict(request.files)
        images = []
        for key in data.keys():
            images.append(data[key])
        
        result = []
        for image in images:
        # convert that to bytes
            img_bytes = image.read()
            import pdb
            pdb.set_trace()
            prediction= get_prediction(image_bytes=img_bytes)
            result.append({"image":image.filename,"result":prediction})
            

        return jsonify(predictions=result)

if __name__ == '__main__':
    app.run()