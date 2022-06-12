import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';

function Shop() {
	const [goods, setGoods] = useState([]);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState([]);
	const [isBasketShow, setBasketSho] = useState(false);
	const [alertName, setAlertName] = useState('');

	const addToBasket = item => {
		const itemIndex = order.findIndex(el => el.mainId === item.mainId);

		if (itemIndex < 0) {
			const newItem = {
				...item,
				quantity: 1,
			};
			setOrder([...order, newItem]);
		} else {
			const newOrder = order.map((el, index) => {
				if (index === itemIndex) {
					return {
						...el,
						quantity: el.quantity + 1,
					};
				} else {
					return el;
				}
			});
			setOrder(newOrder);
		}
		setAlertName(item.displayName);
	};

	const removeFromBasket = itemId => {
		const newOrder = order.filter(el => el.mainId !== itemId);
		setOrder(newOrder);
	};

	const incQuantity = itemId => {
		const newOrder = order.map(el => {
			if (el.mainId === itemId) {
				const newQuantity = el.quantity + 1;
				return {
					...el,
					quantity: newQuantity,
				};
			} else {
				return el;
			}
		});
		setOrder(newOrder);
	};

	const decQuantity = itemId => {
		const newOrder = order.map(el => {
			if (el.mainId === itemId) {
				const newQuantity = el.quantity - 1;
				return {
					...el,
					quantity: newQuantity >= 0 ? newQuantity : 0,
				};
			} else {
				return el;
			}
		});
		setOrder(newOrder);
	};

	const handleBasketShow = () => {
		setBasketSho(!isBasketShow);
	};

	const handleCloseAlert = () => {
		setAlertName('');
	};

	useEffect(function getGoods() {
		fetch(API_URL, {
			headers: {
				Authorization: '2f10f3de-3757abb4-e73f8076-50bcb8da',
			},
		})
			.then(response => response.json())
			.then(data => {
				data.shop && setGoods(data.shop);
				setLoading(false);
			});
	}, []);

	return (
		<main className='container content'>
			<Cart quantity={order.length} handleBasketShow={handleBasketShow} />
			{loading ? (
				<Preloader />
			) : (
				<GoodsList goods={goods} addToBasket={addToBasket} />
			)}
			{isBasketShow && (
				<BasketList
					order={order}
					handleBasketShow={handleBasketShow}
					removeFromBasket={removeFromBasket}
					incQuantity={incQuantity}
					decQuantity={decQuantity}
				/>
			)}
			{alertName && (
				<Alert displayName={alertName} handleCloseAlert={handleCloseAlert} />
			)}
		</main>
	);
}

export { Shop };
