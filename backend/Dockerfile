FROM node:22-alpine
WORKDIR /app

ARG VERSION=1.0.0
ENV APP_VERSION=$VERSION

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001
CMD ["node", "index.js"]