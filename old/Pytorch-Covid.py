## The code below gives you Flatten and the double Adaptive Pooling (from fastai), plus
## a viable head. You must fill the number of FC's nodes manually through the myhead function
from torch import Tensor
from torch import nn
import torch
import torchvision
import logging as log
from typing import Optional # required for "Optional[type]"

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
    return \
    nn.Sequential(        # the dropout is needed otherwise you cannot load the weights
            AdaptiveConcatPool2d(),
            Flatten(),
            nn.BatchNorm1d(nf,eps=1e-05,momentum=0.1,affine=True,track_running_stats=True),
            nn.Dropout(p=0.25,inplace=False),
            nn.Linear(nf, 512,bias=True),
            nn.ReLU(True),
            nn.BatchNorm1d(512,eps=1e-05,momentum=0.1,affine=True,track_running_stats=True),
            nn.Dropout(p=0.5,inplace=False),
            nn.Linear(512, nc,bias=True),
        )


my_model=torchvision.models.resnet50() 
modules=list(my_model.children())
modules.pop(-1) 
modules.pop(-1) 
temp=nn.Sequential(nn.Sequential(*modules))
tempchildren=list(temp.children()) 
#append the special fastai head
#Configured according to Model Architecture

tempchildren.append(myhead(4096,2))
model_r50=nn.Sequential(*tempchildren)

state = torch.load(path+'Corona_model_stage5.pth')
model_r50.load_state_dict(state['model'])