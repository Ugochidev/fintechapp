/**
 * 
    * @param {Object} res
    * @param {Number} statusCode
    * @param {Object} data
 */

const successResMsg = (res, statusCode, data) => {
    const {message, ...responseData} = data;
    res.status(statusCode).json({
        status: 'success',
        message,
        ...responseData
    });
}

/**
 * 
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 */

const errorResMsg = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message
    });
}

module.exports = {
    successResMsg,
    errorResMsg
}