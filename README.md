# A Simple GPT Web Client

Just a web interface for sending HTTP requests to the paid GPT API.

It uses the `openai` npm package.

Web application is bootstrapped using [create-t3-app](https://github.com/t3-oss/create-t3-app).

Front-end, unconnected API, demo: <https://gpt-demo.aaanh.app>

Production: <https://gpt.aaanh.app>

Please create an issue with the label `request-access` if you don't have access. State your intentions and the Github organization (if applied) to you.

Permission granting rights are all reserved for the maintainer.

Donate/Sponsor: <https://ko-fi.com/aaanh>

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
