import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import Countries from "./components/Countries.jsx";
import Catalog from "./components/Catalog.jsx";
import BrandPage from "./components/BrandPage.jsx";
import FloatingContact from "./components/FloatingContact.jsx";
import Footer from "./components/Footer.jsx";
import { brands } from "./data/sellerContent.js";

function App() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const brand = brands.find((item) => item.page === currentPage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 antialiased">
      <Header />
      {brand ? (
        <BrandPage brand={brand} />
      ) : (
        <main>
          <Hero />
          <Stats />
          <SectionDivider />
          <Countries />
          <SectionDivider />
          <Catalog />
        </main>
      )}
      <FloatingContact />
      <Footer />
    </div>
  );
}

export default App;
