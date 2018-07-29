FROM node:alpine
# add project files
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/
WORKDIR /app
ADD . /app
# Expose app port 8080
EXPOSE 8080