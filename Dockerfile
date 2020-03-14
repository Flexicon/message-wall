FROM node:alpine

ADD package.json /tmp
ADD package-lock.json /tmp
RUN cd /tmp && npm install

RUN mkdir -p /app && cp -a /tmp/node_modules /app/
WORKDIR /app
ADD . /app

EXPOSE 8080
CMD [ "npm", "run", "dev" ]