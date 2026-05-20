import { ChevronDown, ExternalLink, Filter, PaintBucket, X } from "lucide-react";
import { useMemo, useState } from "react";
import { brands, purposeOptions } from "../data/sellerContent.js";
import PriceRequestModal from "./PriceRequestModal.jsx";

const brandFilters = ["Все", ...brands.map((brand) => brand.name)];

function ColorCard({ color }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="h-8 w-8 shrink-0 rounded-full border border-slate-200 shadow-inner"
          style={{ backgroundColor: color.hex }}
          aria-hidden="true"
        />
        <span className="truncate text-sm font-bold text-slate-700">{color.name}</span>
      </div>
      <span className="shrink-0 text-sm font-black text-blue-700">{color.price}</span>
    </div>
  );
}

function BrandCard({ brand, forceColorsOpen, onRequestPrice }) {
  const [colorsOpen, setColorsOpen] = useState(forceColorsOpen);
  const isOpen = forceColorsOpen || colorsOpen;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(37,99,235,0.22)]">
      <div className="relative h-32 overflow-hidden" style={{ backgroundColor: brand.packageColor }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/18 via-transparent to-slate-950/20" />
        <div className="absolute bottom-4 left-5 text-5xl font-black text-white/22">{brand.name}</div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            {brand.country}
          </span>
          <span
            className="h-12 w-12 rounded-2xl shadow-inner"
            style={{ backgroundColor: brand.packageColor }}
            aria-label="Цвет упаковки бренда"
          />
        </div>

        <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-950">{brand.name}</h3>
        <p className="mt-2 text-sm font-extrabold uppercase tracking-normal text-slate-500">{brand.type}</p>
        <p className="mt-4 line-clamp-1 text-sm font-bold text-slate-700">{brand.shortAdvantage}</p>

        <div className="mt-auto grid gap-3 pt-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={brand.page}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-black text-blue-700 transition hover:bg-blue-700 hover:text-white"
            >
              Подробнее <ExternalLink size={16} />
            </a>
            <button
              type="button"
              onClick={() => onRequestPrice(brand)}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-4 text-sm font-black text-white transition hover:bg-slate-950"
            >
              Запросить прайс
            </button>
          </div>
          <button
            type="button"
            onClick={() => setColorsOpen((value) => !value)}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <PaintBucket size={17} /> Выбрать цвет и цену
          </button>
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="mt-5 grid gap-3">
              {brand.colors.map((color) => (
                <ColorCard key={`${brand.name}-${color.name}`} color={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Catalog() {
  const [activeBrand, setActiveBrand] = useState("Все");
  const [activePurpose, setActivePurpose] = useState("Все назначения");
  const [modalBrand, setModalBrand] = useState(null);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchesBrand = activeBrand === "Все" || brand.name === activeBrand;
      const matchesPurpose =
        activePurpose === "Все назначения" || brand.purposeTags.includes(activePurpose);

      return matchesBrand && matchesPurpose;
    });
  }, [activeBrand, activePurpose]);

  const selectedBrand = brands.find((brand) => brand.name === activeBrand);

  return (
    <section id="catalog" className="section-padding bg-white">
      <div className="container-soft">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-blue-700">каталог</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              6 брендов красок и покрытий
            </h2>
          </div>
          <p className="body-lead max-w-3xl text-slate-600 lg:ml-auto">
            Фильтруйте каталог по бренду и назначению. При выборе конкретного бренда
            карточка сразу показывает доступные цвета с ценами.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-blue-100 bg-slate-50 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-slate-500">
            <Filter size={16} /> Фильтр по бренду
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {brandFilters.map((brandName) => {
              const active = activeBrand === brandName;

              return (
                <button
                  key={brandName}
                  type="button"
                  onClick={() => setActiveBrand(brandName)}
                  className={`focus-ring rounded-full px-4 py-2 text-sm font-black transition ${
                    active
                      ? "bg-blue-700 text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)]"
                      : "bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {brandName}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:max-w-sm">
            <label className="text-sm font-black uppercase tracking-normal text-slate-500">
              Фильтр по назначению
            </label>
            <div className="relative">
              <select
                value={activePurpose}
                onChange={(event) => setActivePurpose(event.target.value)}
                className="focus-ring min-h-12 w-full appearance-none rounded-xl border border-blue-100 bg-white px-4 pr-10 text-sm font-bold text-slate-700"
              >
                {purposeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-700"
              />
            </div>
          </div>

          {activeBrand !== "Все" && selectedBrand ? (
            <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-black text-slate-700">
                  Показаны цвета бренда <span className="text-blue-700">{selectedBrand.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setActiveBrand("Все")}
                  className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-blue-700"
                >
                  <X size={15} /> Сбросить бренд
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selectedBrand.colors.map((color) => (
                  <ColorCard key={`selected-${color.name}`} color={color} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBrands.map((brand) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              forceColorsOpen={activeBrand !== "Все"}
              onRequestPrice={setModalBrand}
            />
          ))}
        </div>

        {filteredBrands.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-blue-100 bg-slate-50 p-8 text-center">
            <p className="text-lg font-black text-slate-950">По выбранным фильтрам нет товаров</p>
            <button
              type="button"
              onClick={() => {
                setActiveBrand("Все");
                setActivePurpose("Все назначения");
              }}
              className="focus-ring mt-4 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : null}
      </div>

      <PriceRequestModal brand={modalBrand} onClose={() => setModalBrand(null)} />
    </section>
  );
}

export default Catalog;
