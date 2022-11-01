FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --slient --loglevel=error
RUN npm install react-scripts -g

COPY . ./
EXPOSE 11010

CMD ["npm", "run", "start"]