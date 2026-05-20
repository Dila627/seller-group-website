import { stats } from "../data/sellerContent.js";
import AnimatedCounter from "./AnimatedCounter.jsx";

function Stats() {
  return (
    <section className="bg-white py-12">
      <div className="container-soft grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-3xl border border-blue-100 bg-slate-50 p-6">
            <p className="text-4xl font-black tracking-tight text-blue-700">
              <AnimatedCounter value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-normal text-slate-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
