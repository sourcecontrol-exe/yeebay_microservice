
import buildClient from "../api/build-client"

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>you are signed in </h1> : <h1> you are signed out</h1>
};

LandingPage.getInitialProps = async (context) => {

  const client = buildClient(context);

  const {data} =  await client.get("api/users/currentuser");

   return data;
};

export default LandingPage;
  