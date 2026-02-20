from flask import Flask, request, jsonify
import pandas as pd
import requests

app = Flask(__name__)

# Dummy AI Model - Predicts optimized portfolio
def optimize_portfolio(user_stocks):
    recommendations = []
    for stock in user_stocks:
        if stock["quantity"] > 10:
            recommendations.append({"stock": stock["stockSymbol"], "action": "Reduce"})
        else:
            recommendations.append({"stock": stock["stockSymbol"], "action": "Hold"})
    return recommendations

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    optimized_portfolio = optimize_portfolio(data["stocks"])
    return jsonify(optimized_portfolio)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
