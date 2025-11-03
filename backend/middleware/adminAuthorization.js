const jwt = require('jsonwebtoken')

const adminAuthorization = (request, response, next) => {
  try {
    const token = request.token
    if (!token) {
      return next({
        name: 'JsonWebTokenError',
        message: 'token missing'
      })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id || decodedToken.role !== 'ADMIN') {
      return next({
        name: 'AuthorizationError',
        message: 'admin access required'
      })
    }

    next()

  } catch (error) {
    next(error)
  }
}

module.exports = { adminAuthorization }