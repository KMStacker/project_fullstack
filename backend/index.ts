import app from './app'
import * as config from './utils/config'

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT} at -> http://localhost:${config.PORT}/`)
})