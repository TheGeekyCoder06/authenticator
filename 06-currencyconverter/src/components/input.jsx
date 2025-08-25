import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [currencyData, setCurrencyData] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency.toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyData(data.rates || {});
      })
      .catch((err) => {
        console.error("Error fetching currency data:", err);
        setCurrencyData({});
      });
  }, [baseCurrency]);

  return currencyData;
}

export default useCurrencyInfo;
