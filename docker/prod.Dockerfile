ARG pull=false
FROM aaanh.azurecr.io/web/next-base:latest

WORKDIR /app
COPY . .

RUN cd /app && npm install && npm run build


ENTRYPOINT ["npm", "run", "start"]