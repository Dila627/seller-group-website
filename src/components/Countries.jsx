import { countries } from "../data/sellerContent.js";

function Countries() {
  return (
    <section id="origins" className="section-padding bg-slate-50">
      <div className="container-soft">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-blue-700">откуда привозим</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Только проверенные производители
            </h2>
          </div>
          <p className="body-lead max-w-3xl text-slate-600 lg:ml-auto">
            В каталоге Seller Group Azerbaijan остаются две ключевые страны:
            Турция и Россия. Поставки идут напрямую, без лишних посредников.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {countries.map((country) => (
            <article
              key={country.name}
              className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-8 shadow-soft"
            >
              <div
                className="absolute right-0 top-0 h-32 w-32 rounded-bl-[4rem] opacity-20"
                style={{ backgroundColor: country.accent }}
              />
              {country.badge ? (
                <div className="relative mb-6 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 text-sm font-black text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)]">
                  {country.badge}
                </div>
              ) : null}
              <div className="relative flex items-center gap-4">
                <span className="text-5xl">{country.flag}</span>
                <h3 className="text-3xl font-black uppercase text-slate-950">{country.name}</h3>
              </div>
              <p className="relative mt-6 max-w-2xl text-lg leading-8 text-slate-600">{country.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Countries;
