FROM node:carbon

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
CMD ["npm", "start"]
EXPOSE 8080

