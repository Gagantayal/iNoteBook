const express = require("express")
const User = require("../models/User")
const {body,validationResult} = require("express-validator")
const router = express.Router()

router.post('/',[
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email',"Enter a valid mail").isEmail(),
    body('password',"Enter a valid password").isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        const user = User(req.body);
        user.save().then(
            res.send(user)
        ).catch(err=>console.log(err))       
    }
})


module.exports = router