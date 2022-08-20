const  express = require("express");
const userSchema = require("../models/user_model")

const router = express.Router()

//create user
router.post("/user", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (user != null) {
                res.status(409).send()
            } else {
                const newUser = userSchema(req.body);
                newUser.save((err, user) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(201).json(user);
                });
            }
        }
    })
})

router.post("/login", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (user != null) {
                if(req.body.password == user.password){
                    res.status(200).send({ status: 1, user: user })
                }else {
                    res.status(200).send({ status: 2, user: null })
                }
            } else {
                res.status(200).send({ status: 3, user: null })
            }
        }
    })
}) 

module.exports = router;