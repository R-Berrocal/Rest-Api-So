const {Router} = require('express');
const { check } = require('express-validator');
const { 
    createModifiedSchedule,
    getModifiedSchedules
} = require('../controllers/modifiedSchedule');
const { validateJWT, validateAdmin } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate_fields');


const router = Router();

router.post('/',[
    validateJWT,
    validateAdmin,
    validateFields
],createModifiedSchedule)

router.get('/',[
    validateJWT,
    validateAdmin,
    validateFields 
], getModifiedSchedules)


module.exports = router;