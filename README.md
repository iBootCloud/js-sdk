
# `@ibootcloud/js-sdk`

An official JavaScript client for iBootCloud.

- **Documentation:** https://support.ibootcloud.com/docs/sdk/javascript

## Usage

First of all, you need to install the library:

```sh
npm install @ibootcloud/js-sdk --registry=https://cherryez-npm.pkg.coding.net/ibootcloud/public-npm/
```
```sh
yarn add @ibootcloud/js-sdk --registry=https://cherryez-npm.pkg.coding.net/ibootcloud/public-npm/
```

> By the way, you can find our official public npm lib in [this](https://cherryez.coding.net/public-artifacts/ibootcloud/public-npm/packages)

Then you're able to import the library and establish the connection with the database:

```js
import { createClient } from '@ibootcloud/js-sdk'

// Create a single ibootcloud client for interacting with your database
const ibc = createClient({
  accessToken: 'your-ibootcloud-api-key'
});
```
