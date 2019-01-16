FROM node:latest
RUN npm install -g http server
RUN mkdir -p /home/front
WORKDIR /home/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist"]

