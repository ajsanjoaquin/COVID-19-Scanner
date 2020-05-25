MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

# set frontend as the work directory
WORKDIR .

EXPOSE 3000

#run npm commands
RUN npm install
RUN npm start