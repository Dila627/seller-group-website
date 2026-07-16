import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import CatalogProductCard from "../components/CatalogProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  catalogOptions,
  getBrandById,
  getCatalogOptionLabel,
  getLocalizedProduct,
  products,
} from "../data/catalog.js";
import Footer from "../sections/Footer.jsx";

const emptyFilters = {
  query: "",
  brand: "all",
  category: "all",
  purpose: "all",
  type: "all",
  sort: "default",
};

const baseFilterFields = [
  { key: "brand", group: "brands", minOptions: 1 },
  { key: "category", group: "categories", minOptions: 1 },
  { key: "purpose", group: "purposes", minOptions: 1 },
  { key: "type", group: "productTypes", minOptions: 1 },
];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function normalizeText(value) {
  return String(value ?? "").toLowerCase().trim();
}

function hasActiveFilters(filters) {
  return Boolean(
    filters.query.trim() ||
      filters.brand !== "all" ||
      filters.category !== "all" ||
      filters.purpose !== "all" ||
      filters.type !== "all",
  );
}

function getFilterLabel(field, value, language) {
  if (value === "all") {
    return "";
  }

  if (field === "brand") {
    return getBrandById(value)?.name ?? value;
  }

  const groupByField = {
    category: "categories",
    purpose: "purposes",
    type: "productTypes",
  };

  return getCatalogOptionLabel(groupByField[field], value, language);
}

function buildSelectedChips(filters, activeFilterFields, language) {
  const chips = activeFilterFields
    .filter(({ key }) => filters[key] !== "all")
    .map(({ key }) => ({
      key,
      label: getFilterLabel(key, filters[key], language),
    }));

  if (filters.query.trim()) {
    chips.unshift({
      key: "query",
      label: filters.query.trim(),
    });
  }

  return chips;
}

function sortProducts(items, sort, language) {
  return [...items].sort((a, b) => {
    if (sort === "name") {
      return getLocalizedProduct(a, language).title.localeCompare(
        getLocalizedProduct(b, language).title,
        language,
      );
    }

    if (sort === "new") {
      return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    }

    if (sort === "brand") {
      return (getBrandById(a.brandId)?.name ?? "").localeCompare(
        getBrandById(b.brandId)?.name ?? "",
        language,
      );
    }

    return products.indexOf(a) - products.indexOf(b);
  });
}

function formatResultsCount(count, copy) {
  if (copy.resultsPrefix) {
    return `${copy.resultsPrefix}: ${count}`;
  }

  return `${count} ${copy.resultsSuffix}`;
}

function FilterSelect({ id, label, value, onChange, options, allLabel }) {
  return (
    <div className="filter-group">
      <label htmlFor={id} className="filter-label">
        {label}
      </label>
      <span className="filter-select-wrap">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="filter-select focus-ring"
        >
          <option value="all">{allLabel}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

function FilterPanel({
  copy,
  filters,
  filterFields,
  onChange,
  onReset,
  onApply,
  idPrefix,
  hasActive,
  showHeader = true,
  showMobileActions = false,
}) {
  return (
    <div className="catalog-filters">
      {showHeader ? (
        <div className="filters-header">
          <h2>{copy.filtersTitle}</h2>
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActive}
            className="filters-reset focus-ring"
          >
            {copy.reset}
          </button>
        </div>
      ) : null}

      <div className="catalog-filters__body">
        <div className="filter-group filter-group--search">
          <label htmlFor={`${idPrefix}-query`} className="filter-label">
            {copy.searchLabel}
          </label>
          <span className="filter-search">
            <Search
              size={17}
              className="filter-search__icon pointer-events-none text-slate-400"
              aria-hidden="true"
            />
            <input
              id={`${idPrefix}-query`}
              value={filters.query}
              onChange={(event) => onChange("query", event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="filter-control focus-ring"
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => onChange("query", "")}
                aria-label={copy.clearSearch}
                className="filter-search__clear focus-ring"
              >
                <X size={15} />
              </button>
            ) : null}
          </span>
        </div>

        {filterFields.map(({ key, options }) => (
          <FilterSelect
            key={key}
            id={`${idPrefix}-${key}`}
            label={copy.labels[key]}
            value={filters[key]}
            allLabel={copy.all}
            options={options}
            onChange={(value) => onChange(key, value)}
          />
        ))}
      </div>

      {showMobileActions ? (
        <div className="mobile-filter-actions">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActive}
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-graphite transition hover:border-slate-300 disabled:pointer-events-none disabled:opacity-45"
          >
            {copy.reset}
          </button>
          <button
            type="button"
            onClick={onApply}
            className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
          >
            {copy.showProducts}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CatalogPage({ copy, language }) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(emptyFilters);
  const drawerRef = useRef(null);
  const hasActive = hasActiveFilters(filters);

  const filterFields = useMemo(() => {
    const idsByGroup = {
      brands: [...new Set(products.map((product) => product.brandId).filter(Boolean))],
      categories: [...new Set(products.map((product) => product.category).filter(Boolean))],
      purposes: [...new Set(products.flatMap((product) => product.purposeKeys ?? []))],
      productTypes: [...new Set(products.map((product) => product.type).filter(Boolean))],
    };

    const localizedOptions = {
      brands: idsByGroup.brands
        .map((id) => getBrandById(id))
        .filter(Boolean)
        .map((brand) => ({ id: brand.id, label: brand.name })),
      categories: catalogOptions.categories
        .filter((item) => idsByGroup.categories.includes(item.id))
        .map((item) => ({ id: item.id, label: item[`label_${language}`] })),
      purposes: catalogOptions.purposes
        .filter((item) => idsByGroup.purposes.includes(item.id))
        .map((item) => ({ id: item.id, label: item[`label_${language}`] })),
      productTypes: catalogOptions.productTypes
        .filter((item) => idsByGroup.productTypes.includes(item.id))
        .map((item) => ({ id: item.id, label: item[`label_${language}`] })),
    };

    return baseFilterFields
      .map((field) => ({ ...field, options: localizedOptions[field.group] ?? [] }))
      .filter((field) => field.options.length >= field.minOptions);
  }, [language]);

  const chips = buildSelectedChips(filters, filterFields, language);

  useEffect(() => {
    if (!filtersOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    const focusFirstControl = () => {
      const firstControl = drawerRef.current?.querySelector(focusableSelector);
      firstControl?.focus();
    };

    const animationFrame = window.requestAnimationFrame(focusFirstControl);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current?.querySelectorAll(focusableSelector) ?? [],
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [filtersOpen]);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters(emptyFilters);
  }

  function removeChip(key) {
    setFilters((current) => ({
      ...current,
      [key]: key === "query" ? "" : "all",
    }));
  }

  const filteredProducts = useMemo(() => {
    const query = normalizeText(filters.query);

    const filtered = products.filter((product) => {
      const brand = getBrandById(product.brandId);
      const categoryRu = getCatalogOptionLabel("categories", product.category, "ru");
      const categoryAz = getCatalogOptionLabel("categories", product.category, "az");
      const typeRu = getCatalogOptionLabel("productTypes", product.type, "ru");
      const typeAz = getCatalogOptionLabel("productTypes", product.type, "az");
      const purposeLabels = (product.purposeKeys ?? []).flatMap((purpose) => [
        getCatalogOptionLabel("purposes", purpose, "ru"),
        getCatalogOptionLabel("purposes", purpose, "az"),
      ]);
      const searchable = normalizeText(
        [
          product.name_ru,
          product.name_az,
          brand?.name,
          categoryRu,
          categoryAz,
          typeRu,
          typeAz,
          product.shortDescription_ru,
          product.shortDescription_az,
          product.description_ru,
          product.description_az,
          product.purpose_ru,
          product.purpose_az,
          ...purposeLabels,
        ].join(" "),
      );

      if (query && !searchable.includes(query)) {
        return false;
      }

      if (filters.brand !== "all" && product.brandId !== filters.brand) {
        return false;
      }

      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      if (filters.purpose !== "all" && !product.purposeKeys?.includes(filters.purpose)) {
        return false;
      }

      if (filters.type !== "all" && product.type !== filters.type) {
        return false;
      }

      return true;
    });

    return sortProducts(filtered, filters.sort, language);
  }, [filters, language]);

  return (
    <>
      <section className="catalog-page bg-slate-100">
        <div className="container-shell py-12 sm:py-14">
          <Reveal>
            <p className="section-eyebrow text-copper-dark">{copy.products.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-graphite sm:text-5xl lg:text-6xl">
              {copy.catalog.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {copy.catalog.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="catalog-content-section bg-white">
        <div className="container-shell">
          <div className="mb-5 flex flex-col gap-3 sm:hidden">
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen(true)}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
            >
              <SlidersHorizontal size={17} />
              {copy.catalog.filtersButton}
              {chips.length > 0 ? (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-copper px-1 text-[0.68rem] text-graphite">
                  {chips.length}
                </span>
              ) : null}
            </button>
          </div>

          <div className="catalog-layout">
            <aside className="catalog-filters-wrapper hidden sm:block">
              <FilterPanel
                copy={copy.catalog}
                filters={filters}
                filterFields={filterFields}
                idPrefix="catalog-filter"
                hasActive={hasActive}
                onChange={updateFilter}
                onReset={resetFilters}
              />
            </aside>

            <div className="catalog-results min-w-0">
              <div className="catalog-toolbar">
                <p className="text-sm font-black text-slate-600">
                  {formatResultsCount(filteredProducts.length, copy.catalog)}
                </p>
                <label className="sort-control">
                  <span>{copy.catalog.labels.sort}</span>
                  <span className="filter-select-wrap">
                    <select
                      value={filters.sort}
                      onChange={(event) => updateFilter("sort", event.target.value)}
                      className="filter-select focus-ring"
                    >
                      {catalogOptions.sort.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option[`label_${language}`]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                  </span>
                </label>
              </div>

              {chips.length > 0 ? (
                <div className="active-filter-chips" aria-label={copy.catalog.selectedFilters}>
                  {chips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={() => removeChip(chip.key)}
                      aria-label={`${copy.catalog.removeFilter}: ${chip.label}`}
                      className="filter-chip focus-ring"
                    >
                      {chip.label}
                      <X size={13} />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="filter-chip filter-chip--reset focus-ring"
                  >
                    {copy.catalog.resetAll}
                  </button>
                </div>
              ) : null}

              {filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => {
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
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-soft">
                  <p className="mx-auto max-w-2xl text-base font-bold leading-7 text-slate-600">
                    {copy.catalog.noResults}
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
                  >
                    {copy.catalog.reset}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {filtersOpen ? (
        <div className="mobile-filter-drawer">
          <button
            type="button"
            className="mobile-filter-drawer__overlay"
            aria-label={copy.catalog.closeFilters}
            onClick={() => setFiltersOpen(false)}
          />
          <div
            ref={drawerRef}
            className="mobile-filter-drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-catalog-filters-title"
          >
            <div className="mobile-filter-drawer__top">
              <h2 id="mobile-catalog-filters-title">{copy.catalog.filtersTitle}</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label={copy.catalog.closeFilters}
                className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-graphite"
              >
                <X size={18} />
              </button>
            </div>
            <FilterPanel
              copy={copy.catalog}
              filters={filters}
              filterFields={filterFields}
              idPrefix="catalog-mobile-filter"
              hasActive={hasActive}
              showHeader={false}
              showMobileActions
              onChange={updateFilter}
              onReset={resetFilters}
              onApply={() => setFiltersOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <Footer copy={copy} />
    </>
  );
}

export default CatalogPage;
