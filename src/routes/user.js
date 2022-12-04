const {Router} = require("express");
const { check } = require("express-validator");
const { createUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { emailExist } = require("../helpers/db-validator");
const { validateJWT, validateAdmin, validateUserOrAdmin } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate_fields");

const router = Router();

router.post('/',[
    validateJWT,
    validateAdmin,
    check('name', 'name is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('email').custom(emailExist),
    check('password','The password must hace more than six characters').isLength({min:6}),
    validateFields
], createUser)

router.get('/',[
    validateJWT,
    validateAdmin,
    validateFields
], getUsers)

router.get('/:id',[
    validateJWT,
    validateUserOrAdmin,
    validateFields
], getUser)

router.put('/:id',[
    validateJWT,
    validateUserOrAdmin,
    validateFields
],updateUser)

router.delete('/:id',[
    validateJWT,
    validateAdmin,
    validateFields
], deleteUser)

module.exports = router;