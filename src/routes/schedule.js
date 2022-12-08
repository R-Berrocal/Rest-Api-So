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
    check('start_time_1', 'start_time_1 is required').not().isEmpty(),
    check('end_time_1', 'end_time_1 is required').not().isEmpty(),
    check('start_time_2', 'start_time_2 is required').not().isEmpty(),
    check('end_time_2', 'end_time_2 is required').not().isEmpty(),
    check('start_time_3', 'start_time_3 is required').not().isEmpty(),
    check('end_time_3', 'end_time_3 is required').not().isEmpty(),
    check('start_time_4', 'start_time_4 is required').not().isEmpty(),
    check('end_time_4', 'end_time_4 is required').not().isEmpty(),
    check('start_time_5', 'start_time_5 is required').not().isEmpty(),
    check('end_time_5', 'end_time_5 is required').not().isEmpty(),
    check('start_time_6', 'start_time_6 is required').not().isEmpty(),
    check('end_time_6', 'end_time_6 is required').not().isEmpty(),
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