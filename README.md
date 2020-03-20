![Mcstuffinsville](/src/web/images/mcstuffinsville.png)
===

Doc McStuffins toy hospital is a very busy place. McStuffinsville is an application designed to help Doc (and maybe Olive) keep track of her toy (err I mean patient) data.

Inspired by my daughter Rory ♥️

## 💎 Features

- Filter patient data by state and gender
- Toggle column visibility to see the data you're most interested in
- Sort by first name, last name, email, city and state in ascending or descending order
- Patient data is paginated to reduce load time (50). Additional patient records are loaded as you scroll
- Debounced search input. Search will work across all patient data fields
- Patient count showing number of patients that match filter criteria

## 🏗 Development

This application was developed with [nodenv](https://github.com/nodenv/nodenv) using Node v12.16.0. A `.node-version` file included

    nodenv install 12.16.0
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

During this project I initially focused primarily on functionality with little focus on UI components. Once the basic features were functional I went back and updated the components, theme and associated stories.

### Tooling

For this application I wanted to build a full stack application that could demonstrate the power of GraphQL & React. I chose to write both the frontend and backend in [TypeScript](https://www.typescriptlang.org/docs/home.html).

The server is an [express](https://expressjs.com/) web server run with [ts-node](https://www.npmjs.com/package/ts-node) and [nodemon](https://www.npmjs.com/package/nodemon) to help reload. Taken further I'd build the server down into a node module to run on a production environment. You could also implement server side rendering.

The frontend is a [React](https://reactjs.org/) application built with [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/). I chose to use [Styled Components](https://styled-components.com/) because I like the readability and theming it provides.

I used [Apollo](https://www.apollographql.com/docs/) for both the front graphql client and the server.

### Performance

To handle large chunks of data I focused on allowing the client to load small manageable chunks of data with the ability to lazy load more as the user requires. This dramatically reduces the initial load time and is less work for the browser to render.

When filters or sorts are applied queries are re-fetched and the pagination process begins all over.

I debated on using [react-virtualized](https://www.npmjs.com/package/react-virtualized) to window the results. The primary reason I considered it was to prevent render delay when toggling field visibility after a large dataset had already been loaded. In this case I opted not to. If there were significantly more patient records I would likely make that addition.

I built the search filter to debounce to prevent unnecessary load on the api when actively typing.
