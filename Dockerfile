FROM node:12-alpine as builder

USER node

ENV NODE_ENV build
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /home/node

COPY --chown=node:node . /home/node
RUN mkdir -p /home/node/.aws
COPY --chown=node:node ./aws/* /home/node/.aws/

RUN npm install --no-save && npm run prebuild && npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start:prod"]