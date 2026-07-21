import { ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";
import {
  assets,
  getBrandById,
  getLocalizedBrand,
} from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

const heroShelfShowcases = [
  {
    brandId: "prestige",
    image: "assets/hero-showcases/hero_prestige_showcase.webp",
  },
  {
    brandId: "novbytchim",
    image: "assets/hero-showcases/hero_novbytchim_showcase.webp",
  },
  {
    brandId: "izower",
    image: "assets/hero-showcases/hero_izower_showcase.webp",
  },
  {
    brandId: "qis",
    image: "assets/hero-showcases/hero_qis_showcase.webp",
  },
  {
    brandId: "silex",
    image: "assets/hero-showcases/hero_silex_showcase.webp",
  },
  {
    brandId: "radugameller",
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

function getHeroShelfItems(language) {
  return heroShelfShowcases
    .map((item) => {
      const brand = getBrandById(item.brandId);

      if (!brand) {
        return null;
      }

      return {
        ...item,
        brand,
        localizedBrand: getLocalizedBrand(brand, language),
      };
    })
    .filter(Boolean);
}

function HeroConveyorCard({ item, isDuplicate, onShowcaseLoad }) {
  const { brand, image, localizedBrand } = item;

  return (
    <AppLink
      href={`/brands/${brand.id}`}
      className="focus-ring hero-product-card"
      aria-hidden={isDuplicate ? "true" : undefined}
      tabIndex={isDuplicate ? -1 : undefined}
    >
      <span className="hero-product-card__media">
        <img
          src={assetPath(image)}
          alt={isDuplicate ? "" : `${localizedBrand.name} ${localizedBrand.category}`}
          loading={isDuplicate ? "lazy" : "eager"}
          decoding="async"
          fetchPriority={isDuplicate ? "low" : "high"}
          onLoad={isDuplicate ? undefined : () => onShowcaseLoad(brand.id)}
          onError={isDuplicate ? undefined : () => onShowcaseLoad(brand.id)}
        />
      </span>
      <span className="hero-product-card__body">
        <span className="hero-product-card__brand">{localizedBrand.name}</span>
        <span className="hero-product-card__title">{localizedBrand.category}</span>
        <span className="hero-product-card__description">{localizedBrand.description}</span>
      </span>
    </AppLink>
  );
}

function HeroProductConveyor({ copy, language }) {
  const [conveyorDirection, setConveyorDirection] = useState("normal");
  const [loadedShowcaseIds, setLoadedShowcaseIds] = useState(() => new Set());
  const shelfItems = getHeroShelfItems(language);
  const conveyorReady = loadedShowcaseIds.size >= shelfItems.length;

  function markShowcaseLoaded(brandId) {
    setLoadedShowcaseIds((currentIds) => {
      if (currentIds.has(brandId)) {
        return currentIds;
      }

      const nextIds = new Set(currentIds);
      nextIds.add(brandId);
      return nextIds;
    });
  }

  return (
    <div
      className={`hero-reveal hero-reveal--shelf hero-product-shelf ${
        conveyorReady ? "hero-product-shelf--ready" : ""
      }`}
      style={{ "--conveyor-direction": conveyorDirection }}
    >
      <div className="hero-product-shelf__viewport">
        <div className="hero-product-shelf__track">
          {[...shelfItems, ...shelfItems].map((item, index) => (
            <HeroConveyorCard
              key={`${item.brand.id}-${index}`}
              item={item}
              isDuplicate={index >= shelfItems.length}
              onShowcaseLoad={markShowcaseLoaded}
            />
          ))}
        </div>
      </div>
      <div className="hero-product-shelf__controls" aria-hidden="false">
        <button
          type="button"
          className="focus-ring hero-product-shelf__control"
          aria-label={copy.hero.shelfPrevious}
          onClick={() => setConveyorDirection("reverse")}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="focus-ring hero-product-shelf__control"
          aria-label={copy.hero.shelfNext}
          onClick={() => setConveyorDirection("normal")}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function renderHeroTitle(title) {
  return title.split("\n").map((line, index) => (
    <span
      key={`${line}-${index}`}
      className={`hero-title-line ${index === 1 || index === 2 ? "hero-title-line--accent" : ""}`}
    >
      {line}
    </span>
  ));
}

function HeroSection({ copy, language }) {
  return (
    <section
      id="top"
      className="hero hero-premium relative isolate overflow-hidden bg-graphite text-white"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
    >
      <img
        className="hero-premium__bg absolute inset-0 -z-30 h-full w-full object-cover"
        src={assetPath(assets.hero)}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
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
          <h1 className="hero-reveal hero-reveal--title mt-6 max-w-3xl text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            {renderHeroTitle(copy.hero.title)}
          </h1>
          <p className="hero-reveal hero-reveal--text mt-5 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            {copy.hero.text}
          </p>
          <div className="hero-reveal hero-reveal--actions mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink
              href="/#contacts"
              className="focus-ring hero-action hero-action--primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-copper px-6 text-sm font-extrabold text-graphite transition hover:bg-copper-light"
            >
              <Phone size={17} />
              {copy.common.contactUs}
              <ArrowRight className="hero-action__arrow" size={18} />
            </AppLink>
            <AppLink
              href="/catalog"
              className="focus-ring hero-action hero-action--secondary inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/[0.15]"
            >
              <BookOpen size={17} />
              {copy.common.productCatalog}
            </AppLink>
          </div>

          <div className="hero-reveal hero-reveal--advantages hero-advantages" aria-label={copy.hero.showcaseLabel}>
            {copy.hero.advantages.map((item) => (
              <span key={item}>
                <Check size={16} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <HeroProductConveyor copy={copy} language={language} />
      </div>
    </section>
  );
}

export default HeroSection;
