import { ArrowRight } from "lucide-react";
import { assets } from "../data/catalog.js";
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
    brand_ru: "Радуга Маляр",
    brand_az: "Радуга Маляр",
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

function HeroSection({ copy, language }) {
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
      <div className="hero-premium__grid absolute inset-0 -z-10" aria-hidden="true" />
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
              className="focus-ring hero-action hero-action--primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-extrabold text-graphite transition hover:bg-copper-light"
            >
              {copy.common.contactUs}
              <ArrowRight className="hero-action__arrow" size={18} />
            </AppLink>
            <AppLink
              href="/catalog"
              className="focus-ring hero-action hero-action--secondary inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/[0.15]"
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
                className="hero-showcase-card premium-tilt-card"
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

export default HeroSection;
