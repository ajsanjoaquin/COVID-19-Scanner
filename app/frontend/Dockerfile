FROM node:13.12.0-alpine
MAINTAINER Ayrton San Joaquin <ajsanjoaquin@gmail.com>

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

# install app dependencies
RUN npm install --production --silent


COPY . ./

# start app
#CMD ["cd", "frontend"]
EXPOSE 5000
CMD ["npm", "start"]