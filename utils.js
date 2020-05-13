const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  let result;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: '1h',
      issuer: 'my_app'
    };
    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      result = jwt.verify(token, process.env.JWT_SECRET, options);

      // Let's pass back the decoded token to the request object
      req.decoded = result;
      // We call next to pass execution to the subsequent middleware
      next();
    } catch (err) {
      // Throw an error just in case anything goes wrong with verification
      res.json({
        success: false,
        msg: '認證失敗，請重新登入'
      })
    }
  } else {
    res.status(401).json({
      success: false,
      msg: '認證失敗，請重新登入'
    })
  }
}

module.exports = {
  validateToken
};