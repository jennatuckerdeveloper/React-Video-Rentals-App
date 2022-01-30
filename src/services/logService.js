import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

const init = () =>
	Sentry.init({
		dsn: 'https://810549d86a0a478e8b9fce1b793d895b@o1129709.ingest.sentry.io/6173682',
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	})

const log = (err) => {
	Sentry.captureException(err)
}

const logger = { init, log }

export default logger
