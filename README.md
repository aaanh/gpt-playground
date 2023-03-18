# A Simple GPT Web Client

Just a web interface for sending HTTP requests to the paid GPT API.

It uses the `openai` npm package.

Web application is bootstrapped using [create-t3-app](https://github.com/t3-oss/create-t3-app).

Front-end, unconnected API, demo: <https://gpt-demo.aaanh.app>

Production: <https://gpt.aaanh.app>

Please create an issue with the label `request-access` if you don't have access. State the Github organization if that applies to you.

## Usage

- Install dependencies

  ```
  npm install
  ```

- Copy `.env.example` to `.env`

- Add your OpenAI API key in `.env`

- Run

  ```
  npm run dev
  ```
