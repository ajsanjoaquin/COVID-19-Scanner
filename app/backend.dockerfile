FROM python:3.6-stretch
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# set work directory
WORKDIR .

# check our python environment
RUN python3 --version
RUN pip3 --version

RUN pip install --no-cache-dir -r requirements.txt

RUN wget -O corona_resnet34.pth https://www.dropbox.com/s/o27w0dik8hdjaab/corona_resnet34.pth?dl=0

EXPOSE 5000

# Running Python Application
CMD ["python3", "app.py"]