const Migrations = artifacts.require("MainPagebc");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

const Migrations1 = artifacts.require("Billingbc");

module.exports = function (deployer) {
  deployer.deploy(Migrations1);
};

const Migrations2 = artifacts.require("Userbc");

module.exports = function (deployer) {
  deployer.deploy(Migrations2);
};