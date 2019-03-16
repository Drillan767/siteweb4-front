FROM node:latest
RUN apt-get update -y && apt-get install curl -y
RUN mkdir -p /home/front
WORKDIR /home/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
RUN curl https://getcaddy.com | bash -s personal
RUN chown root:root /usr/local/bin/caddy && chmod 755 /usr/local/bin/caddy
CMD ["caddy"]