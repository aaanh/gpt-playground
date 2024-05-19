# A Simple GPT Web Client [https://gpt.aaanh.app](https://gpt.aaanh.app)

Just a web interface for sending HTTP requests to the paid GPT API.

It uses the `openai` npm package.

Web application is bootstrapped using [create-t3-app](https://github.com/t3-oss/create-t3-app).

## Deploy to Vercel using this neat little button that I can't seem to customize the styling

> ⚠️ Attention! You must have access to an OpenAI API account and an UpStash account and a Vercel account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faaanh%2Fgpt-playground&env=OPENAI_API_KEY,UPSTASH_REDIS_REST_TOKEN,UPSTASH_REDIS_REST_URL,RATE_LIMIT_DURATION,RATE_LIMIT_REQUESTS)

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

This repository can be forked as-is and deployed to Vercel.

Remember to add your API key to the Vercel project environment variables.

## Contributing

All types of contributions, e.g. suggestion, MR/PR, bug report, etc., are warmly welcomed.

Please refer to [the CONTRIBUTE.md document](CONTRIBUTE.md) and [the Code of Conduct](CONDUCT.md) for more detailed guidelines.

## Donate/Sponsor

<https://ko-fi.com/aaanh>

## Copyright materials

⚠️ The [`aaanh`](/next.frontend.app/public/logo-color-variant.png) logo and the pseudonym aaanh is my trademark and subject to copyright laws.
