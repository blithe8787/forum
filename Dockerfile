FROM node
COPY ./app /app
WORKDIR /app
RUN yarn install
EXPOSE 4000
CMD yarn serve

