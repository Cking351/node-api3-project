const Users = require("../users/users-model.js");

function logger(req, res, next) {
	const TimeStamp = new Date().toISOString();
	console.log(
		`Time: ${TimeStamp} | Method Request: ${req.method} | URL called: ${req.url}`
	);
	next();
}

function validateUserId(req, res, next) {
	// DO YOUR MAGIC
	const id = req.params.id;
	Users.getById(id)
		.then((user) => {
			if (!user) {
				req.body = res.status(404).json({ message: "user not found" });
			} else {
				req.user = user;
				next();
			}
		})
		.catch((err) => next(err));
}

function validateUser(req, res, next) {
	// DO YOUR MAGIC
}

function validatePost(req, res, next) {
	// DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateUserId,
};
