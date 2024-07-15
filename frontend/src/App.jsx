import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "./pages/HomePage";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import SubmitOrderPage from "./pages/SubmitOrderPage";
import OrderPage from "./pages/OrderPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer position="bottom-center" limit={1} />
        <Header></Header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
