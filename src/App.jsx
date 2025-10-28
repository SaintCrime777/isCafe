import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Coffee from "./components/coffee";
import Dessert from "./components/Dessert";
import Bean from "./components/Bean";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />
      <Coffee />
      <Dessert />
      <Bean/>
      <Footer />
    </>
  );
}

export default App;
