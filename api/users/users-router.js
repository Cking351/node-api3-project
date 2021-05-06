const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {
	validateUserId,
	validateUser,
	validatePost,
} = require("../middleware/middleware.js");

const router = express.Router();

router.get("/", (req, res, next) => {
	// RETURN AN ARRAY WITH ALL THE USERS
	Users.get()
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => next(err));
});

router.get("/:id", validateUserId, (req, res) => {
	// RETURN THE USER OBJECT
	// this needs a middleware to verify user id
	res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
	// RETURN THE NEWLY CREATED USER OBJECT
	// this needs a middleware to check that the request body is valid
	Users.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch(next);
});

router.put("/:id", validateUserId, (req, res, next) => {
	// RETURN THE FRESHLY UPDATED USER OBJECT
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	console.log(req.user);
	const id = req.params.id;
	Users.update(id, req.body)
		.then(() => res.status(200).json(req.body))
		.catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
	// RETURN THE FRESHLY DELETED USER OBJECT
	// this needs a middleware to verify user id
	const id = req.params.id;
	Users.remove(id).then((user) => res.status(200).json(user));
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
	// RETURN THE ARRAY OF USER POSTS
	// this needs a middleware to verify user id
	const id = req.params.id;
	Posts.getById(id)
		.then((response) => res.status(200).json(response))
		.catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
	// RETURN THE NEWLY CREATED USER POST
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	let body = req.body;
	body.user_id = req.params.id;
	console.log(body);
	Posts.insert(body)
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// do not forget to export the router
module.exports = router;
