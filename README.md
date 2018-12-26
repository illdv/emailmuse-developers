# EmailMuse App

### Install dependencies

npm install

### Start project with Electron

1. npm run start-webpack-dev-server
2. npm run start-electron

### Build app for production

npm run build:all (all platform)

npm run build:linux (for linux)

npm run build:mac (for mac)

npm run build:win (for windows)

Result in build/dist

### For login

creacte new acc or use your google acc

### for update app of AWS

https://goo.gl/rGcKRA

add AWS keys in your setEnvVar.sh (option)

### For publish and code signing

only when performing the previous paragraph!

1. check DeveloperIdApp.p12 in root project(for mac)
2. check sertWin in root project(for windows)
3. check setEnvVar.sh in root project
4. check build folder in root project
5. npm run release

##### Used commit message convention

[Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)

#### If you use WebStorm

Please import Typescript.xml
[Getting started with Electron in WebStorm](https://blog.jetbrains.com/webstorm/2016/05/getting-started-with-electron-in-webstorm/)
