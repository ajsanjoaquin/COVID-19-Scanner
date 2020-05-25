FROM node:7
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# set frontend as the work directory
WORKDIR /frontend

COPY package.json /frontend

#run npm commands
RUN npm install


COPY . /frontend

RUN npm start