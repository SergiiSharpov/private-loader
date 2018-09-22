[![npm][npm]][npm-url]
[![license][license]][license-url]
[![downloads][downloads]][npm-url]


<h1 align="center">Private Loader</h1>

This is a webpack loader that handles private variables in js


<h2 align="center">Install</h2>

From NPM:
```bash
npm install --save-dev private-loader
```

From GitHub:

```bash
cd path/to/node_modules
git clone https://github.com/SergiiSharpov/private-loader.git
```

<h2 align="center">Usage</h2>

**webpack.config.js**

```js
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: [ '...', 'private-loader' ],
            exclude: path.resolve(__dirname, 'node_modules')
        }]
    }
}
```

<h2 align="center">Example</h2>

```js
class Test {
    constructor() {
        this.__hello = "World";
        this.qwerty = 5;
    }

    __test() {
        return this.__hello;
    }

    get example() {
        return this.__test();
    }
}

let object = new Test();

console.log(object.__hello);// Undefined
console.log(object.example);// World
console.log(object.__test());// TypeError: object.__test is not a function
console.log(object.qwerty);// 5

```


[npm]: https://img.shields.io/npm/v/private-loader.svg
[npm-url]: https://npmjs.com/package/private-loader

[node]: https://img.shields.io/node/v/private-loader.svg
[node-url]: https://nodejs.org

[deep]: https://img.shields.io/sergeysharpov/private-loader/private-loader.svg

[license]: https://img.shields.io/npm/l/private-loader.svg
[license-url]: https://github.com/SergiiSharpov/private-loader/blob/master/LICENSE

[downloads]: https://img.shields.io/npm/dt/private-loader.svg