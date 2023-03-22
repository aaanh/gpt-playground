#!/bin/bash

kubectl create configmap acr-puller-config --from-env-file=../.env