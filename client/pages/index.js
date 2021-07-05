import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket =>{
    return(
      <tr key = {tickets.id}>
        <td>{ticket.id}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href ="/tickets/[ticketId]" as={`/ticket/${ticket.id}`}>
          <a>View</a>
          </Link>
        </td>
      </tr>
    );
  })

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data }
};

export default LandingPage;
