const {Router} = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/user");
const { emailExist } = require("../helpers/db-validator");
const { validateFields } = require("../middlewares/validate_fields");

const router = Router();

router.post('/',[
    check('name', 'name is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('email').custom(emailExist),
    check('password','The password must hace more than six characters').isLength({min:6}),
    validateFields
], createUser)

module.exports = router;