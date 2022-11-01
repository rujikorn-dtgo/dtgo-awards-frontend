# # base image
# FROM node:alpine

# # set working directory
# WORKDIR /code

# # install and cache app dependencies
# COPY package.json /code/
# RUN npm install
# COPY . /code/
# EXPOSE 5000

# # start app
# CMD ["npm", "run", "uat"]


# base image
FROM node:alpine as build-stage
# param from docker-compose
ARG BUILD
# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/
RUN npm install
COPY ./ /app/
RUN npm run $BUILD:build

FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]