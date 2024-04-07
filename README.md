# Grayscaler
Built as a showcase for wasm-grate

[![Developed by Mad Devs](https://maddevs.io/badge-dark.svg)](https://maddevs.io?utm_source=github&utm_medium=madboiler)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![JS](https://img.shields.io/github/languages/top/maddevsio/react-madboiler)

![image](https://user-images.githubusercontent.com/35951221/120291263-f1344a00-c2e4-11eb-9a85-d0201af47802.png)

## Introduction
# First start
### Using docker and docker-compose
This option is good in that you don't need to install a lot of dependencies on your working device. Docker just encapsulates all that trash.

To start the project with this option you need to install [Docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/)

After, you just need to run the following command:
```bash
  yarn docker:dev
```

When `Docker` installs all the necessary dependencies and builds your application, you will see `Compiled successfully` in your console. Your project is available on `3000` port; you can open it and start developing. - [http://localhost:3000](http://localhost:3000)

### Using npm dependencies
If you can't or don't want to use `docker` you can use the default method for starting your project using [Node.JS and npm(yarn)](https://nodejs.org/en/)

1. Install dependencies
```bash
  yarn # or npm i
```
2. Start the project
```bash
  yarn start # or npm start
```
The application is available on [http://localhost:3000](http://localhost:3000)
