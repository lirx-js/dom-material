[![npm (scoped)](https://img.shields.io/npm/v/@lirx/dom-material.svg)](https://www.npmjs.com/package/@lirx/dom-material)
![npm](https://img.shields.io/npm/dm/@lirx/dom-material.svg)
![NPM](https://img.shields.io/npm/l/@lirx/dom-material.svg)
![npm type definitions](https://img.shields.io/npm/types/@lirx/dom-material.svg)

## lirx/dom-material


[SOME EXAMPLES HERE](examples/README.md)


## 📦 Installation

```bash
yarn add @lirx/dom-material
# or
npm install @lirx/dom-material --save
```

This library supports:

- **common-js** (require): transpiled as es2015, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll probably need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lirx/dom-material](https://cdn.skypack.dev/@lirx/dom-material)
