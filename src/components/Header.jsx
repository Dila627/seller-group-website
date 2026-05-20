import { Menu, Phone, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, phoneDisplay, phoneHref, telegramUrl } from "../data/sellerContent.js";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-blue-100 bg-white/90 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
          : "border-white/20 bg-white/70 py-5 backdrop-blur-xl"
      }`}
    >
      <div className="container-soft flex items-center justify-between gap-6">
        <a href="/#top" onClick={closeMenu} className="group flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-700 text-xs font-extrabold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5">
            SG
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold text-slate-950 sm:text-base">
              Seller Group
            </span>
            <span className="block text-xs font-medium text-slate-500">Azerbaijan</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Главная навигация">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 text-sm font-semibold text-slate-600 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-blue-700 after:transition-transform after:duration-300 hover:text-blue-700 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setContactOpen((value) => !value)}
            className="focus-ring min-h-11 rounded-xl bg-blue-700 px-5 text-sm font-extrabold text-white shadow-[0_16px_40px_rgba(37,99,235,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-950"
            aria-expanded={contactOpen}
          >
            Связаться
          </button>
          {contactOpen ? (
            <div className="absolute right-0 top-14 w-56 rounded-2xl border border-blue-100 bg-white p-2 shadow-premium">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Send size={17} /> Telegram
              </a>
              <a
                href={phoneHref}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Phone size={17} /> {phoneDisplay}
              </a>
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-blue-100 bg-white text-slate-950 lg:hidden"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`container-soft grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="min-h-0 pt-3" aria-label="Мобильная навигация">
          <div className="rounded-2xl border border-blue-100 bg-white/95 p-2 shadow-premium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block border-b border-slate-100 px-4 py-4 text-sm font-bold text-slate-700 last:border-b-0"
              >
                {item.label}
              </a>
            ))}
            <a
              href={telegramUrl}
              onClick={closeMenu}
              className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-4 text-sm font-extrabold text-white"
            >
              Связаться в Telegram
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
