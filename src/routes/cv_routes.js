const  express = require("express");
const cvSchema = require("../models/cv_model")
const companySchema = require("../models/company_model")

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
        cvSchema.find({}).populate("assigned_company").sort({ sort : by }).exec((err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({ data: cv});
        })
    } else {
        cvSchema.find({}).populate("assigned_company").exec((err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            cv.forEach( (item) => {
                if(item.assigned_company != null){
                    item.available = false
                } else item.available = true
            })
            res.status(200).send({ data: cv});
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
                    res.status(200).send({ data: cv});
                })
                break;
            case "profession":
                cvSchema.find({}).sort({ profession : by }).exec((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send({ data: cv});
                })
                break;
            case "available":
                cvSchema.find({}).sort({ available : by }).exec((err, cv) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).send({ data: cv});
                })
                break;
        }
    } else {
        cvSchema.find({}, (err, cv) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send({ data: cv});
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
    companySchema.findOne({ nit: req.body.company_nit }, (err, company) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (company != null) {
                console.log("company id:",company._id)
                req.body.assigned_company = company._id
                console.log(req.body)
                cvSchema.findByIdAndUpdate(req.params.id, req.body).then( cv => {
                    if(!cv) {
                        res.status(404).send({ message : "CV not found" })
                    } else {
                        res.status(200).send({ message : "CV updated" })
                    }
                }).catch( err => {
                    res.status(500).send(err);
                })
            } else {
                if(req.body.company_nit == "" || req.body.company_nit == null) {
                    req.body.assigned_company = null
                }
                cvSchema.findByIdAndUpdate(req.params.id, req.body).then( cv => {
                    if(!cv) {
                        res.status(404).send({ message : "CV not found" })
                    } else {
                        res.status(200).send({ message : "CV updated" })
                    }
                }).catch( err => {
                    res.status(500).send(err);
                })
            }
        }
    })
    
})

module.exports = router;