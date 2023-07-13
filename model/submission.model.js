const mongoose = require("mongoose");

const NewSubmissionSchema = new mongoose.Schema(
	{
		thesesName: { type: String },
		batch: { type: String },
		department: { type: String },
		teammateFirstName: { type: String },
		teammateSecondName: { type: String },
		teammateThirdName: { type: String },
		teammateFourthName: { type: String },
		superVisorName: { type: String },
		coverPage: { type: String },
		pdf: { type: String },
		isApproved : {type : Boolean, default: false}
	},
	{
		collection: "NewSubmission",
	}
);

module.exports = mongoose.model("NewSubmissionModel", NewSubmissionSchema);
