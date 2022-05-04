const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  compilers: {
    solc: {
      version: "0.8.0"
    }
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "192.168.1.4",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    jot: {
      host: "192.168.0.101",     // Localhost (default: none)
      port: 10106,            // Standard Ethereum port (default: none)
      network_id: 14333,       // Any network (default: none)
    }
  }
};
