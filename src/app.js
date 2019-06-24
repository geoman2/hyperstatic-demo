import { app } from 'hyperapp'
import { LocationChanged, ParseUrl, getInitialState } from 'hyperapp-site-generator'

// Import best-practices defaults
import 'sanitize.css'
import 'sanitize.css/typography.css'
import 'sanitize.css/forms.css'

// Global styling
import './global.css'

// Import app
import routes from './app/routes'
import init from './app/init'
import view from './app/view'

// Initialize the app
app({
  init: getInitialState(routes, init),
  view,
  subscriptions: () => [
    LocationChanged({ action: ParseUrl })
  ],
  node: document.getElementById('app')
})

// Enable the service worker in production
// if (process.env.NODE_ENV === 'production') {
//   navigator.serviceWorker.register(`${window.location.origin}/sw.js`)
// }
