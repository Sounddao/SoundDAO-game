import React, { useState } from 'react';
import './NFTMarketplace.css';

const NFTMarketplace = ({ provider, account }) => {
  const [nfts, setNfts] = useState([
    { id: 1, name: 'Sound Wave #1', price: 100, image: '🎵', seller: '0x123...' },
    { id: 2, name: 'Beat Drop #42', price: 250, image: '🎶', seller: '0x456...' },
    { id: 3, name: 'Melody Mix #7', price: 150, image: '🎼', seller: '0x789...' }
  ]);

  const buyNFT = async (nftId, price) => {
    try {
      alert(`Purchasing NFT #${nftId} for ${price} SND tokens!`);
    } catch (error) {
      console.error('Error buying NFT:', error);
    }
  };

  const listNFT = () => {
    alert('List NFT feature coming soon!');
  };

  return (
    <div className="nft-marketplace">
      <h2>NFT Marketplace</h2>
      <button onClick={listNFT} className="list-btn">List Your NFT</button>
      
      <div className="nft-grid">
        {nfts.map(nft => (
          <div key={nft.id} className="nft-card">
            <div className="nft-image">{nft.image}</div>
            <h3>{nft.name}</h3>
            <p className="nft-price">{nft.price} SND</p>
            <p className="nft-seller">Seller: {nft.seller}</p>
            <button onClick={() => buyNFT(nft.id, nft.price)} className="buy-btn">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;