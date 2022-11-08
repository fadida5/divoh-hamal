const router = require("express").Router();
const Report = require("../models/Report.model");

router.route("/").get((req, res) => {
  Report.find()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  console.groupCollapsed("add post");
  console.log(res);
  
  
  const name = req.body.name;
  const lastname = req.body.lastname;
  const personalnumber = req.body.personalnumber;
  const cellphone = req.body.cellphone;
  const yhida = req.body.yhida;
  const typevent = req.body.typevent;
  const resevent = req.body.resevent;
  const cli = req.body.cli;
  const yn = req.body.yn;
  const selneshek = req.body.selneshek;
  const whap = req.body.whap;
  const rekemtype = req.body.rekemtype;
  const amlahtype = req.body.amlahtype;
  const mazavrekem = req.body.mazavrekem;
  const dwork = req.body.dwork;
  const mataftype = req.body.mataftype;
  const apitype = req.body.apitype;
  const mholaztype = req.body.mholaztype;
  const mhalztype = req.body.mhalztype;
  const pirot = req.body.pirot;
  const datevent = Date.parse(req.body.datevent);
  const mikom = req.body.mikom;
  const nifga = Number(req.body.nifga);
  
  const newReport = new Report({
    name,
    lastname,
    personalnumber,
    cellphone,
    yhida,
    typevent,
    resevent,
    cli,
    yn,
    selneshek,
    whap,
    amlahtype,
    rekemtype,
    mazavrekem,
    dwork,
    mataftype,
    apitype,
    mholaztype,
    mhalztype,
    pirot,
    datevent,
    mikom,
    nifga,
  });
  const formId = newReport.save((err, form) => {
    console.groupCollapsed("formId");
    console.log(form);
    console.log(err);
    console.groupEnd();
    if (err) {
      return res.status(400).json("Error: " + err);
    } else {
      res.send(form.id);
    }
    console.groupCollapsed("res after formId");
    console.log(res);
    console.groupEnd();
  });
  console.groupEnd();

});

//GET ALL SPECIFICK USER 
router.route("/:personalnumber").get((req, res) => {
  Report.findById({ personalnumber: req.params.personalnumber })
    .exec()
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Report.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Report.findByIdAndDelete(req.params.id)
    .then(() => res.json("Report deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Report.findById(req.params.id)
    .then((request) => {
      request.name = req.body.name;
      request.lastname = req.body.lastname;
      request.personalnumber = req.body.personalnumber;
      request.cellphone = req.body.cellphone;
      request.yhida = req.body.yhida;
      request.typevent = req.body.typevent;
      request.resevent = req.body.resevent;
      request.cli = req.body.cli;
      request.yn = req.body.yn;
      request.selneshek = req.body.selneshek;
      request.whap = req.body.whap;
      request.amlahtype = req.body.amlahtype;
      request.rekemtype = req.body.rekemtype;
      request.mazavrekem = req.body.mazavrekem;
      request.dwork = req.body.dwork;
      request.mataftype = req.body.mataftype;
      request.apitype = req.body.apitype;
      request.mholaztype = req.body.mholaztype;
      request.mhalztype = req.body.mhalztype;
      request.pirot = req.body.pirot;
      request.datevent = Date.parse(req.body.datevent);
      request.mikom = req.body.mikom;
      request.nifga = Number(req.body.nifga);

      request
        .save()
        .then(() => res.json("Report updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;