# ![Ultimate Moviegoers Guide](./public/logo.jpg)

### 3rd Party Tools Utilized

* [Next.js Framework](https://nextjs.org/) - Adds SSR and easy routing
* [CSS Modules](https://github.com/css-modules/css-modules) - Scoped CSS (as opposed to using BEM or Styled JSX)
* [Bootstrap](https://getbootstrap.com/) - Simple CSS Tool Kit
* [Classnames](https://github.com/JedWatson/classnames) - A simple javascript utility for conditionally joining classNames together
* [Jest](https://jestjs.io/) Testing with [React Testing Library](https://github.com/testing-library/react-testing-library)

### Coding Decisions Made

* Utilize Aliases for calling files within the project. This prevents long directory imports.
* Utilize CSS Modules with SASS implemtation
* **Note** If you aren't familiar with Next.js, you can think of the `/pages` directory as your router

### Building the App

`yarn install`

**Before running the app you need to add a `MOVIE_ACCESS_TOKEN` environment variable (`.env` file in dev) from the [Movie DB Settings Page](https://www.themoviedb.org/settings/api)**

### Running the App:

`yarn dev` Starts the development server.

`yarn build` Builds the app for production.

`yarn start` Runs the built app in production mode.

### Testing the app

`yarn test` Runs Jest tests.

### Notes

* All components and code was developed by Ricardo Fearing unless otherwise noted.