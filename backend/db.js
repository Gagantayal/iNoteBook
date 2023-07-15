const mongoose = require("mongoose")
const db_link="mongodb+srv://gagantayal2003:123gagan@cluster0.bzthetb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db_link)
.then(function(db){
    console.log('db connect');
})
.catch(function(err){
    console.log(err);
}); 