import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Profile/Login";
import Signup from "./components/Profile/Signup";
import ShoppingCart from "./components/Cart/ShoppingCart";
import Account from "./components/Profile/Account";
import Favourites from "./components/Favourites/Favourites";
import AddTocart from "./components/Cart/AddTocart";
import Semikanchipattu from "./components/Sares/semikanchipattu/semikanchipattu";
import Lightweightpattu from "./components/Sares/lightweightpattu/lightweightpattu";
import Softsilk from "./components/Sares/softsilk/softsilk";
import Purekanchipattu from "./components/Sares/purekanchipattu/purekanchipattu";
import Bridalware from "./components/Sares/Bridalware/bridalware";
import Purekanjivaram from "./components/Sares/Purekanjivaram/purekanjivaram";
import Adminheader from "./components/Admin/adminheader";
import Admincustomer from "./components/Admin/Admin-customer/admin-customer";
import Adminfeedback from "./components/Admin/Admin-feedback/adminfeedback";
import Inventory from "./components/Admin/Admin-inventory/admininventory";
import Product from "./components/Admin/Products/Product";
import ProductUpdate from "./components/Admin/Products/tabs/productupdate";
import Productview from "./components/Sares/Productview/productview";
import Orders from "./components/Orders/orders";
import Address from "./components/Addresses/addresses";
import Ordersummary from "./components/Orders/orders";
import profile from './assets/WhatsApp.jpeg'
import CreateOrderForm from "./components/Orders/orders";
import Adminorders from "./components/Admin/Admin-orders/Adminorders";
import { FloatingWhatsApp } from "react-floating-whatsapp";


function App() {
  return (
    <>
      <BrowserRouter>
     {/* <Navbar /> */}
     <FloatingWhatsApp phoneNumber='6303364305' accountName='JK silks' avatar={profile}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/addtocart" element={<AddTocart />} />
          <Route path="/productview" element={<Productview />} />
          <Route path="/semikanchipattu" element={<Semikanchipattu />} />
          <Route path="/lightweightpattu" element={<Lightweightpattu />} />
          <Route path="/softsilk" element={<Softsilk />} />
          <Route path="/purekanchhipattu" element={<Purekanchipattu />} />
          <Route path="/bridalware" element={<Bridalware />} />
          <Route path="/purekanjivaram" element={<Purekanjivaram />} />
          <Route path="/address" element={<Address/>} />
          <Route path="/ordersummary" element={<CreateOrderForm/>} />

          {/* Admin */}
          <Route path="/adminheader" element={<Adminheader />} />
          <Route path="/admincustomer" element={<Admincustomer />} />
          <Route path="/inventory" element={<Inventory/>} />
          {/* <Route path="/adminproduct" element={<Adminproduct />} /> */}
          <Route path="/adminfeedback" element={<Adminfeedback />} />
          <Route path="/product" element={<Product />} />
          <Route path="/adminorders" element={<Adminorders />} />
          <Route path="/productupdate" element={<ProductUpdate/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
