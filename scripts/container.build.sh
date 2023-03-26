#!/bin/bash

docker build . -f docker/next-base.Dockerfile -t aaanh.azurecr.io/web/next-base:latest && \
docker build . -f docker/prod.Dockerfile -t aaanh.azurecr.io/gpt/frontend:latest