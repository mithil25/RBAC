const AccessControl = artifacts.require("AccessControl");
const AccessToken = artifacts.require("AccessToken");

module.exports = async function (deployer) {
  await deployer.deploy(AccessToken);
  const token = await AccessToken.deployed();

  await deployer.deploy(AccessControl, token.address);
};