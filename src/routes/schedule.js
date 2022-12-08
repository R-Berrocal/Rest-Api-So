const {Router} = require('express');
const { check } = require('express-validator');
const { 
    createSchedule, 
    getSchedules, 
    getSchedule, 
    updateSchedule, 
    deleteSchedule 
} = require('../controllers/schedule');
const { scheduleExist } = require('../helpers/db-validator');
const { validateJWT, validateAdmin } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate_fields');


const router = Router();

router.post('/',[
    validateJWT,
    validateAdmin,
    validateFields
],createSchedule)

router.get('/',[
   validateFields 
], getSchedules)

router.get('/:id', [
    check('id').custom(scheduleExist),
    validateFields
], getSchedule)

router.put('/:id',[
    validateJWT,
    validateAdmin,
    check('id').custom(scheduleExist),
    validateFields
], updateSchedule)

router.delete('/:id',[
    validateJWT,
    validateAdmin,
    check('id').custom(scheduleExist),
    validateFields
], deleteSchedule)

module.exports = router;