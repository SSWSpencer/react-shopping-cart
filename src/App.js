import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import {ProductContext} from "./contexts/ProductContext";
import {CartContext} from "./contexts/CartContext";

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		setCart([...cart, item])
	};

	const removeItem = item => {
		let removedItem = false;
		for(let i = 0; i < cart.length; i++){
			if(item === cart[i].id && !removedItem){
				cart.splice(i, 1);
				removedItem = true;
			}
		}
		setCart([...cart])
	}

	return (
		<div className="App">
			<CartContext.Provider value={{cart, removeItem}}>
				<Navigation />
			</CartContext.Provider>

			{/* Routes */}
			<ProductContext.Provider value={{products, addItem}}>
				<Route exact path="/">
					<Products />
				</Route>
			</ProductContext.Provider>

			<CartContext.Provider value={{cart, removeItem}}>
				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</CartContext.Provider>
		</div>
	);
}

export default App;
