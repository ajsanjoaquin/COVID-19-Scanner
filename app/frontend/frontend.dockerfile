FROM node:7
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# set frontend as the work directory
WORKDIR .

#run npm commands
RUN npm install


RUN npm start