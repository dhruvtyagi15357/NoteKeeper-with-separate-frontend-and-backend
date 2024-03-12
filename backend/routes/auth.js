const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require("bcryptjs")
const { body, validationResult } = require('express-validator')
const fetchuser = require("../middleware/fetchuser")


const jwt = require("jsonwebtoken")
const JWT_SECRET = "Dhruv is a good $oy"

//ROUTE 1: create a user using: POST "/api/auth/createuser"  no login required
router.post('/register', [
    body('email', "Enter valid email!").isEmail(),
    body('name').isLength({min:2, max:50}),
    body('password').isLength({min:5})
],async (req, res) =>{

    let success = false;

    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({success, error:error.array()})
    }

    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        
        const salt = await bcrypt.genSalt()
        const securepass = await bcrypt.hash(req.body.password, salt)
        
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securepass,
        })
        
        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(authToken)
        success = true
        res.json({success, authToken})


    } catch (err){
        // console.log(err)
        res.status(500).send(err.message)
    }
})

//Route 2: create a user using: POST "/api/auth/createuser"  no login required
router.post('/login', [
    body('email', "Enter valid email!").isEmail(),
    body('password', "Password cannot be blank").exists(),
],async (req, res) =>{
    const email = req.body.email
    const password = req.body.password
    let success = false;

    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success: success, error: 'sorry, user does not exist'})
        }
        const passwordCmp = await bcrypt.compare(password, user.password)
        if(!passwordCmp){
            return res.status(400).json({success: success, error: 'sorry, wrong password'})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success: success, authToken})

    } catch (err) {
        res.status(500).send(err.message)
        console.log(err)

    }

})

//Route 3: get user details using POST "api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        var userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (err) {
        res.status(500).send("Internal server error")
        console.log(err)
    }
})


module.exports = router