FROM node:14 as base

RUN apt-get update -y && \
  apt-get install gettext -y  && \
  apt-get -y autoremove && \
  apt-get clean autoclean && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/lib/apt/lists/* /usr/share/locale/* /usr/share/man/* /usr/share/doc/* /usr/share/doc/*/copyright && \
  rm -rf /var/lib/{apt,dpkg,cache,log}/

WORKDIR /app

ADD package.json package-lock.json /app/ 

CMD npm run dev

FROM base as production

ENV NODE_ENV=production
RUN npm ci --arch=x64 --platform=linux
ADD . /app
RUN npm run build

CMD npm run start

FROM base as development

RUN npm i --arch=x64 --platform=linux
ADD . /app
CMD npm run dev