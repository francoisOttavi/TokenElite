// Import necessary libraries
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define the contract and accounts variables
let Crowdfunding;
let crowdfunding;
let owner;
let addr1;
let addr2;

// Start the test suite
describe("Crowdfunding", function () {
  // Deploy the contract before each test
  beforeEach(async function () {
    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    [owner, addr1, addr2] = await ethers.getSigners();
    crowdfunding = await Crowdfunding.deploy("Test", "TST", "https://example.com/");
    await crowdfunding.deployed();
  });

  // Test case for mint function
  it("should mint NFTs", async function () {
    await crowdfunding.connect(addr1).mint(5, { value: ethers.utils.parseEther("0.25") });
    const ownerTokens = await crowdfunding.walletOfOwner(addr1.address);
    expect(ownerTokens.length).to.equal(5);
  });

  // Test case for claiming reward
  it("should emit a Reward event", async function () {
    await crowdfunding.connect(addr1).mint(1, { value: ethers.utils.parseEther("0.05") });
    await expect(crowdfunding.connect(addr1).claimReward("test@example.com", 1))
      .to.emit(crowdfunding, "Reward")
      .withArgs(addr1.address, "test@example.com", 1);
  });

  // Test case for setting maxMintAmount by the owner
  it("should set maxMintAmount", async function () {
    await crowdfunding.connect(owner).setmaxMintAmount(30);
    const newMaxMintAmount = await crowdfunding.maxMintAmount();
    expect(newMaxMintAmount).to.equal(30);
  });


  // Test case for setting baseExtension by the owner
  it("should set baseExtension", async function () {
    await crowdfunding.connect(owner).setBaseExtension(".xml");
    const newBaseExtension = await crowdfunding.baseExtension();
    expect(newBaseExtension).to.equal(".xml");
  });

  // Test case for contract withdraw al by the owner
  it("should withdraw contract balance", async function () {
    const initialBalance = await ethers.provider.getBalance(owner.address);
    await crowdfunding.connect(addr1).mint(1, { value: ethers.utils.parseEther("0.05") });
    await crowdfunding.connect(owner).withdraw();
    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.be.gt(initialBalance);
  });


    // Test case for claiming reward without owning an NFT
  it("should revert when claiming reward without owning an NFT", async function () {
    await crowdfunding.connect(addr1).mint(1, { value: ethers.utils.parseEther("0.05") });
    await expect(crowdfunding.connect(addr2).claimReward("test@example.com", 1))
      .to.be.revertedWith("Caller does not own the NFT");
  });


});
