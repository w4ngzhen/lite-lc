# lite-lc

A lite LowCode project for learning.

一款轻量级（简陋）的低代码项目，配合文章《低代码平台设计与实现》教程文章而生。

该项目采用yarn workspace组织，packages/core是lite-lc的核心库；packages/example则是客户端样例代码。

## install

项目根目录

```BASH
yarn install
```
编译CORE

```bash
cd packages/core
yarn build-js && yarn build-type
```

运行样例项目

```BASH
cd packages/example
yarn start
```
