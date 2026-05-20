import { ArrowRight, Factory, ShieldCheck, Truck } from "lucide-react";

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-slate-950 pt-28 text-white">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_48%,#38bdf8_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.24),transparent_28%)]" />

      <div className="container-soft grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-normal text-blue-50 backdrop-blur">
            официальный поставщик изоляционных красок
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Seller Group Azerbaijan
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-50/88 sm:text-xl">
            Российские и турецкие фасадные, кровельные, теплоизоляционные и
            антикоррозийные покрытия с прямыми поставками и доставкой по Азербайджану.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalog"
              className="focus-ring group relative inline-flex min-h-14 items-center justify-center overflow-hidden rounded-xl bg-white px-6 text-sm font-extrabold text-blue-800 shadow-[0_18px_50px_rgba(255,255,255,0.18)] transition duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-100/70 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Смотреть каталог <ArrowRight size={18} />
              </span>
            </a>
            <a
              href="#origins"
              className="focus-ring inline-flex min-h-14 items-center justify-center rounded-xl border border-white/28 bg-white/10 px-6 text-sm font-extrabold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/16"
            >
              Откуда привозим
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.32)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-950">
              <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-700 via-sky-500 to-slate-100 p-6 text-white">
                <Factory size={42} />
                <p className="mt-10 text-sm font-bold uppercase tracking-normal text-white/78">
                  прямые поставки с заводов
                </p>
                <p className="mt-2 text-3xl font-black">6 брендов</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["Россия", "🇷🇺"],
                  ["Турция", "🇹🇷"],
                  ["Азербайджан", "🚚"],
                ].map(([label, icon]) => (
                  <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <span className="text-2xl">{icon}</span>
                    <p className="mt-2 text-sm font-extrabold text-slate-700">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-orange-500 px-5 py-4 text-sm font-black text-white shadow-[0_18px_50px_rgba(249,115,22,0.35)] sm:block">
            <ShieldCheck className="mb-2" size={21} />
            Единственный поставщик РФ красок в АЗ
          </div>
          <div className="absolute -right-3 -top-4 hidden rounded-2xl bg-white px-5 py-4 text-sm font-black text-blue-700 shadow-[0_18px_50px_rgba(255,255,255,0.2)] sm:block">
            <Truck className="mb-2" size={21} />
            Доставка по всей стране
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
