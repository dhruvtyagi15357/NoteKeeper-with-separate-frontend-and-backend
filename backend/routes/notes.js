const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//Route 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) =>{
    try{
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
    } catch (err) {
        res.status(500).send("Internal server error")
        console.log(err)
    }
})

//Route 2: Add a new note using post
router.post('/addnote', fetchuser, [
    body('title', 'Title length should be atleast 3').isLength({min:3}),
    body('description', 'Description length should be atleast 5').isLength({min:5})
], async (req, res) =>{
    try{
        const error = validationResult(req);
        if (!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag:req.body.tag,
        })

        const savednote = await note.save()
        res.json(savednote)
    } catch (err) {
        res.status(500).send("Internal server error")
        console.log(err)
    }    

})

//Route 3: Update note using put
router.put('/updatenote/:id', fetchuser, 
// [
//     body('title', 'Title length should be atleast 3').isLength({min:3}),
//     body('description', 'Description length should be atleast 5').isLength({min:5})
// ],
async (req, res) =>{
    try{
        const {title, description, tag} = req.body
        // create new note object
        const newNote = {}
        if(title){
            newNote.title = title
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }


        // find the node to be updated and update it.
        var note = await Notes.findOne({_id: req.params.id, user: req.user.id})
        if(!note){
            res.status(404).send('No such note found')
            return
        }
        

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json(note)

    } catch (err) {
        res.status(500).send("Internal server error")
        console.log(err)
    }
})

//Route 4: delete note using delete
router.delete('/deletenote/:id', fetchuser,
async (req, res) =>{
    try{
        // create new note object
        // find the node to be deleted and delete it.
        var note = await Notes.findOne({_id: req.params.id, user: req.user.id})
        if(!note){
            res.status(404).send('No such note found')
            return
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success" : "Note has been deleted", note:note})

    } catch (err) {
        res.status(500).send("Internal server error")
        console.log(err)
    }
})

module.exports = router