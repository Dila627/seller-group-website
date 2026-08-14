import { ArrowRight, PackageCheck } from "lucide-react";
import { getLocalizedBrand, getLocalizedProduct } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import OptimizedImage from "./OptimizedImage.jsx";

function ProductCard({ product, brand, language, label }) {
  const localized = getLocalizedProduct(product, language);
  const localizedBrand = brand ? getLocalizedBrand(brand, language) : { name: product.brand };

  return (
    <article className="group grid w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-premium md:grid-cols-[0.42fr_0.58fr]">
      <div className="product-image-surface product-card-media flex min-w-0 items-center justify-center bg-slate-50 p-6 max-sm:min-h-52 sm:min-h-64">
        {product.mainImage ? (
          <OptimizedImage
            src={assetPath(product.mainImage)}
            alt={localized.title}
            width="640"
            height="480"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            className="product-card-image max-h-64 w-full object-contain"
          />
        ) : (
          <div className="grid h-32 w-32 place-items-center rounded-3xl border border-slate-200 bg-white text-copper-dark shadow-sm">
            <PackageCheck size={42} />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-copper/10 px-3 py-1 text-[0.68rem] font-black uppercase text-copper-dark">
            {localizedBrand.name}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.68rem] font-black uppercase text-slate-600">
            {localized.category}
          </span>
        </div>
        <h3 className="mt-3 break-words text-2xl font-black leading-tight text-graphite">
          {localized.title}
        </h3>
        <p className="mt-5 break-words text-sm leading-7 text-slate-600">
          {localized.shortDescription}
        </p>
        <AppLink
          href={`/catalog/${product.slug}`}
          className="focus-ring mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
        >
          {label}
          <ArrowRight size={16} />
        </AppLink>
      </div>
    </article>
  );
}

export default ProductCard;
