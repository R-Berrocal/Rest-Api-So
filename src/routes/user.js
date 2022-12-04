const {Router} = require("express");
const { check } = require("express-validator");
const { createUser, getUsers, getUser } = require("../controllers/user");
const { emailExist } = require("../helpers/db-validator");
const { validateJWT, validateRectorJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate_fields");

const router = Router();

router.post('/',[
    validateJWT,
    validateRectorJWT,
    check('name', 'name is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('email').custom(emailExist),
    check('password','The password must hace more than six characters').isLength({min:6}),
    validateFields
], createUser)

router.get('/',[
    validateJWT,
    validateRectorJWT,
    validateFields
], getUsers)

router.get('/:id',[
    validateJWT,
    validateFields
], getUser)

module.exports = router;