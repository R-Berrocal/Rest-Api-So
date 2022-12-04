const { Router } = require("express");
const { check} = require("express-validator");
const { login, renovate_o_validateJwt } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate_fields");


const router = Router();

router.get("/",[
    validateJWT,
    validateFields],
renovate_o_validateJwt);


router.post("/login",[
    check("email","mail is required").not().isEmpty(),
    check("email","it is not a valid email").isEmail(),
    check("password","password is required").not().isEmpty(),
    validateFields
], login);

module.exports = router;