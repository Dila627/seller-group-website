import { ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const CONVEYOR_SPEED_DESKTOP = 56;
const CONVEYOR_SPEED_TABLET = 46;
const CONVEYOR_SPEED_MOBILE = 34;
const CONVEYOR_RESUME_DELAY = 3200;
const imagePreloadCache = new Map();

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

function preloadImage(src) {
  const imageSrc = assetPath(src);

  if (!imageSrc || typeof Image === "undefined") {
    return Promise.resolve();
  }

  if (imagePreloadCache.has(imageSrc)) {
    return imagePreloadCache.get(imageSrc);
  }

  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = resolve;
    image.onerror = resolve;
    image.src = imageSrc;
  });

  imagePreloadCache.set(imageSrc, promise);
  return promise;
}

function getResponsiveShowcase(image) {
  const base = image.replace(/\.webp$/i, "");

  return {
    src: assetPath(`${base}-800.jpg`),
    srcSet: [
      `${assetPath(`${base}-480.jpg`)} 480w`,
      `${assetPath(`${base}-800.jpg`)} 800w`,
      `${assetPath(image)} 1536w`,
    ].join(", "),
    preloadSrc: assetPath(`${base}-800.jpg`),
  };
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    if (typeof query.addEventListener === "function") {
      query.addEventListener("change", update);
    } else {
      query.addListener(update);
    }

    return () => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", update);
      } else {
        query.removeListener(update);
      }
    };
  }, []);

  return reducedMotion;
}

function useConveyorSpeed() {
  const [speed, setSpeed] = useState(CONVEYOR_SPEED_DESKTOP);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const tabletQuery = window.matchMedia("(max-width: 1024px)");

    const updateSpeed = () => {
      if (mobileQuery.matches) {
        setSpeed(CONVEYOR_SPEED_MOBILE);
      } else if (tabletQuery.matches) {
        setSpeed(CONVEYOR_SPEED_TABLET);
      } else {
        setSpeed(CONVEYOR_SPEED_DESKTOP);
      }
    };

    const addListener = (query) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", updateSpeed);
      } else {
        query.addListener(updateSpeed);
      }
    };

    const removeListener = (query) => {
      if (typeof query.removeEventListener === "function") {
        query.removeEventListener("change", updateSpeed);
      } else {
        query.removeListener(updateSpeed);
      }
    };

    updateSpeed();
    addListener(mobileQuery);
    addListener(tabletQuery);

    return () => {
      removeListener(mobileQuery);
      removeListener(tabletQuery);
    };
  }, []);

  return speed;
}

const HeroConveyorCard = memo(function HeroConveyorCard({
  item,
  isDuplicate,
  loadingMode,
  fetchPriority,
}) {
  const { brand, image, localizedBrand } = item;
  const responsiveImage = getResponsiveShowcase(image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <AppLink
      href={`/brands/${brand.id}`}
      className="focus-ring hero-product-card"
      aria-hidden={isDuplicate ? "true" : undefined}
      tabIndex={isDuplicate ? -1 : undefined}
    >
      <span className="hero-product-card__media">
        {imageFailed ? (
          <span className="hero-product-card__placeholder" aria-hidden="true">
            {localizedBrand.name}
          </span>
        ) : (
          <img
            src={responsiveImage.src}
            srcSet={responsiveImage.srcSet}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 380px"
            alt={isDuplicate ? "" : `${localizedBrand.name} ${localizedBrand.category}`}
            width="640"
            height="360"
            loading={loadingMode}
            decoding="async"
            fetchPriority={fetchPriority}
            className={`hero-product-card__image ${
              imageLoaded ? "hero-product-card__image--loaded" : ""
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true);
              setImageFailed(true);
            }}
          />
        )}
      </span>
      <span className="hero-product-card__body">
        <span className="hero-product-card__brand">{localizedBrand.name}</span>
        <span className="hero-product-card__title">{localizedBrand.category}</span>
        <span className="hero-product-card__description">{localizedBrand.description}</span>
      </span>
    </AppLink>
  );
});

function HeroConveyorGroup({ items, group, loadingPlan, groupRef }) {
  return (
    <div
      ref={groupRef}
      className="hero-product-shelf__group"
      aria-hidden={group === "clone" ? "true" : undefined}
    >
      {items.map((item, index) => {
        const imagePriority = loadingPlan[index] ?? {
          loadingMode: "lazy",
          fetchPriority: "low",
        };

        return (
          <HeroConveyorCard
            key={`${group}-${item.brand.id}`}
            item={item}
            isDuplicate={group === "clone"}
            loadingMode={group === "primary" ? imagePriority.loadingMode : "lazy"}
            fetchPriority={group === "primary" ? imagePriority.fetchPriority : "low"}
          />
        );
      })}
    </div>
  );
}

function HeroProductConveyor({ copy, language }) {
  const reducedMotion = usePrefersReducedMotion();
  const conveyorSpeed = useConveyorSpeed();
  const shelfItems = useMemo(() => getHeroShelfItems(language), [language]);
  const loadingPlan = useMemo(
    () =>
      shelfItems.map((_, index) => {
        if (index <= 1) {
          return { loadingMode: "eager", fetchPriority: "high" };
        }

        if (index <= 5) {
          return { loadingMode: "eager", fetchPriority: "auto" };
        }

        return { loadingMode: "lazy", fetchPriority: "low" };
      }),
    [shelfItems],
  );
  const [groupWidth, setGroupWidth] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const viewportRef = useRef(null);
  const groupRef = useRef(null);
  const trackRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    const urls = shelfItems.map((item) => getResponsiveShowcase(item.image).preloadSrc);
    let cancelled = false;

    setImagesReady(false);
    Promise.allSettled(urls.map((url) => preloadImage(url))).then(() => {
      if (!cancelled) {
        setImagesReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [shelfItems]);

  useEffect(() => {
    let active = true;

    if (!document.fonts?.ready) {
      setFontsReady(true);
      return undefined;
    }

    setFontsReady(false);
    document.fonts.ready.then(() => {
      if (active) {
        setFontsReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [language]);

  const measureCarousel = useCallback(() => {
    const group = groupRef.current;
    const firstCard = group?.querySelector(".hero-product-card");

    if (!group || !firstCard) {
      return;
    }

    const groupStyles = window.getComputedStyle(group);
    const gap = Number.parseFloat(groupStyles.columnGap || groupStyles.gap || "0") || 0;
    const width = firstCard.getBoundingClientRect().width;

    setGroupWidth(group.getBoundingClientRect().width);
    setStepSize(width + gap);
  }, []);

  useEffect(() => {
    measureCarousel();

    const group = groupRef.current;

    if (!group || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measureCarousel);

      return () => window.removeEventListener("resize", measureCarousel);
    }

    let active = true;
    const measureIfActive = () => {
      if (active) {
        measureCarousel();
      }
    };
    const observer = new ResizeObserver(measureIfActive);
    observer.observe(group);
    observer.observe(document.documentElement);
    document.fonts?.ready?.then(measureIfActive);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [measureCarousel, shelfItems.length]);

  const clearPauseTimeout = useCallback(() => {
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    clearPauseTimeout();
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, CONVEYOR_RESUME_DELAY);
  }, [clearPauseTimeout]);

  useEffect(() => {
    return () => {
      clearPauseTimeout();
    };
  }, [clearPauseTimeout]);

  const pauseOnHover = useCallback(() => {
    clearPauseTimeout();
    setIsPaused(true);
  }, [clearPauseTimeout]);

  const resumeAfterHover = useCallback(() => {
    clearPauseTimeout();
    setIsPaused(false);
  }, [clearPauseTimeout]);

  const scrollByStep = useCallback(
    (direction) => {
      pauseTemporarily();
      viewportRef.current?.scrollBy({
        left: direction * (stepSize || 320),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [pauseTemporarily, reducedMotion, stepSize],
  );

  const carouselReady = imagesReady && fontsReady && groupWidth > 0;
  const duration = groupWidth > 0 ? Math.max(groupWidth / conveyorSpeed, 12) : 36;

  return (
    <div
      className={`hero-reveal hero-reveal--shelf hero-product-shelf ${
        carouselReady ? "hero-product-shelf--running" : ""
      } ${isPaused ? "hero-product-shelf--paused" : ""} ${
        reducedMotion ? "hero-product-shelf--motion-disabled" : ""
      } ${groupWidth ? "hero-product-shelf--measured" : ""}`}
      style={{
        "--carousel-group-width": `${groupWidth}px`,
        "--carousel-duration": `${duration.toFixed(2)}s`,
      }}
      onMouseEnter={pauseOnHover}
      onMouseLeave={resumeAfterHover}
      onFocus={pauseOnHover}
      onBlur={resumeAfterHover}
    >
      <div ref={viewportRef} className="hero-product-shelf__viewport">
        <div
          ref={trackRef}
          className="hero-product-shelf__track"
        >
          <HeroConveyorGroup
            group="primary"
            groupRef={groupRef}
            items={shelfItems}
            loadingPlan={loadingPlan}
          />
          <HeroConveyorGroup
            group="clone"
            items={shelfItems}
            loadingPlan={loadingPlan}
          />
        </div>
      </div>
      <div className="hero-product-shelf__controls" aria-hidden="false">
        <button
          type="button"
          className="focus-ring hero-product-shelf__control"
          aria-label={copy.hero.shelfPrevious}
          onClick={() => scrollByStep(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="focus-ring hero-product-shelf__control"
          aria-label={copy.hero.shelfNext}
          onClick={() => scrollByStep(1)}
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
        width="1717"
        height="916"
        loading="eager"
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
