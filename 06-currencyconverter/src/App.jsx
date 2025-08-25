import { useState, useId } from "react";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const [fromValue, setFromValue] = useState(10);
  const [toValue, setToValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const id = useId();

  const currencyInfo = useCurrencyInfo(fromCurrency); 
  const options = Object.keys(currencyInfo); 

  const convert = () => {
    const rate = currencyInfo[toCurrency];
    if (rate) setToValue((fromValue * rate).toFixed(4));
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/stock-market-background_1409-1426.jpg')] bg-cover bg-center opacity-20"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[400px]">
        
        {/* From section */}
        <div className="mb-4">
          <label htmlFor={id} className="block text-white text-sm mb-2">From</label>
          <div className="flex">
            <input
              id={id}
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(Number(e.target.value))}
              className="w-full p-3 rounded-l-lg bg-white text-gray-900 focus:outline-none"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="p-3 rounded-r-lg bg-gray-200 text-gray-900 focus:outline-none"
            >
              {options.map((currency) => (
                <option key={currency} value={currency}>{currency.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={swap}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Swap
          </button>
        </div>

        {/* To section */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-2">To</label>
          <div className="flex">
            <input
              type="number"
              value={toValue}
              onChange={(e) => setToValue(Number(e.target.value))}
              className="w-full p-3 rounded-l-lg bg-white text-gray-900 focus:outline-none"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="p-3 rounded-r-lg bg-gray-200 text-gray-900 focus:outline-none"
            >
              {options.map((currency) => (
                <option key={currency} value={currency}>{currency.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button 
          onClick={convert}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Convert {fromCurrency.toUpperCase()} → {toCurrency.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export default App;
