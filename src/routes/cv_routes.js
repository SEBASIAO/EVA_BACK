const  express = require("express");
const cvSchema = require("../models/cv_model")

const router = express.Router()

//create user
router.post("/cv", (req, res) => {
    cvSchema.findOne({ doc_number: req.body.doc_number }, (err, cv) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (cv != null) {
                res.status(409).send({ message : "Doc number already exists"})
            } else {
                const newCv = cvSchema(req.body);
                newCv.save((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(201).json(cv);
                });
            }
        }
    })
})

router.get("/cv", (req, res) => {
    const sort = req.params.sort
    const by = req.params.by
    if(sort != null && by != null){
        cvSchema.find({}).sort({ sort : by }).exec((err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(cv);
        })
    } else {
        cvSchema.find({}, (err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(cv);
        })
    }

})

router.get("/cv/:sort/:by", (req, res) => {
    const sort = req.params.sort
    const by = req.params.by
    if(sort != null && by != null){
        switch(sort){
            case "doc_number":
                cvSchema.find({}).sort({ doc_number : by }).exec((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cv);
                })
                break;
            case "profession":
                cvSchema.find({}).sort({ profession : by }).exec((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cv);
                })
                break;
            case "available":
                cvSchema.find({}).sort({ available : by }).exec((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cv);
                })
                break;
        }
    } else {
        cvSchema.find({}, (err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(cv);
        })
    }

})

router.delete("/cv/:id", (req, res) => {
    cvSchema.findByIdAndDelete(req.params.id).then( cv => {
        if(!cv) {
            res.status(404).send({ message : "CV not found" })
        } else {
            res.status(200).send({ message : "CV deleted" })
        }
    }).catch( err => {
        res.status(500).send(err);
    })
})

router.put("/cv/:id", (req, res) => {
    cvSchema.findByIdAndUpdate(req.params.id, req.body).then( cv => {
        if(!cv) {
            res.status(404).send({ message : "CV not found" })
        } else {
            res.status(200).send({ message : "CV updated" })
        }
    }).catch( err => {
        res.status(500).send(err);
    })
})

module.exports = router;