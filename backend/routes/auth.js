const express = require("express")
const User = require("../models/User")
const {body,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const router = express.Router()

router.post('/',[
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email',"Enter a valid mail").isEmail(),
    body('password',"Enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // const user = User(req.body);
        // user.save().then(
        //     res.send(user)
        // ).catch(err=>res.json({
        //     error:"please enter correct value"
        // }))
    try {  
    let user = await User.findOne({email:req.body.email})
    if(user){return res.status(400).json({error:"Sorry user already exist"})}
    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.password,salt)
    User.create({
        name:req.body.name,
        password:secpass,
        email:req.body.email}).then(user => res.send(user)).catch(err=>res.json({
            error:"please enter correct value",
            message:err.message
        })) 
    } catch (error) {
        console.error(error.message)
        res.status(500).json("some error has occured")}
})



module.exports = router