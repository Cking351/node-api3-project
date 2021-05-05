// require your server and launch it
const server = require("./api/server.js");

const port = 5000;

server.listen(() => {
	console.log("Listening on port", port);
});
