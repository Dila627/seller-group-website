import Footer from "../sections/Footer.jsx";
import {
  AboutSection,
  AudienceSection,
  BrandsSection,
  ProductsSection,
  ServicesSection,
} from "../sections/HomeContentSections.jsx";
import HeroSection from "../sections/HeroSection.jsx";

function HomePage({ copy, language }) {
  return (
    <>
      <HeroSection copy={copy} language={language} />
      <AboutSection copy={copy} />
      <AudienceSection copy={copy} />
      <ServicesSection copy={copy} />
      <BrandsSection copy={copy} language={language} />
      <ProductsSection copy={copy} language={language} />
      <Footer copy={copy} />
    </>
  );
}

export default HomePage;
