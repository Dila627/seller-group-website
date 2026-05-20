import { Phone, Send } from "lucide-react";
import { phoneDisplay, phoneHref, telegramUrl } from "../data/sellerContent.js";

function Footer() {
  return (
    <footer id="contacts" className="border-t border-blue-100 bg-white py-8">
      <div className="container-soft flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-extrabold text-slate-950">Seller Group Azerbaijan</p>
          <p className="mt-1 text-sm text-slate-500">© 2026. Изоляционные краски и покрытия.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-950"
          >
            <Send size={16} /> Telegram
          </a>
          <a
            href={phoneHref}
            className="focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-100 px-4 text-sm font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700"
          >
            <Phone size={16} /> {phoneDisplay}
          </a>
          <a href="#top" className="text-sm font-extrabold text-slate-600 transition hover:text-blue-700">
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
