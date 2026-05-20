import { X } from "lucide-react";
import { useState } from "react";

function PriceRequestModal({ brand, onClose }) {
  const [sent, setSent] = useState(false);

  if (!brand) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.35)] sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-normal text-blue-700">запрос прайса</p>
            <h3 className="mt-2 text-3xl font-black text-slate-950">{brand.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            aria-label="Закрыть окно"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="mt-7 grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Имя
            <input
              className="focus-ring min-h-12 rounded-xl border border-slate-200 px-4 text-slate-950"
              name="name"
              placeholder="Ваше имя"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Телефон
            <input
              className="focus-ring min-h-12 rounded-xl border border-slate-200 px-4 text-slate-950"
              name="phone"
              placeholder="+994 ..."
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Бренд
            <input
              className="min-h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-500"
              name="brand"
              value={brand.name}
              readOnly
            />
          </label>
          <button
            type="submit"
            className="focus-ring min-h-12 rounded-xl bg-blue-700 px-5 text-sm font-black text-white transition hover:bg-slate-950"
          >
            Отправить запрос
          </button>
          {sent ? (
            <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
              Заявка подготовлена. Для реального сайта подключите отправку в Telegram, CRM или email.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default PriceRequestModal;
