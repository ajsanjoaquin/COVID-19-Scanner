FROM node:13.12.0-alpine
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

# install app dependencies
RUN npm install --production --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]