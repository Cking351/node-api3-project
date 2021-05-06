// require your server and launch it
const server = require("./api/server.js");

const port = 5000;

console.log(server.port);

server.listen(port, () => {
	console.log("Listening on port", port);
});
