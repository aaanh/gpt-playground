# A Simple GPT Web Client

Just a web interface for sending HTTP requests to the paid GPT API.

It uses the `openai` npm package.

Web application is bootstrapped using [create-t3-app](https://github.com/t3-oss/create-t3-app).

Front-end, unconnected API, demo: <https://gpt-demo.aaanh.app>

Production: <https://gpt.aaanh.app>

Please create an issue with the label `request-access` if you don't have access. State your intentions and the Github organization (if applied) to you.

Permission granting rights are all reserved for the maintainer.

Donate/Sponsor: <https://ko-fi.com/aaanh>

## TODO

### App Features

- [ ] Application telemetry (Kafka or Cassandra)
  - [ ] Emit request events with opaque body
  - [ ] Emit error events
  - [ ] Implement session-based LogRocket
- [ ] Cache prompts and responses in local storage
- [ ] Multi-turn implementation (similar to ChatGPT)
- [ ] Diffusion implementation (DALL-E 2)

### DevOps

- [ ] ConfigMap to export `.env` variables into the deployment
- [ ] Migrate from Linode bare-metal to AKS

## Usage

- Install dependencies

  ```
  npm install
  ```

- Copy `.env.example` to `.env`

- Add your OpenAI API key in `.env`

- (Optional) Add your upstash Redis tokens for rate limiting

- Run

  ```
  npm run dev
  ```

## Deployment

> Note: The steps below apply for Microsoft Azure cloud platform but the principles essentially can be applied on any cloud platforms.
>
> Another note: Currently, the end-to-end build and deploy process only works on AMDx64 platforms. ARM support to be investigated.

### Local Cluster

#### Prerequisites

- Docker Desktop with Kubernetes enabled
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
  - Private ACR created
  - Service Principal with acrPull role for that ACR
  - Have a Docker image of the frontend application built and pushed to the private ACR

#### Step by step

- Create k8s secret in local cluster. E.g. `acr-secret`
  ```sh
  kubectl create secret docker-registry acr-secret --docker-server=my-private-cr.azurecr.io --docker-username=service-principal-application-id --docker-password=service-principal-client-secret
  ```
- Reference the k8s secret in the deployment manifest spec
  ```yaml
  # ...
  container:
  # ...
  imagePullSecrets:
    - name: acr-secret
  ```
- Deploy the application
  ```
  kubectl apply -f k8s/gpt-frontend.yaml
  ```
- Navigate to `localhost:3000`

### AKS

- TBA