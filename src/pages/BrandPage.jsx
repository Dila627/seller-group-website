import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import BrandCard from "../components/BrandCard.jsx";
import OptimizedImage from "../components/OptimizedImage.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { brands, getLocalizedBrand, getProductsByBrandId } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import Footer from "../sections/Footer.jsx";

function BrandPage({ brand, copy, language }) {
  const brandProducts = getProductsByBrandId(brand.id);
  const relatedBrands = brands
    .filter((item) => item.showInBrandSection !== false && item.id !== brand.id)
    .slice(0, 4);
  const localizedBrand = getLocalizedBrand(brand, language);

  return (
    <>
      <section className="relative overflow-hidden bg-graphite pt-28 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,31,58,0.95),rgba(17,24,39,0.98))]" />
        <div className="container-shell relative grid gap-10 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <Reveal>
            <AppLink
              href="/#brands"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-copper-light transition hover:text-white"
            >
              <ArrowLeft size={16} />
              {copy.common.backToBrands}
            </AppLink>
            <p className="mt-8 section-eyebrow text-copper-light">{copy.brandPage.manufacturer}</p>
            <h1 className="mt-4 text-5xl font-black leading-tight text-white sm:text-6xl">
              {localizedBrand.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              {localizedBrand.description}
            </p>
            <AppLink
              href="/#contacts"
              className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-extrabold text-graphite transition hover:bg-copper-light"
            >
              {copy.common.contactUs}
              <ArrowRight size={18} />
            </AppLink>
          </Reveal>

          {brand.logo ? (
            <Reveal className="brand-logo-surface brand-page-logo-panel rounded-3xl border border-white/[0.15] bg-white p-6 shadow-premium">
              <OptimizedImage
                src={assetPath(brand.logo)}
                alt={`${localizedBrand.name} logo`}
                width="360"
                height="180"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="mx-auto h-auto max-h-40 w-full object-contain"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="section-eyebrow text-copper-dark">{copy.brandPage.advantages}</p>
            <h2 className="mt-4 section-title text-graphite">{localizedBrand.category}</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {localizedBrand.advantages.map((item) => (
              <Reveal key={item} className="business-card p-6">
                <CheckCircle2 size={24} className="text-copper-dark" />
                <p className="mt-5 text-sm font-extrabold leading-7 text-graphite">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {brandProducts.length > 0 ? (
        <section className="section-padding bg-slate-100">
          <div className="container-shell">
            <Reveal>
              <p className="section-eyebrow text-copper-dark">{copy.brandPage.catalog}</p>
              <h2 className="mt-4 section-title text-graphite">{copy.common.productCatalog}</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {brandProducts.map((product) => (
                <Reveal key={product.id}>
                  <ProductCard
                    product={product}
                    brand={brand}
                    language={language}
                    label={copy.catalog.card.more}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-shell">
          <Reveal>
            <p className="section-eyebrow text-copper-dark">{copy.brands.eyebrow}</p>
            <h2 className="mt-4 section-title text-graphite">{copy.brands.title}</h2>
          </Reveal>
          <div className="brand-related-grid mt-12">
            {relatedBrands.map((item) => (
              <Reveal key={item.id}>
                <BrandCard brand={item} language={language} label={copy.common.viewBrand} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer copy={copy} />
    </>
  );
}

export default BrandPage;
