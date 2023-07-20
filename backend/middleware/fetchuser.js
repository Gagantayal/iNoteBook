const jwt = require("jsonwebtoken")
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(400).send({erroe:"access denied"})
    }
    try{
    const data = jwt.verify(token,"GAGANTAYAL")
    req.user = data.user;
    next()}
    catch(err){
        res.status(400).send({erroe:"access denied"})
    }
}
module.exports = fetchuser;