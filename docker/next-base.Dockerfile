ARG REGISTRY=mcr.microsoft.com

FROM ${REGISTRY}/cbl-mariner/base/core:2.0

RUN yum install curl ca-certificates tar -y
RUN curl -O https://nodejs.org/dist/v19.8.1/node-v19.8.1-linux-x64.tar.xz
RUN tar -xvf node-*.tar.xz && rm node-*.tar.xz
RUN cp -r node-v19.8.1-linux-x64/{bin,include,lib,share} /usr/
RUN export PATH=/usr/node-v19.8.1-linux-x64/bin:$PATH
RUN npm install -g next

ENTRYPOINT [ "/usr/bin/bash" ]