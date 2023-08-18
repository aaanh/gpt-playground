# A Simple GPT Web Client [https://gpt.aaanh.app](https://gpt.aaanh.app)

Just a web interface for sending HTTP requests to the paid GPT API.

It uses the `openai` npm package.

Web application is bootstrapped using [create-t3-app](https://github.com/t3-oss/create-t3-app).

## Deploy to Vercel using this neat little button that I can't seem to customize the styling

> ⚠️ Attention! You must have access to an OpenAI API account and an UpStash account and a Vercel account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faaanh%2Fgpt-playground&env=OPENAI_API_KEY,UPSTASH_REDIS_REST_TOKEN,UPSTASH_REDIS_REST_URL,RATE_LIMIT_DURATION,RATE_LIMIT_REQUESTS)

## TODO

### App Features

- [ ] Application telemetry (Kafka or Cassandra)
  - [ ] Emit request events with opaque body
  - [ ] Emit error events
  - [ ] Implement session-based LogRocket
- [x] Cache prompts and responses in local storage
- [x] Import and export conversation
- [x] Multi-turn implementation (similar to ChatGPT)
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

<iframe src="https://link.excalidraw.com/readonly/QUecUYbc1u4f7HsoU2Rv?darkMode=true" width="100%" height="100%" style="border: none;"></iframe>

## Deployment

> Note: The steps below apply for Microsoft Azure cloud platform but the principles essentially can be applied on any cloud platforms.
>
> Another note: Currently, the end-to-end build and deploy process only works on AMDx64 platforms. ARM support to be investigated.
>

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

## Contributing

All types of contributions, e.g. suggestion, MR/PR, bug report, etc., are warmly welcomed.

Please refer to [the CONTRIBUTE.md document](CONTRIBUTE.md) and [the Code of Conduct](CONDUCT.md) for more detailed guidelines.

## Donate/Sponsor

<https://ko-fi.com/aaanh>

## Copyright materials

⚠️ The [`aaanh`](/next.frontend.app/public/logo-color-variant.png) logo and the pseudonym aaanh is my trademark and subject to copyright laws.
