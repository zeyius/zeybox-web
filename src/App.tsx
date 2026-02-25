import { Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import BestSellers from "./pages/BestSellers";
import GiftIdeas from "./pages/GiftIdeas";
import Enterprise from "./pages/Enterprise";
import Voucher from "./pages/Voucher";
import Login from "./pages/Login";
import BoxDetails from "./pages/BoxDetails";


export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/best-sellers" element={<BestSellers />} />
        <Route path="/box/:id" element={<BoxDetails />} />
        <Route path="/gift-ideas" element={<GiftIdeas />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/voucher" element={<Voucher />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}