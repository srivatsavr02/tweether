const { create } = require("ipfs-http-client");
const ipfs = create("http://localhost:5001");

export default ipfs;
