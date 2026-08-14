import { ArrowRight, PackageCheck } from "lucide-react";
import { useState } from "react";
import { getLocalizedBrand, getLocalizedProduct } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import OptimizedImage from "./OptimizedImage.jsx";

function CatalogProductCard({ product, brand, language, copy }) {
  const [imageFailed, setImageFailed] = useState(false);
  const localized = getLocalizedProduct(product, language);
  const localizedBrand = brand ? getLocalizedBrand(brand, language) : { name: product.brand };
  const description = localized.shortDescription || copy.fallbackDescription;
  const image = product.mainImage;

  return (
    <article className="catalog-product-card group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-premium">
      <div className="product-image-surface catalog-product-media flex shrink-0 items-center justify-center bg-slate-50">
        {image && !imageFailed ? (
          <OptimizedImage
            src={assetPath(image)}
            alt={localized.title}
            width="640"
            height="480"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="catalog-product-image object-contain object-center transition duration-300"
          />
        ) : (
          <div className="grid h-24 w-24 place-items-center rounded-2xl border border-slate-200 bg-white text-copper-dark shadow-sm">
            <PackageCheck size={36} />
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-copper/10 px-3 py-1 text-[0.68rem] font-black uppercase text-copper-dark">
            {localizedBrand.name}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.68rem] font-black uppercase text-slate-600">
            {localized.category}
          </span>
        </div>

        <h3 className="mt-3 break-words text-lg font-black leading-tight text-graphite">
          {localized.title}
        </h3>
        <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-slate-600">
          {description}
        </p>

        <AppLink
          href={`/catalog/${product.slug}`}
          className="focus-ring mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-navy px-4 text-sm font-extrabold text-white transition hover:bg-graphite"
        >
          {copy.more}
          <ArrowRight size={16} className="catalog-product-arrow transition duration-300" />
        </AppLink>
      </div>
    </article>
  );
}

export default CatalogProductCard;
