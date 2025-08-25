import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency = "USD") {
  const [currencyData, setCurrencyData] = useState({});

  useEffect(() => {
    // Fetch currency data when baseCurrency changes
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyData(data.rates || {}); // Store rates
      })
      .catch((err) => {
        console.error("Failed to fetch currency data:", err);
      });
  }, [baseCurrency]); // Dependency array ensures re-fetch on baseCurrency change

  return currencyData;
}

export default useCurrencyInfo;
