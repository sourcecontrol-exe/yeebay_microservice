const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>you are signed in </h1> : <h1> you are signed out</h1>
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   return {};
};

export default LandingPage;
  