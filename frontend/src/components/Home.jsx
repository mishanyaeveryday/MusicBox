import React from "react";
import "../design/Home.css";
import { Button } from "@material-tailwind/react";
const Home = () => {
  return (
    <div className="main">
      <h1 style={{ fontFamily: 'Arsenal' }}>Hello</h1>
      <Button variant="gradient" color="red" className="from-red-200 via-red-300 to-red-100">Button</Button>
    </div>
  );
};

export default Home;