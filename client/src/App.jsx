import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";
import ResortPage from "./pages/public/ResortPage";
import ExperiencesPage from "./pages/public/ExperiencesPage";
import GalleryPage from "./pages/public/GalleryPage";
import ContactPage from "./pages/public/ContactPage";
import RoomsPage from "./pages/public/RoomsPage";
import RoomDetailPage from "./pages/public/RoomDetailPage";
import BookingCheckoutPage from "./pages/public/BookingCheckoutPage";
import ConfirmationPage from "./pages/public/ConfirmationPage";
import EventsPage from "./pages/public/EventsPage";
import EventDetailPage from "./pages/public/EventDetailPage";

// Admin Imports
import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminOrders from "./pages/admin/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/resort" element={<ResortPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* ROOMS & BOOKING FLOW */}
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:slug" element={<RoomDetailPage />} />
        <Route path="/booking/checkout" element={<BookingCheckoutPage />} />
        <Route path="/booking/confirmation/:reference" element={<ConfirmationPage />} />
        
        {/* EVENTS FLOW */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        
        <Route path="*" element={<div className="container" style={{ padding: "8rem 0", textAlign: "center" }}><h1>404</h1><p>Page not found.</p></div>} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<LoginPage />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  );
}