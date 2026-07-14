import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import {
  assets,
  contacts,
  getBrandById,
  getLocalizedBrand,
  getLocalizedProduct,
  getProductById,
  siteCopy,
} from "./data/catalog.js";
import { assetPath } from "./lib/assets.js";
import { NavigationProvider, normalizePath } from "./lib/navigation.jsx";
import { applySeo, applyStructuredData } from "./lib/seo.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const BrandPage = lazy(() => import("./pages/BrandPage.jsx"));
const CatalogPage = lazy(() => import("./pages/CatalogPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "ru";
  }

  const savedLanguage = window.localStorage.getItem("seller-group-language");

  if (savedLanguage === "ru" || savedLanguage === "az") {
    return savedLanguage;
  }

  return window.navigator.language?.toLowerCase().startsWith("az") ? "az" : "ru";
}

function getRoute(path) {
  if (path === "/") {
    return { type: "home" };
  }

  if (path === "/catalog") {
    return { type: "catalog" };
  }

  const [, section, id] = path.split("/");

  if (section === "catalog" && id) {
    const product = getProductById(id);
    const brand = product ? getBrandById(product.brandId) : null;
    return product && brand ? { type: "product", product, brand } : { type: "notFound" };
  }

  if (section === "brands") {
    const brand = getBrandById(id);
    return brand ? { type: "brand", brand } : { type: "notFound" };
  }

  if (section === "products") {
    const product = getProductById(id);
    const brand = product ? getBrandById(product.brandId) : null;
    return product && brand ? { type: "product", product, brand } : { type: "notFound" };
  }

  return { type: "notFound" };
}

function getHeroImage(language) {
  return typeof assets.hero === "string" ? assets.hero : assets.hero[language] ?? assets.hero.ru;
}

function getRouteSeo(route, copy, language) {
  const baseImage = new URL(assetPath(assets.og), window.location.origin).href;
  const url = window.location.href;

  if (route.type === "brand") {
    const brand = getLocalizedBrand(route.brand, language);

    return {
      title: `${route.brand.name} | Seller Group Azerbaijan`,
      description: brand.description,
      image: route.brand.logo
        ? new URL(assetPath(route.brand.logo), window.location.origin).href
        : baseImage,
      url,
      locale: language,
    };
  }

  if (route.type === "product") {
    const product = getLocalizedProduct(route.product, language);
    const image = route.product.mainImage ?? getHeroImage(language);

    return {
      title: `${product.title} | ${route.brand.name} | Seller Group Azerbaijan`,
      description: product.shortDescription,
      image: new URL(assetPath(image), window.location.origin).href,
      url,
      locale: language,
    };
  }

  if (route.type === "catalog") {
    return {
      title: copy.catalog.seoTitle,
      description: copy.catalog.seoDescription,
      image: baseImage,
      url,
      locale: language,
    };
  }

  if (route.type === "notFound") {
    return {
      title: `${copy.notFound.title} | Seller Group Azerbaijan`,
      description: copy.notFound.text,
      image: baseImage,
      url,
      locale: language,
    };
  }

  return {
    title: copy.seo.title,
    description: copy.seo.description,
    ogTitle: copy.seo.ogTitle,
    ogDescription: copy.seo.ogDescription,
    twitterTitle: copy.seo.ogTitle,
    twitterDescription: copy.seo.ogDescription,
    image: baseImage,
    url,
    locale: language,
  };
}

function getStructuredData(route, language) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Seller Group Azerbaijan",
    email: contacts.email,
    telephone: contacts.phoneDisplay,
    address: contacts.address,
  };

  if (route.type === "product") {
    const product = getLocalizedProduct(route.product, language);
    const image = route.product.mainImage ?? getHeroImage(language);

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description: product.shortDescription,
      brand: {
        "@type": "Brand",
        name: route.brand.name,
      },
      image: new URL(assetPath(image), window.location.origin).href,
    };
  }

  if (route.type === "brand") {
    const brand = getLocalizedBrand(route.brand, language);

    const brandData = {
      "@context": "https://schema.org",
      "@type": "Brand",
      name: route.brand.name,
      description: brand.description,
    };

    if (route.brand.logo) {
      brandData.logo = new URL(assetPath(route.brand.logo), window.location.origin).href;
    }

    return brandData;
  }

  return organization;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container-shell py-16">
        <div className="h-3 w-40 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-loading-bar rounded-full bg-copper" />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const copy = siteCopy[language];
  const route = useMemo(() => getRoute(path), [path]);

  function navigate(target) {
    const nextUrl = new URL(target, window.location.origin);
    const nextPath = normalizePath(nextUrl.pathname);
    const hash = nextUrl.hash;

    window.history.pushState({}, "", `${nextPath}${hash}`);
    setPath(nextPath);

    requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0 });
      }
    });
  }

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));

    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("seller-group-language", language);
    applySeo(getRouteSeo(route, copy, language));
    applyStructuredData(getStructuredData(route, language));
  }, [copy, language, route]);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ block: "start" });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [path]);

  return (
    <NavigationProvider path={path} navigate={navigate}>
      <div className="min-h-screen bg-white text-graphite antialiased">
        <Header copy={copy} language={language} onLanguageChange={setLanguage} />
        <main>
          <Suspense fallback={<LoadingScreen />}>
            {route.type === "home" ? <HomePage copy={copy} language={language} /> : null}
            {route.type === "brand" ? (
              <BrandPage brand={route.brand} copy={copy} language={language} />
            ) : null}
            {route.type === "catalog" ? (
              <CatalogPage copy={copy} language={language} />
            ) : null}
            {route.type === "product" ? (
              <ProductPage
                product={route.product}
                brand={route.brand}
                copy={copy}
                language={language}
              />
            ) : null}
            {route.type === "notFound" ? <NotFoundPage copy={copy} /> : null}
          </Suspense>
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;
