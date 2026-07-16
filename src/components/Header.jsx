import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { assets } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";

function Header({ copy, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/[0.96] py-3 shadow-[0_14px_40px_rgba(15,23,42,0.10)] backdrop-blur"
          : "border-white/20 bg-white/90 py-4 backdrop-blur"
      }`}
    >
      <div className="container-shell flex items-center justify-between gap-4">
        <AppLink href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img
              src={assetPath(assets.logo)}
              alt="Seller Group Azerbaijan logo"
              width="48"
              height="48"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0 max-w-[190px] sm:max-w-none">
            <span className="block text-sm font-black leading-[1.08] text-graphite sm:text-base sm:leading-tight">
              Seller Group Azerbaijan
            </span>
            <span className="block max-h-[24px] overflow-hidden text-[9px] font-semibold leading-[11px] text-slate-500 sm:max-h-none sm:text-xs sm:leading-4">
              {copy.header.subtitle}
            </span>
          </span>
        </AppLink>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
          {copy.navigation.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-600 transition hover:text-navy"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch
            language={language}
            label={copy.header.language}
            onChange={onLanguageChange}
          />
          <AppLink
            href="/#contacts"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-extrabold text-white transition hover:bg-graphite"
          >
            <Phone size={17} />
            {copy.header.contact}
          </AppLink>
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? copy.header.menuClose : copy.header.menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-graphite lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div
        className={`container-shell overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-3 pt-3">
          <nav className="rounded-2xl border border-slate-200 bg-white p-2 shadow-premium">
            {copy.navigation.map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block border-b border-slate-100 px-4 py-4 text-sm font-bold text-slate-700 last:border-b-0"
              >
                {item.label}
              </AppLink>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-2">
              <LanguageSwitch
                language={language}
                label={copy.header.language}
                onChange={(nextLanguage) => {
                  onLanguageChange(nextLanguage);
                  closeMenu();
                }}
              />
              <AppLink
                href="/#contacts"
                onClick={closeMenu}
                className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-navy px-4 text-sm font-extrabold text-white"
              >
                <Phone size={17} />
                {copy.header.contact}
              </AppLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
