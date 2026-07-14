import { ArrowUpRight } from "lucide-react";
import { getLocalizedBrand } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

function BrandCard({ brand, language, label }) {
  const localized = getLocalizedBrand(brand, language);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-premium">
      <div className="flex min-h-28 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <img
          src={assetPath(brand.logo)}
          alt={`${brand.name} logo`}
          loading="lazy"
          className="h-auto max-h-28 w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-black uppercase text-copper-dark">
          {localized.country}
        </p>
        <h3 className="mt-2 text-xl font-black text-graphite">{brand.name}</h3>
        <p className="mt-2 text-sm font-bold text-slate-500">{localized.category}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {localized.description}
        </p>
        <AppLink
          href={`/brands/${brand.id}`}
          className="focus-ring mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-extrabold text-graphite transition hover:border-navy hover:bg-navy hover:text-white"
        >
          {label}
          <ArrowUpRight size={16} />
        </AppLink>
      </div>
    </article>
  );
}

export default BrandCard;
