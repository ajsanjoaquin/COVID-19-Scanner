FROM node:7
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

WORKDIR /app
COPY . /app

#run npm commands
RUN npm install --production --loglevel=warn 
#COPY . /app

EXPOSE 3000

RUN npm start 