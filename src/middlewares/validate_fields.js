const {validationResult} = require( 'express-validator');

const validateFields=(req,res, next)=>{
    const error = validationResult(req);
    !error.isEmpty()? res.status(400).json({error}) : next()
}

module.exports = {
    validateFields
}