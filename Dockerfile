FROM node:10.9.0-alpine

# Create app directory
WORKDIR /app
COPY *.js* ./
RUN npm install -g nodemon
RUN npm install
CMD nodemon server.js