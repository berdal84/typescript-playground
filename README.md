[![Node.js CI](https://github.com/berdal84/typescript-playground/actions/workflows/node.js.yml/badge.svg)](https://github.com/berdal84/typescript-playground/actions/workflows/node.js.yml)

Typescript Playground
=====================

### Why?

The main purpose of this repo is to have a ready to use repository to try things.
I organized the code in categories under the `src/libs` folder and I implement unit tests for each of them.

### Quick start

Install and run unit tests:
```
npm i && npm run test:cov
```

### Folder structure

Within the `src` folder, you can find two main folders:
- `libs` contains a hierarchy of modules sorted by category
- `examples` contains few examples relying on some libs.

### Scripts

`npm install` will install the dependencies.

`npx ts-node src/examples/<example.js>` will run a given example.

`npm run test` will run the unit tests once.

`npm run test:cov` will run the unit tests once with a code coverage report.

`npm run dev` will run the tests (no coverage) in watch mode. So you can edit the code and tests will run automatically when you save your file.

`npm run build` will build the library.

