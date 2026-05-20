import { ArrowLeft, Phone, Send, X } from "lucide-react";
import { useState } from "react";
import { phoneDisplay, phoneHref, telegramUrl } from "../data/sellerContent.js";
import ProductImage from "./ProductImage.jsx";

function BrandPage({ brand }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const heroImage = `images/brands/${brand.slug}/photo1.jpg`;

  return (
    <main>
      <section className="bg-slate-950 pt-28 text-white">
        <div className="container-soft grid gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ProductImage
            src={heroImage}
            alt={`${brand.name} краска`}
            brand={brand}
            className="h-[320px] rounded-[2rem] border border-white/16 shadow-[0_24px_80px_rgba(15,23,42,0.35)] sm:h-[420px]"
            onClick={() => setLightbox({ src: heroImage, alt: `${brand.name} краска` })}
          />
          <div>
            <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-blue-100">
              {brand.country}
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-blue-50/82">{brand.slogan}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-blue-800 transition hover:-translate-y-0.5"
              >
                <Send size={17} /> Написать в Telegram
              </a>
              <a
                href={phoneHref}
                className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/24 bg-white/10 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/16"
              >
                <Phone size={17} /> Позвонить
              </a>
              <a
                href="/#catalog"
                className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/24 px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <ArrowLeft size={17} /> Вернуться в каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-soft grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow text-blue-700">описание</p>
            <h2 className="mt-4 text-4xl font-black text-slate-950">О бренде {brand.name}</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              {brand.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-[2rem] border border-blue-100 bg-slate-50 p-6">
              <h3 className="text-xl font-black text-slate-950">Для чего применяется</h3>
              <p className="mt-3 leading-8 text-slate-600">{brand.purpose}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-100 bg-slate-50 p-6">
            <h3 className="text-2xl font-black text-slate-950">Технические характеристики</h3>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {[
                ["Расход", brand.consumption],
                ["Температура", brand.temperature],
                ["Поверхности", brand.surfaces],
                ["Срок службы", brand.serviceLife],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[0.8fr_1.2fr] border-b border-slate-100 last:border-b-0">
                  <div className="bg-slate-50 p-4 text-sm font-black text-slate-500">{label}</div>
                  <div className="p-4 text-sm font-bold leading-6 text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-soft">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-blue-700">цвета в наличии</p>
              <h2 className="mt-4 text-4xl font-black text-slate-950">Палитра и цены</h2>
            </div>
            <p className="body-lead text-slate-600">
              Нажмите на цвет, чтобы увидеть карточку с деталями оттенка и стоимостью за литр.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brand.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                className="focus-ring flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-soft transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(37,99,235,0.16)]"
              >
                <span
                  className="h-12 w-12 shrink-0 rounded-full border border-slate-200 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span>
                  <span className="block font-black text-slate-950">{color.name}</span>
                  <span className="mt-1 block text-sm font-black text-blue-700">{color.price}</span>
                </span>
              </button>
            ))}
          </div>

          {selectedColor ? (
            <div className="mt-6 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-premium">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <span
                    className="h-16 w-16 rounded-full border border-slate-200 shadow-inner"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <div>
                    <p className="text-xl font-black text-slate-950">{selectedColor.name}</p>
                    <p className="mt-1 text-lg font-black text-blue-700">{selectedColor.price}</p>
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      Бренд: {brand.name}. Наличие и объём уточняйте у менеджера.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedColor(null)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                  aria-label="Закрыть карточку цвета"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-soft">
          <p className="eyebrow text-blue-700">фото товаров</p>
          <h2 className="mt-4 text-4xl font-black text-slate-950">Галерея {brand.name}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {brand.gallery.map((photo, index) => {
              const src = `images/brands/${brand.slug}/${photo}`;
              const alt = `${brand.name} краска фото ${index + 1}`;

              return (
                <figure key={photo} className="rounded-[2rem] border border-blue-100 bg-slate-50 p-3">
                  <ProductImage
                    src={src}
                    alt={alt}
                    brand={brand}
                    className="h-[300px] w-full rounded-[1.5rem]"
                    onClick={() => setLightbox({ src, alt })}
                  />
                  <figcaption className="px-2 py-4 text-sm font-bold text-slate-600">
                    {brand.name} — фото товара {index + 1}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 text-white">
        <div className="container-soft flex flex-col gap-3 sm:flex-row">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-black transition hover:bg-blue-500"
          >
            <Send size={17} /> Написать в Telegram
          </a>
          <a
            href={phoneHref}
            className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-slate-950 transition hover:bg-blue-50"
          >
            <Phone size={17} /> {phoneDisplay}
          </a>
          <a
            href="/#catalog"
            className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/22 px-5 text-sm font-black transition hover:bg-white/10"
          >
            <ArrowLeft size={17} /> Вернуться в каталог
          </a>
        </div>
      </section>

      {lightbox ? (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/82 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950"
            aria-label="Закрыть фото"
          >
            <X size={20} />
          </button>
          <ProductImage
            src={lightbox.src}
            alt={lightbox.alt}
            brand={brand}
            className="max-h-[82vh] w-full max-w-5xl rounded-[2rem]"
          />
        </div>
      ) : null}
    </main>
  );
}

export default BrandPage;
