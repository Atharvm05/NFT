// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTAccessPassport is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Tier definitions
    enum Tier { GENESIS, GOLD, LEGENDARY }
    
    // NFT progression levels
    struct PassportData {
        Tier tier;
        uint256 level;
        uint256 xp;
        uint256 mintTimestamp;
        string metadataURI;
    }

    // Pricing for each tier (in wei)
    mapping(Tier => uint256) public tierPrices;
    
    // Token data
    mapping(uint256 => PassportData) public passportData;
    
    // Events
    event PassportMinted(address indexed to, uint256 indexed tokenId, Tier tier);
    event PassportLevelUp(uint256 indexed tokenId, uint256 newLevel, uint256 newXP);
    event MetadataUpdated(uint256 indexed tokenId, string newMetadataURI);

    constructor() ERC721("NFT Access Passport", "NFTAP") {
        // Set initial prices (in MATIC)
        tierPrices[Tier.GENESIS] = 0.1 ether;
        tierPrices[Tier.GOLD] = 0.25 ether;
        tierPrices[Tier.LEGENDARY] = 0.5 ether;
    }

    function mintPassport(Tier _tier, string memory _metadataURI) public payable {
        require(msg.value >= tierPrices[_tier], "Insufficient payment");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _metadataURI);
        
        passportData[tokenId] = PassportData({
            tier: _tier,
            level: 1,
            xp: 0,
            mintTimestamp: block.timestamp,
            metadataURI: _metadataURI
        });
        
        emit PassportMinted(msg.sender, tokenId, _tier);
    }

    function addXP(uint256 _tokenId, uint256 _xpAmount) public onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        
        PassportData storage passport = passportData[_tokenId];
        passport.xp += _xpAmount;
        
        // Level up logic
        uint256 newLevel = calculateLevel(passport.xp);
        if (newLevel > passport.level) {
            passport.level = newLevel;
            emit PassportLevelUp(_tokenId, newLevel, passport.xp);
        }
    }

    function updateMetadata(uint256 _tokenId, string memory _newMetadataURI) public onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        
        _setTokenURI(_tokenId, _newMetadataURI);
        passportData[_tokenId].metadataURI = _newMetadataURI;
        
        emit MetadataUpdated(_tokenId, _newMetadataURI);
    }

    function calculateLevel(uint256 _xp) public pure returns (uint256) {
        if (_xp < 100) return 1;
        if (_xp < 300) return 2;
        if (_xp < 600) return 3;
        if (_xp < 1000) return 4;
        return 5; // Max level
    }

    function getPassportData(uint256 _tokenId) public view returns (PassportData memory) {
        require(_exists(_tokenId), "Token does not exist");
        return passportData[_tokenId];
    }

    function getUserTokens(address _user) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_user);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (_exists(i) && ownerOf(i) == _user) {
                tokenIds[index] = i;
                index++;
            }
        }
        
        return tokenIds;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function updateTierPrice(Tier _tier, uint256 _newPrice) public onlyOwner {
        tierPrices[_tier] = _newPrice;
    }

    // Override required by Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
