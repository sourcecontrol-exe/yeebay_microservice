import { useEffect, useState } from "react";

import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order , currentUser}) => {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const findTimeLeft = () => {

			const msleft = new Date(order.expiresAt) - new Date();
			setTimeLeft(Math.round(msleft / 1000));
		}
		findTimeLeft();
		const timerId = setTimeLeft(findTimeLeft, 1000);

		return () => {
			clearInterval(timerId);
		}
	}, [order]);
	if (timeLeft < 0) {
		return < div> Order Expired</div>
	}

	return <div>
		<StripeCheckout 
			token = {(token) => console.log(token)}
			stripeKey = "STRIPE_PUBLISHABLE_KEY"
			amount = {order.ticket.price * 100}
			email = {currentUser.email}
		/>
		Time Left : {timeLeft} seconds 
		</div>
}
OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);
	return { order: data };
}
export default OrderShow;