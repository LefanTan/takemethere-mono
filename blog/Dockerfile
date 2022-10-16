FROM node:alpine as node

FROM node as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm ci

# start app
RUN npm run build
EXPOSE 3000
# CMD ["node", "./dist/server/entry.mjs"]
CMD npm run preview