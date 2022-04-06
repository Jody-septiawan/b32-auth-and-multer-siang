// import model here
const { user } = require('../../models');

// import package here
const Joi = require('joi');

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      status: Joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const isAlready = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (isAlready) {
      return res.send({
        error: {
          message: `Account ${data.email} is Already`,
        },
      });
    }

    await user.create(data);

    res.send({
      message: 'register success',
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userExist = await user.findOne({
      where: {
        email: data.email,
      },
    });

    if (!userExist) {
      return res.send({
        error: {
          message: `Email or Password not match!`,
        },
      });
    }

    if (userExist.password != data.password) {
      return res.send({
        error: {
          message: `Email or Password not match!`,
        },
      });
    }

    res.send({
      message: 'login success',
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};
