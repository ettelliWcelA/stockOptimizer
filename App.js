import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/stocks/user123").then(res => setStocks(res.data));
  }, []);

  const addStock = () => {
    axios.post("http://localhost:5000/stocks/add", {
      userId: "user123",
      stockSymbol: symbol,
      quantity: parseInt(quantity),
      purchasePrice: 100
    }).then(() => {
      setStocks([...stocks, { stockSymbol: symbol, quantity }]);
      setSymbol("");
      setQuantity("");
    });
  };

  const getRecommendations = () => {
    axios.post("http://localhost:5000/stocks/optimize", { stocks })
      .then(res => setRecommendations(res.data));
  };

  return (
    <div>
      <h1>Stock Portfolio Optimizer</h1>
      <input type="text" placeholder="Stock Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={addStock}>Add Stock</button>
      <button onClick={getRecommendations}>Optimize Portfolio</button>
      
      <h2>Your Holdings</h2>
      <ul>
        {stocks.map((stock, index) => <li key={index}>{stock.stockSymbol} - {stock.quantity}</li>)}
      </ul>

      <h2>AI Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => <li key={index}>{rec.stock}: {rec.action}</li>)}
      </ul>
    </div>
  );
}

export default App;
