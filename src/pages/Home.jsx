import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
 // Make sure to import the Refunds component

const Home = () => {
  return (
    <div>
      <Header />
      <NavBar />
      {/* {<Footer />} */}
    </div>
  );
};

export default Home;

