// import package here
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    // console.log('------------------------------------');
    // console.log(typeof authHeader);
    // console.log(authHeader);
    // console.log(authHeader.split(' '));
    // console.log(authHeader.split(' ')[1]);
    // console.log('------------------------------------');

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.send({
        message: 'Access denied!',
      });
    }

    const SECRET_KEY = 'batch32siangbebasapasajadotcom';

    const verified = jwt.verify(token, SECRET_KEY);

    // console.log('------------------------------------');
    // console.log(verified);
    // console.log('------------------------------------');

    req.user = verified;

    next();
  } catch (error) {
    res.send({
      message: 'Invalid token!',
    });
  }
};
