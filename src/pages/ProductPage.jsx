import {
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  Phone,
  Send,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { contacts, getLocalizedProduct } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import Footer from "../sections/Footer.jsx";

function ProductPage({ product, brand, copy, language }) {
  const localized = getLocalizedProduct(product, language);
  const gallery = product.gallery ?? [];
  const consultationMessage = `${copy.productPage.consultationMessagePrefix} ${localized.title}.`;
  const whatsappHref = `${contacts.whatsappHref}?text=${encodeURIComponent(consultationMessage)}`;

  return (
    <>
      <section className="bg-white pt-28">
        <div className="container-shell grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <Reveal className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
            <ProductVisual product={product} title={localized.title} priority />
          </Reveal>

          <Reveal>
            <AppLink
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-copper-dark transition hover:text-navy"
            >
              <ArrowLeft size={16} />
              {copy.common.productCatalog}
            </AppLink>
            <p className="mt-8 section-eyebrow text-copper-dark">{copy.productPage.product}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-graphite sm:text-5xl lg:text-6xl">
              {localized.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {localized.shortDescription}
            </p>
            {localized.contactText && localized.contactText !== localized.description ? (
              <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-slate-500">
                {localized.contactText}
              </p>
            ) : null}

            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <ProductFact label={copy.productPage.brand} value={brand.name} />
              <ProductFact label={copy.productPage.category} value={localized.category} />
              <ProductFact label={copy.productPage.type} value={localized.type} />
              <ProductFact label={copy.productPage.purpose} value={localized.purpose} />
              {localized.volumeOptions.length > 0 ? (
                <ProductFact
                  label={copy.productPage.volume}
                  value={localized.volumeOptions.join(", ")}
                />
              ) : null}
              {localized.surfaceTypes.length > 0 ? (
                <ProductFact
                  label={copy.productPage.surfaceTypes}
                  value={localized.surfaceTypes.join(", ")}
                />
              ) : null}
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
              >
                <FaWhatsapp size={17} className="text-[#25D366]" />
                {copy.productPage.consultationCta}
              </a>
              <a
                href={contacts.telegramHref}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-graphite transition hover:border-navy hover:bg-navy hover:text-white"
              >
                <Send size={16} />
                {copy.contact.actions.telegram}
              </a>
              <a
                href={contacts.phoneHref}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-extrabold text-graphite transition hover:border-navy hover:bg-navy hover:text-white"
              >
                <Phone size={16} />
                {copy.contact.actions.call}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {localized.advantages.length > 0 ? (
        <section className="section-padding bg-slate-100">
          <div className="container-shell">
            <Reveal>
              <p className="section-eyebrow text-copper-dark">{copy.productPage.advantages}</p>
              <h2 className="mt-4 section-title text-graphite">{localized.title}</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {localized.advantages.map((item) => (
                <Reveal key={item} className="business-card p-6">
                  <CheckCircle2 size={24} className="text-copper-dark" />
                  <p className="mt-5 text-sm font-extrabold leading-7 text-graphite">{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          <InfoBlock
            title={copy.productPage.description}
            icon={CheckCircle2}
            items={[localized.description]}
          />
          {localized.application ? (
            <InfoBlock
              title={copy.productPage.applications}
              icon={CheckCircle2}
              items={[localized.application]}
            />
          ) : null}
          {localized.volumeOptions.length > 0 ? (
            <InfoBlock
              title={copy.productPage.packaging}
              icon={PackageCheck}
              items={localized.volumeOptions}
            />
          ) : null}
          {localized.characteristics.length > 0 ? (
            <InfoBlock
              title={copy.productPage.characteristics}
              icon={CheckCircle2}
              items={localized.characteristics}
              wide
            />
          ) : null}
        </div>
      </section>

      {gallery.length > 1 ? (
        <section className="section-padding bg-slate-100">
          <div className="container-shell">
            <Reveal>
              <p className="section-eyebrow text-copper-dark">{copy.productPage.gallery}</p>
              <h2 className="mt-4 section-title text-graphite">{localized.title}</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {gallery.map((image) => (
                <Reveal
                  key={image}
                  className="flex min-h-52 items-center justify-center rounded-3xl bg-white p-5 shadow-soft"
                >
                  <img
                    src={assetPath(image)}
                    alt={localized.title}
                    loading="lazy"
                    className="max-h-48 w-full object-contain"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer copy={copy} />
    </>
  );
}

function ProductFact({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <dt className="text-[0.68rem] font-black uppercase text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm font-black leading-6 text-graphite">{value}</dd>
    </div>
  );
}

function ProductVisual({ product, title, priority = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const image = product.mainImage;

  if (!image || imageFailed) {
    return (
      <div className="grid min-h-[320px] place-items-center rounded-2xl bg-white text-copper-dark">
        <PackageCheck size={72} />
      </div>
    );
  }

  return (
    <img
      src={assetPath(image)}
      alt={title}
      onError={() => setImageFailed(true)}
      className="mx-auto aspect-[4/3] max-h-[520px] w-full object-contain object-center"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

function InfoBlock({ icon: Icon, title, items, wide = false }) {
  return (
    <Reveal className={`business-card p-6 ${wide ? "lg:col-span-3" : ""}`}>
      <Icon size={24} className="text-copper-dark" />
      <h3 className="mt-5 text-xl font-black text-graphite">{title}</h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
            <CheckCircle2 size={17} className="mt-1 shrink-0 text-copper-dark" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default ProductPage;
