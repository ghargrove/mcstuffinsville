![Mcstuffinsfille](/src/web/images/mcstuffinsville.png)
===

Doc McStuffins toy hospital is a very busy place. McStuffinsville is an application designed to help Doc keep tracks of her toy (err I mean patient) data.

Inspired by my daughter Rory ♥️

## 🏗 Development

This application was developed with [nodenv](https://github.com/nodenv/nodenv) using Node v12.16.0. A `.node-version` file included

    nodenv install 12.13.0
    npm install

This application uses ts-node to run the express server.

`npm run server` will start the express app/api. It can be accessed at [localhost:3000/graphql](http://localhost:3000/graphql)

`npm run dev` will start the react app. It can be accessed at [localhost:8080](http://localhost:8080)

## 🧪 Testing

This application uses jest & tslint. Both are run as pre-commit hooks. You can run either one of them with the commands below

    npm run lint
    npm run test

## 🕸 GraphQL

This application is built on top of a GraphQL API. If you have the express server running (`npm run server`) you can access a playground at [localhost:3000/graphql](http://localhost:3000/graphql)

From there you can view the available queries and run them from your browser

    query getPatient {
      getPatient(id: 2) {
        id
        email
        firstName
      }
    }

## 📕 Storybook

After running the command below you can access storybook as [localhost:8081](http://localhost:8081)

    npm run sb

## 📦 Production

To prepare for production you should run the `build` command. This will build the react app into `/dist` where it can be served by express.

After running the commands below you can access the application [localhost:3000](http://localhost:3000)

    npm run build
    npm run server

## 🤔 Design Decisions
