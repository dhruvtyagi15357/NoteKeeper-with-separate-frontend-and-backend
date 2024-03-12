const jwt = require("jsonwebtoken")
const JWT_SECRET = "Dhruv is a good $oy"

// get the user from the JWT tokem and add id to the req object
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Invalid credentials!"})
        return
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        
    } catch (error) {
        res.status(401).send("Invalid credentials!")
        return
    }


    next()
}
module.exports = fetchuser;