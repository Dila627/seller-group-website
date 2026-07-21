import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplets,
  Factory,
  Globe2,
  Layers3,
  PackageCheck,
  PaintRoller,
  ShieldCheck,
  Truck,
  UsersRound,
  Wrench,
} from "lucide-react";
import BrandCard from "../components/BrandCard.jsx";
import CatalogProductCard from "../components/CatalogProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { brands, getBrandById, products } from "../data/catalog.js";
import { AppLink } from "../lib/navigation.jsx";

const solutionVisuals = [
  { icon: Droplets },
  { icon: ShieldCheck },
  { icon: PaintRoller },
  { icon: Wrench },
];

export function AboutSection({ copy }) {
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

export function AudienceSection({ copy }) {
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

export function ServicesSection({ copy }) {
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

export function BrandsSection({ copy, language }) {
  const visibleBrands = brands.filter((brand) => brand.showInBrandSection !== false);

  return (
    <section id="brands" className="home-brands-section section-padding scroll-mt-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading {...copy.brands} />
        </Reveal>
        <div className="brand-premium-grid mt-12">
          {visibleBrands.map((brand) => {
            return (
              <Reveal key={brand.id}>
                <BrandCard
                  brand={brand}
                  language={language}
                  label={copy.common.moreDetails}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ copy }) {
  const icons = [Building2, Globe2, UsersRound, Truck];

  return (
    <section className="home-stats-section">
      <div className="container-shell">
        <Reveal className="home-stats-panel">
          {copy.stats.items.map((item, index) => {
            const Icon = icons[index] ?? CheckCircle2;

            return (
              <div key={`${item.value}-${item.label}`} className="home-stat-item">
                <span className="home-stat-icon">
                  <Icon size={26} />
                </span>
                <span className="home-stat-value">{item.value}</span>
                <span className="home-stat-label">{item.label}</span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

export function SolutionsSection({ copy }) {
  return (
    <section className="solutions-section section-padding">
      <div className="container-shell">
        <Reveal>
          <SectionHeading {...copy.solutions} />
        </Reveal>
        <div className="solutions-grid mt-12">
          {copy.solutions.items.map((item, index) => {
            const visual = solutionVisuals[index] ?? solutionVisuals[0];
            const Icon = visual.icon ?? Layers3;

            return (
              <Reveal key={item.title}>
                <article className="solution-card">
                  <div className="solution-card__content">
                    <span className="solution-card__icon">
                      <Icon size={24} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection({ copy, language }) {
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
