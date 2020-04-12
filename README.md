# dynmap-standalone-node

An implementation of the [Dynmap](https://github.com/webbukkit/dynmap) standalone server in Node.js. Requires use of Dynmap's MySQL functionality. Currently only supports `login-enabled: false`. Holding off on tackling that until I have time to implement it properly via middleware with tests. Any PRs working on that functionality are very welcome! 😄

This code is based on the wonderful work of the [Dynmap contributors](https://github.com/webbukkit/dynmap/graphs/contributors).

Currently built and tested against [Dynmap 3.0-beta-10](https://github.com/webbukkit/dynmap/releases/tag/3.0-beta-10)

## Using With Your Minecraft Server

To get started setting this standlone server up, I recommend following the MySQL and "Prepping the Dynmap plugin" sections of this [great tutorial](https://github.com/webbukkit/dynmap/issues/2609) by @haloflooder. Once you get to the "Options on how the web server should be set up" section, you can come back here.

If you already know your preferred method of deploying typical Node apps, you can probably stop reading at this point. Otherwise, here's a one-click (free) Heroku install button:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fpaulstraw%2Fdynmap-standalone-node%2F)

This will take you to a page where you enter some basic information, like the MySQL info you set your Dynmap server up with. Hit "Deploy app", and you should be up and running! Heroku will take you to the URL your Dynmap now lives at.

Here are some guides from Heroku on common questions you might have:

- [Setting up a custom domain](https://devcenter.heroku.com/articles/custom-domains)
- [SSL certificates (HTTPS)](https://devcenter.heroku.com/articles/automated-certificate-management)
  - HTTPS with a custom domain requires using a "Hobby Dyno" server, which costs \$7/month

## Running Locally

If you want to play around with this locally (or contribute!), here are the basics of what you need to do to get up and running:

1. `cp .env.sample .env`
2. Configure `.env` with the appropriate info for your database and Dynmap config
3. `npm i`
4. `npm start`
