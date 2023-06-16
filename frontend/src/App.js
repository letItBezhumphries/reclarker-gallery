import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import ArtworkListScreen from "./screens/ArtworkListScreen";
import ArtworkEditScreen from "./screens/ArtworkEditScreen";
import ArtworkScreen from "./screens/ArtworkScreen";
import OrderListScreen from "./screens/OrderListScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ArtistsListScreen from "./screens/ArtistsListScreen";
import ArtistScreen from "./screens/ArtistScreen";
import ExhibitionsListScreen from "./screens/ExhibitionsListScreen";
import ExhibitionScreen from "./screens/ExhibitionScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container fluid className="main-container">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact>
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route
                path="/search/:keyword/page/:pageNumber"
                element={<HomeScreen />}
              />
            </Route>
            <Route path="/artwork/:id" element={<ArtworkScreen />} />
            <Route path="/cart" element={<CartScreen />}>
              <Route path=":id" element={<CartScreen />} />
            </Route>
            <Route path="/artists" element={<ArtistsListScreen />} />
            <Route path="/artist" element={<ArtistScreen />}>
              <Route path=":id" element={<ArtistScreen />} />
            </Route>
            <Route path="/exhibits" element={<ExhibitionsListScreen />} />
            <Route path="/exhibit" element={<ExhibitionScreen />}>
              <Route path=":id" element={<ExhibitionScreen />} />
            </Route>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/artworklist" element={<ArtworkListScreen />} />
            <Route
              path="/admin/artworklist/:pageNumber"
              element={<ArtworkListScreen />}
            />
            <Route
              path="/admin/artwork/:id/edit"
              element={<ArtworkEditScreen />}
            />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
