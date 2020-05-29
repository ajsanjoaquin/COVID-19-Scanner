FROM python:3.6-slim-buster

MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# check our python environment
RUN python3 --version
RUN pip3 --version

# set work directory for the container
WORKDIR /app
#install reqs
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt
#get model weights
RUN apt-get update
RUN apt-get -y install wget
RUN apt-get install libgtk2.0-dev -y
RUN wget -O corona_resnet34.pth https://www.dropbox.com/s/o27w0dik8hdjaab/corona_resnet34.pth?dl=1
RUN mv corona_resnet34.pth /corona_resnet34.pth

COPY . /app
# RUN mv /corona_resnet34.pth /app/corona_resnet34.pth

EXPOSE 5000

# Running Python Application
CMD ["python3", "app/backend/app.py"]