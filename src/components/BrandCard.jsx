import { ArrowUpRight } from "lucide-react";
import { getLocalizedBrand } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

function BrandCard({ brand, language, label }) {
  const localized = getLocalizedBrand(brand, language);

  return (
    <article className="brand-premium-card group">
      <div className="brand-premium-card__visual">
        <div className="brand-logo-surface brand-premium-card__logo">
          <img
            src={assetPath(brand.logo)}
            alt={`${localized.name} logo`}
            width="180"
            height="88"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="brand-premium-card__body">
        <p className="brand-premium-card__country">{localized.country}</p>
        <h3>{localized.name}</h3>
        <p className="brand-premium-card__category">{localized.category}</p>
        <p className="brand-premium-card__description">
          {localized.description}
        </p>
        <AppLink
          href={`/brands/${brand.id}`}
          className="focus-ring brand-premium-card__link"
        >
          {label}
          <ArrowUpRight size={16} />
        </AppLink>
      </div>
    </article>
  );
}

export default BrandCard;
