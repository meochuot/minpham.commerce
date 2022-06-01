FROM node:lts-alpine as dependencies

WORKDIR /app

COPY package.json turbo.json yarn.lock /app/
COPY site/ /app/site/
COPY packages/ /app/packages/

RUN yarn
# remove comment for production
#RUN yarn build

WORKDIR /app/site/

# use for production instead of dev
#CMD yarn next start -p 8080
CMD yarn next dev -p 8080
