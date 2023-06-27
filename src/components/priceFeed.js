import React, { useState, useEffect } from 'react';
import logo from '../../src/solana-sol-logo.svg';

// Request CoinGecko URL
const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&precision=2";

export default function PriceFeed() {
    // price state
    const [solPrice, setSolPrice] = useState(null);

    // funtction that fetches and sets the Sol price
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

    // effect hook that re-fetches the price on the first render and then every 10 seconds
    useEffect(() => {
        fetchSolPrice();

        const interval = setInterval(() => {
            fetchSolPrice();
        }, 10000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    // JSX return statement that checks if solPrice is null and sets its value
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