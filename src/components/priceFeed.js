import React, { useState, useEffect } from 'react';
import logo from '../../src/solana-sol-logo.svg';

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&precision=2";

export default function PriceFeed() {
    const [solPrice, setSolPrice] = useState(null);

    const fetchSolPrice = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const price = data.solana.usd;
            setSolPrice(price);
        } catch (error) {
            console.log(`Error fetching the Solana price: ${error.message}`)
        }
    }

    useEffect(() => {
        fetchSolPrice();

        const interval = setInterval(() => {
            fetchSolPrice();
        }, 10000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <img src={logo} className={"App-logo"} alt="Solana logo" />
            <h1 id="price-feed">
                <a className="App-link" href="https://www.coingecko.com/en/coins/solana" target="_blank" rel="noopener noreferrer">
                    {solPrice !== null ? (<span id="price-id">{solPrice}$</span>) : (<span id="price-id">Loading...</span>)}
                </a>
            </h1>
        </div>
    );
}