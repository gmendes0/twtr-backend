const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

module.exports = {
  
  Auth(request, response, next) {
    const { authorization } = request.headers

    if (!authorization)
      return response.status(401).json({ error: { message: 'Token not found.' } })

    const [schema, token] = authorization.split(' ')

    if (!schema || !/^Bearer$/.test(schema))
      return response.status(401).json({ error: { message: 'Invalid token format.' } })

    if (!token)
      return response.status(401).json({ error: { message: 'Token not found.' } })

    jwt.verify(token, secret, (error, decoded) => {
      if (error)
        return response.status(401).json({ error: { message: 'Invalid token.' } })
      
      request.user_id = decoded.id
      return next()
    })
  }
}
