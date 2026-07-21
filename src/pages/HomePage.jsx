import Footer from "../sections/Footer.jsx";
import {
  AboutSection,
  AudienceSection,
  BrandsSection,
  ProductsSection,
  ServicesSection,
  SolutionsSection,
  StatsSection,
} from "../sections/HomeContentSections.jsx";
import HeroSection from "../sections/HeroSection.jsx";

function HomePage({ copy, language }) {
  return (
    <>
      <HeroSection copy={copy} language={language} />
      <BrandsSection copy={copy} language={language} />
      <StatsSection copy={copy} />
      <SolutionsSection copy={copy} />
      <AboutSection copy={copy} />
      <AudienceSection copy={copy} />
      <ServicesSection copy={copy} />
      <ProductsSection copy={copy} language={language} />
      <Footer copy={copy} />
    </>
  );
}

export default HomePage;
