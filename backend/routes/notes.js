const express = require("express")
const Note = require("../models/Notes")
const fetchuser = require("../middleware/fetchuser")
const {body,validationResult} = require("express-validator")
const router = express.Router()

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
        try{
        const notes = await Note.find({user:req.user.id})
        res.json(notes)}
        catch(error){
                console.error(error.message)
                res.status(500).json("internal server error")      
        }
})
router.post('/addnote',fetchuser,[
        body('title',"Enter a valid name").isLength({ min: 3 }),
        body('description',"Enter a valid description").isLength({ min: 5 }),
], async (req,res)=>{
        try{
        const{title,description,tag} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Note({
                title,description,tag,user:req.user.id
        })
        const savednote = await notes.save()
        res.json(savednote)
        }
        catch(error){
                console.error(error.message)
                res.status(500).json("internal server error") 
        }
})

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
        try{
        const {title,description,tag} = req.body
        var newnotes = {};
        if(title){newnotes.title = title}
        if(description){newnotes.description = description}
        if(tag){newnotes.tag= tag}
        let note = await Note.findById(req.params.id)
        if(!note){
               return res.status(400).send("not found")
        }
        if(note.user.toString() !== req.user.id){
                return res.status(400).send("not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set:newnotes},{new:true})
        res.json({note}); 
}
        catch(error){
                console.error(error.message)
                res.status(500).json("internal server error") 
        }
})

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
        try{
        let note = await Note.findById(req.params.id)
        if(!note){
               return res.status(400).send("not found")
        }
        if(note.user.toString() !== req.user.id){
                return res.status(400).send("not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"note deleted", note:note})
        }
        catch(error){
                console.error(error.message)
                res.status(500).json("internal server error") 
        }
})

module.exports = router  