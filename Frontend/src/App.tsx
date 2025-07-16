
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Element } from "react-scroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Home";
import Carousel from "./components/Carousel";
import About from "./components/About";
import Team from "./components/Team";
import Events from "./components/Events";
import Vlogs from "./components/Vlogs";
import Sponsors from "./components/Sponsors";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import Footer from "../Layout/Footer";
import Joinus from "./pages/Joinus";

// Admin Components
import HiddenAdminLogin from "./components/Admin/HiddenAdminLogin";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import CarouselManagement from "./components/Admin/CarouselManagement";
import EventManagement from "./components/Admin/EventManagement";
import SponsorsManagement from "./components/Admin/SponsorsManagement";
import TeamManagement from "./components/Admin/TeamManagement";
import VlogsManagement from "./components/Admin/VlogsManagement";

// TermsAndConditions
import TermsAndConditions from "./pages/terms&condition";
import PrivacyPolicy from "./pages/privacyPolicy";
import Error404 from "./pages/Error404";
import ComingSoon from "./pages/CoomingSoon";
import RegistrationForm from "./components/Events/RegistrationForm";
import EventDetails from "./components/Events/Eventinfomation";
import Dashboard from "./components/User/Dashboard";
import AuthPage from "./components/AuthPage";
import { AuthProvider } from "./components/AuthContext";
import ResumeBuilder from "./components/AI-Driven resume builder/ResumeBuilder";
import InterviewPrep from "./components/AI Interview prep/InterviewPrep";
// import background from "../public/TechnoverseBg.png";

// 🛠 Navbar Wrapper Component (conditionally render Navbar)
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // 🛠 Agar Admin Panel (`/admin/*`) ya Dashboard (`/dashboard`) pe ho toh Navbar HIDE karo
  const hideNavbar = location.pathname.startsWith("/admin") || location.pathname === "/dashboard";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <HiddenAdminLogin />
        
        <Routes>
          {/* 🔥 ✅ Admin Login Route */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* 🔥 ✅ Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route index element={<h1>Welcome to Admin Dashboard</h1>} />
            <Route path="carousel" element={<CarouselManagement />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="vlogs" element={<VlogsManagement />} />
            <Route path="sponsors" element={<SponsorsManagement />} />
          </Route>

          {/* 🔥 ✅ Public Routes with Layout (Navbar conditionally rendered) */}
          <Route
            path="/"
            element={
              <Layout>
                
             <div 
              className=" bg-cover  bg-no-repeat bg-fixed"
                style={{ backgroundImage: 'url("/TechnoverseBg.png")' }}
             >
                  <Element name="home">
                    <Hero />
                    <Carousel />
                  </Element>
                  <Element name="about">
                    <About />
                  </Element>
                  <Element name="team">
                    <Team />
                  </Element>
                  <Element name="events">
                    <Events />
                  </Element>
                  <Element name="vlogs">
                    <Vlogs />
                  </Element>
                  <Sponsors />
                  <Element name="courses">
                    <Courses />
                  </Element>
                  <FAQ />
                </div>
                <Footer />
              </Layout>
            }
          />

          {/* 🔥 ✅ Authentication & Other Pages */}
          <Route path="/register/:id" element={<Layout><RegistrationForm /></Layout>} />
          <Route path="/event/:id" element={<Layout><EventDetails /></Layout>} />
          <Route path="/auth" element={<Layout><AuthPage /></Layout>} />
          <Route path="/joinus" element={<Layout><Joinus /></Layout>} />
          <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/terms-and-conditions" element={<Layout><TermsAndConditions /></Layout>} />
          <Route path="/resume-builder" element={<Layout><ResumeBuilder/></Layout>} />
          <Route path="/interview-prep" element={<Layout><InterviewPrep/></Layout>} />
          
          {/* 🔥 ✅ Dashboard Route (Navbar hidden) */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 🔥 ✅ 404 Page */}
          <Route path="*" element={<Error404 />} />
          <Route path="/coming-soon" element={<Layout><ComingSoon /></Layout>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
