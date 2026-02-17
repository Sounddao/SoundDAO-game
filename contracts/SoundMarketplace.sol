// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract SoundMarketplace {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed nftAddress, uint256 indexed tokenId, address seller, uint256 price);
    event Bought(address indexed nftAddress, uint256 indexed tokenId, address buyer, uint256 price);
    event Unlisted(address indexed nftAddress, uint256 indexed tokenId);

    function listNFT(address nftAddress, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than zero");

        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        listings[nftAddress][tokenId] = Listing(msg.sender, price);

        emit Listed(nftAddress, tokenId, msg.sender, price);
    }

    function buyNFT(address nftAddress, uint256 tokenId) external payable {
        Listing memory listing = listings[nftAddress][tokenId];

        require(listing.price > 0, "NFT not listed");
        require(msg.value >= listing.price, "Insufficient funds");

        payable(listing.seller).transfer(listing.price);
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        
        delete listings[nftAddress][tokenId];
        
        emit Bought(nftAddress, tokenId, msg.sender, listing.price);
    }

    function unlistNFT(address nftAddress, uint256 tokenId) external {
        Listing memory listing = listings[nftAddress][tokenId];

        require(msg.sender == listing.seller, "Only seller can unlist");
        
        delete listings[nftAddress][tokenId];
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);

        emit Unlisted(nftAddress, tokenId);
    }
}