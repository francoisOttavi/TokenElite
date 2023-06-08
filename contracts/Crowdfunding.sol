// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Crowdfunding
 * @author François Ottavi
 * @dev A contract for crowdfunding NFTs using ERC721 tokens.
 */
contract Crowdfunding is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 0.05 ether;
  uint256 public maxSupply = 400;
  uint256 public maxMintAmount = 20;

  /**
   * @dev Initializes the contract.
   * @param _name The name of the token.
   * @param _symbol The symbol of the token.
   * @param _initBaseURI The initial base URI for token metadata.
   */
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  /**
   * @dev Overrides the baseURI function to return the base URI for token metadata.
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  /**
   * @dev Mints a specified number of NFTs to the caller.
   * @param _mintAmount The number of NFTs to mint.
   */
  function mint(uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(_mintAmount > 0, "Invalid mint amount");
    require(_mintAmount <= maxMintAmount, "Exceeds maximum mint amount");
    require(supply + _mintAmount <= maxSupply, "Exceeds maximum supply");

    if (msg.sender != owner()) {
      require(msg.value >= cost * _mintAmount, "Insufficient payment");
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(msg.sender, supply + i);
    }
  }

  /**
   * @dev Returns the token IDs owned by a given address.
   * @param _owner The address of the owner.
   * @return An array of token IDs owned by the address.
   */
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  /**
   * @dev Returns the URI for a given token ID.
   * @param tokenId The ID of the token.
   * @return The URI for the token.
   */
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  /**
   * @dev Emitted when a reward is claimed.
   * @param _owner The address of the owner claiming the reward.
   * @param mail The email address of the recipient.
   * @param nftID The ID of the NFT being rewarded.
   */
  event Reward(address indexed _owner, string mail, uint256 indexed nftID);

  /**
   * @dev Claims a reward for owning an NFT.
   * @param mail The email address of the recipient.
   * @param nftId The ID of the NFT to claim the reward for.
   */
  function claimReward(string memory mail, uint256 nftId) public payable {
    // Verify that the caller owns the NFT
    require(ownerOf(nftId) == msg.sender, "Caller does not own the NFT");
    emit Reward(msg.sender, mail, nftId);
  }

  /**
   * @dev Sets the maximum mint amount allowed.
   * @param _newmaxMintAmount The new maximum mint amount.
   */
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  /**
   * @dev Sets the base URI for token metadata.
   * @param _newBaseURI The new base URI.
   */
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  /**
   * @dev Sets the base extension for token metadata.
   * @param _newBaseExtension The new base extension.
   */
  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  /**
   * @dev Allows the owner to withdraw the contract balance.
   */
  function withdraw() public payable onlyOwner {
    (bool success, ) = payable(owner()).call{value: address(this).balance}("");
    require(success, "Withdrawal failed");
  }
}
