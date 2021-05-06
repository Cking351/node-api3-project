const express = require("express");

const { logger } = require("./middleware/middleware");

const userRouter = require("./users/users-router.js");

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(logger);

// global middlewares and the user's router need to be connected here
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
	res.status(500).json({
		message: "Something went wrong, please try again later.",
	});
});

module.exports = server;
