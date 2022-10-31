const  express = require("express");
const cvSchema = require("../models/company_model")

const router = express.Router()

//create user
router.post("/company", (req, res) => {
    cvSchema.findOne({ nit: req.body.nit }, (err, cv) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (cv != null) {
                res.status(409).send({ message : "Nit already exists"})
            } else {
                const newCompany = cvSchema(req.body);
                newCompany.save((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(201).json(cv);
                });
            }
        }
    })
})

router.get("/company", (req, res) => {
    const sort = req.params.sort
    const by = req.params.by
    if(sort != null && by != null){
        cvSchema.find({}).sort({ sort : by }).exec((err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({ data: cv});
        })
    } else {
        cvSchema.find({}, (err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({ data: cv});
        })
    }

})

router.delete("/company/:id", (req, res) => {
    cvSchema.findByIdAndDelete(req.params.id).then( cv => {
        if(!cv) {
            res.status(404).send({ message : "Company not found" })
        } else {
            res.status(200).send({ message : "Company deleted" })
        }
    }).catch( err => {
        res.status(500).send(err);
    })
})

router.put("/company/:id", (req, res) => {
    cvSchema.findByIdAndUpdate(req.params.id, req.body).then( cv => {
        if(!cv) {
            res.status(404).send({ message : "Company not found" })
        } else {
            res.status(200).send({ message : "Company updated" })
        }
    }).catch( err => {
        res.status(500).send(err);
    })
})

module.exports = router;