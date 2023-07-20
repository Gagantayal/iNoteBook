const express = require("express")
const User = require("../models/User")
const {body,validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "GAGANTAYAL"
const fetchuser = require("../middleware/fetchuser")
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
    try {  
    let user = await User.findOne({email:req.body.email})
    if(user){return res.status(400).json({error:"Sorry user already exist"})}
    const salt = await bcrypt.genSalt(10)
    const secpass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name:req.body.name,
        password:secpass,
        email:req.body.email});
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).json("some error has occured")}
})


router.post('/login',[
    body('email',"Enter a valid mail").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    const {email,password} = req.body
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user){return res.status(404).json({error:"use correct details"})}

        const passwordCompare = await bcrypt.compare(password , user.password);
        if(!passwordCompare){return res.status(404).json({error:"use correct details"})}

        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken})

    }
    catch (error) {
        console.error(error.message)
        res.status(500).json("internal server error")
    }
})

router.post('/getuser',fetchuser, async (req, res) => {
try{
    userId = req.user.id
    const user = await User.findById(userId).select("-password -date -_id -__v")
    res.send(user)
}
catch (error) {
    console.error(error.message)
    res.status(500).json("internal server error")
}
})
module.exports = router