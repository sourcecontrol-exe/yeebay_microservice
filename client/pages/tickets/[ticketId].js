const TicketShow = () => {
	return (
		<div>
			<h1>{ticket.title}</h1>
			<h4>Price: {ticket.price}</h4>
		</div>
	)
}

TicketShow.getInitialProps = async(context, client)=>{
	const {ticketId} = context.query;
	const {data} = await client.get(`/api/tickets/${ticketsId}`);
	return {ticket : data};
};
 export default TicketShow;