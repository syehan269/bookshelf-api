'use-strict';

const sendSuccess = (hapi, successCode = 200, data = null, message = null) => {
  return hapi
      .response({
        status: 'success',
        message: message,
        data: data,
      })
      .code(successCode);
};

const sendFailed = (hapi, errorCode = 500, message = 'an error has occured', status = 'fail') => {
  return hapi
      .response({
        status: status,
        message: message,
      })
      .code(errorCode);
};

export {
  sendSuccess,
  sendFailed,
};
