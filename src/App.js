import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/pages/Home";
import Cart from "./Components/pages/Cart";
import Favorite from "./Components/pages/Favorite";
import Orders from "./Components/pages/Orders";
import Registration from "./Components/User/Registration";
import Authorization from "./Components/User/Authorisation";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Registration />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </div>
  );
}

export default App;
