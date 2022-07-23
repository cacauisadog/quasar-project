import { boot } from 'quasar/wrappers'
import makeServer from '../api/mock'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot((/* { app, router, ... } */) => {
  if (process.env.NODE_ENV === 'development') {
    makeServer()
  }
})
