FROM python:3.6-slim-buster

MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# check our python environment
RUN python3 --version
RUN pip3 --version

# set work directory for the container
WORKDIR .
#install reqs
RUN pip install --no-cache-dir -r requirements.txt
#get model weights
RUN wget -O corona_resnet34.pth https://www.dropbox.com/s/o27w0dik8hdjaab/corona_resnet34.pth?dl=0

# Running Python Application
CMD ["python3", "app.py"]