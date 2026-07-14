import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import BrandCard from "../components/BrandCard.jsx";
import CatalogProductCard from "../components/CatalogProductCard.jsx";
import ContactPanel from "../components/ContactPanel.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { brands, products, getBrandById, assets } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

const heroShowcases = [
  {
    id: "prestige",
    brand_ru: "Престиж",
    brand_az: "Престиж",
    image: "assets/hero-showcases/hero_prestige_showcase.webp",
  },
  {
    id: "novbytchim",
    brand_ru: "Новбытхим",
    brand_az: "Новбытхим",
    image: "assets/hero-showcases/hero_novbytchim_showcase.webp",
  },
  {
    id: "izower",
    brand_ru: "IZOWER",
    brand_az: "IZOWER",
    image: "assets/hero-showcases/hero_izower_showcase.webp",
  },
  {
    id: "qis",
    brand_ru: "QIS",
    brand_az: "QIS",
    image: "assets/hero-showcases/hero_qis_showcase.webp",
  },
  {
    id: "silex",
    brand_ru: "SILEX",
    brand_az: "SILEX",
    image: "assets/hero-showcases/hero_silex_showcase.webp",
  },
  {
    id: "radugameller",
    brand_ru: "Ultralines",
    brand_az: "Ultralines",
    image: "assets/hero-showcases/hero_radugamalar_showcase.webp",
  },
];

function handleHeroPointerMove(event) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

  event.currentTarget.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
  event.currentTarget.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
}

function handleHeroPointerLeave(event) {
  event.currentTarget.style.setProperty("--hero-x", "0px");
  event.currentTarget.style.setProperty("--hero-y", "0px");
}

function Hero({ copy, language }) {
  const heroImage = typeof assets.hero === "string" ? assets.hero : assets.hero[language] ?? assets.hero.ru;

  return (
    <section
      id="top"
      className="hero hero-premium relative isolate overflow-hidden bg-graphite text-white"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
    >
      <img
        src={assetPath(heroImage)}
        alt={copy.hero.imageAlt}
        fetchPriority="high"
        className="hero-premium__bg absolute inset-0 -z-30 h-full w-full object-cover"
      />
      <div className="hero-premium__shade absolute inset-0 -z-20" />
      <div className="hero-premium__light absolute inset-0 -z-10" aria-hidden="true" />
      <div className="hero-premium__dust absolute inset-0 -z-10" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="container-shell hero-premium__layout relative z-10 grid min-h-[690px] items-center gap-9 pb-14 pt-28 sm:min-h-[740px] sm:pb-16 sm:pt-32 lg:min-h-[790px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hero-copy-panel">
          <div className="hero-reveal hero-reveal--logo hero-sign">
            <span className="hero-sign__mark">
              <img src={assetPath(assets.logo)} alt="Seller Group Azerbaijan logo" />
            </span>
            <span>
              <span className="hero-sign__name">Seller Group</span>
              <span className="hero-sign__country">Azerbaijan</span>
            </span>
          </div>

          <p className="hero-reveal hero-reveal--eyebrow mt-7 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase text-copper-light backdrop-blur">
            {copy.hero.eyebrow}
          </p>
          <h1 className="hero-reveal hero-reveal--title mt-6 max-w-3xl whitespace-pre-line text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="hero-reveal hero-reveal--text mt-5 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            {copy.hero.text}
          </p>
          <div className="hero-reveal hero-reveal--actions mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink
              href="/#contacts"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-extrabold text-graphite transition hover:bg-copper-light"
            >
              {copy.common.contactUs}
              <ArrowRight size={18} />
            </AppLink>
            <AppLink
              href="/catalog"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/[0.15]"
            >
              {copy.common.productCatalog}
            </AppLink>
          </div>
        </div>

        <div
          className="hero-reveal hero-reveal--products hero-showcase"
          aria-label={copy.hero.showcaseLabel}
        >
          <div className="hero-showcase__header">
            <span>{copy.hero.showcaseTitle}</span>
            <span>{heroShowcases.length}</span>
          </div>
          <div className="hero-showcase__rack">
            {heroShowcases.map((showcase, index) => (
              <figure
                key={showcase.id}
                className="hero-showcase-card"
                style={{ "--showcase-index": index }}
              >
                <figcaption>{showcase[`brand_${language}`] ?? showcase.brand_ru}</figcaption>
                <div className="hero-showcase-card__media">
                  <img
                    src={assetPath(showcase.image)}
                    alt={`${showcase[`brand_${language}`] ?? showcase.brand_ru} — Seller Group Azerbaijan`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ copy }) {
  const icons = [Building2, Factory, ShieldCheck, CheckCircle2];

  return (
    <section id="about" className="section-padding scroll-mt-28 bg-white">
      <div className="container-shell">
        <Reveal>
          <SectionHeading {...copy.about} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {copy.about.blocks.map((block, index) => {
            const Icon = icons[index] ?? CheckCircle2;

            return (
              <Reveal key={block.title} className="business-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                  <Icon size={23} />
                </div>
                <h3 className="mt-6 text-xl font-black text-graphite">{block.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{block.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Audience({ copy }) {
  return (
    <section className="section-padding bg-slate-100">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <SectionHeading {...copy.audience} />
        </Reveal>
        <Reveal className="grid gap-3 sm:grid-cols-2">
          {copy.audience.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
            >
              <CheckCircle2 size={20} className="shrink-0 text-copper-dark" />
              <span className="text-sm font-extrabold text-graphite">{item}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Services({ copy }) {
  const icons = [CheckCircle2, Factory, Building2, ShieldCheck, CheckCircle2];
  const highlightIcons = [Wrench, Truck];

  return (
    <section id="services" className="section-padding scroll-mt-28 bg-white">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <Reveal>
            <SectionHeading {...copy.services} />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.services.highlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? PackageCheck;

              return (
                <Reveal key={item.title} className="business-card p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                    <Icon size={23} />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-graphite">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {copy.services.items.map((item, index) => {
            const Icon = icons[index] ?? CheckCircle2;

            return (
              <Reveal
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-copper-dark shadow-sm">
                  <Icon size={19} />
                </span>
                <p className="text-sm font-extrabold leading-6 text-graphite">{item}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Brands({ copy, language }) {
  const visibleBrands = brands.filter((brand) => brand.showInBrandSection !== false);

  return (
    <section id="brands" className="section-padding scroll-mt-28 bg-white">
      <div className="container-shell">
        <Reveal>
          <SectionHeading {...copy.brands} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleBrands.map((brand) => (
            <Reveal key={brand.id}>
              <BrandCard brand={brand} language={language} label={copy.common.viewBrand} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products({ copy, language }) {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);

  return (
    <section id="products" className="section-padding scroll-mt-28 bg-slate-100">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading {...copy.products} />
          </Reveal>
          <Reveal className="hidden lg:block">
            <AppLink
              href="/catalog"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-extrabold text-white transition hover:bg-graphite"
            >
              {copy.products.cta}
              <ArrowRight size={17} />
            </AppLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => {
            const brand = getBrandById(product.brandId);

            return (
              <Reveal key={product.id}>
                <CatalogProductCard
                  product={product}
                  brand={brand}
                  language={language}
                  copy={{
                    ...copy.catalog.card,
                  }}
                />
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-9 flex justify-center lg:hidden">
          <AppLink
            href="/catalog"
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-extrabold text-white transition hover:bg-graphite"
          >
            {copy.products.cta}
            <ArrowRight size={17} />
          </AppLink>
        </Reveal>
      </div>
    </section>
  );
}

function HomePage({ copy, language }) {
  return (
    <>
      <Hero copy={copy} language={language} />
      <About copy={copy} />
      <Audience copy={copy} />
      <Services copy={copy} />
      <Brands copy={copy} language={language} />
      <Products copy={copy} language={language} />
      <ContactPanel copy={copy} />
    </>
  );
}

export default HomePage;
