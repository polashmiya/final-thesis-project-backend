const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.send("Error " + err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.send(user);
	} catch (err) {
		res.send("Error " + err);
	}
});

// Delete Method
router.delete("/:id", (req, res) => {
	User.findByIdAndRemove(req.params.id)
		.then((user) => {
			if (user)
				return res
					.status(200)
					.json({ success: true, message: "User is deleted successfully" });
			else
				return res
					.status(404)
					.json({ success: false, message: "User is not found" });
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err });
		});
})

// router.patch("/:id", async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		const a1 = await user.save();
// 		res.json(a1);
// 	} catch (err) {
// 		res.send("Error");
// 	}
// });

module.exports = router;
