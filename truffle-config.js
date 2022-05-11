const path = require("path");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "172.26.112.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    jot: {
      host: "192.168.1.159", // Localhost (default: none)
      port: 10106, // Standard Ethereum port (default: none)
      network_id: 14333, // Any network (default: none)
      from: "0x2A8976d471E5d09b7EaBb443A9A1a83233F65b3E",
      password: "minhthong511",
    },
  },
};
