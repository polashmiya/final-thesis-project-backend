const express = require("express");
const router = express.Router();
const NewSubmission = require("../model/submission.model");

router.get("/:department/:batch/:search", async (req, res) => {
  try {
    let { department, batch, search } = req.params;

    if (search !== "null") {
      console.log("get")
      const submission = await NewSubmission.find({ thesesName: { $regex: search, $options: "i" } }).sort({ _id: "desc" });
      res.json(submission);
    } else if (department === "All" && batch === "All") {
      const submission = await NewSubmission.find().sort({ _id: "desc" });
      res.json(submission);
    } else if (department === "All" && batch !== "All") {
      const submission = await NewSubmission.find({ batch }).sort({
        _id: "desc",
      });
      res.json(submission);
    } else if (department !== "All" && batch === "All") {
      const submission = await NewSubmission.find({ department }).sort({
        _id: "desc",
      });
      res.json(submission);
    } else if (department !== "All" && batch !== "All") {
      const submission = await NewSubmission.find({ department, batch }).sort({
        _id: "desc",
      });
      res.json(submission);
    }
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      thesesName,
      batch,
      department,
      teammateFirstName,
      teammateSecondName,
      teammateThirdName,
      teammateFourthName,
      superVisorName,
      coverPage,
      pdf,
    } = req.body;
    await NewSubmission.create({
      thesesName,
      batch,
      department,
      teammateFirstName,
      teammateSecondName,
      teammateThirdName,
      teammateFourthName,
      superVisorName,
      coverPage,
      pdf,
    });
    res.send({ status: 200, message: "Success" });
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/updatestatus", async (req, res) => {
  try {
    const { isApproved, thesisId } = req.body;
    const thesis = await NewSubmission.findById(thesisId);
    thesis.isApproved = isApproved;
    await thesis.save();
    res.send({ status: 200, message: "Success" });
  } catch (error) {
    res.send("Error " + err);
  }
});

module.exports = router;
