const Migrations = artifacts.require("MainPagebc");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
