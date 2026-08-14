import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { assets } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";
import OptimizedImage from "./OptimizedImage.jsx";

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
          ? "border-white/[0.06] bg-[rgba(10,12,18,0.8)] py-3 shadow-[0_18px_54px_rgba(0,0,0,0.28)] backdrop-blur-[20px]"
          : "border-white/[0.06] bg-[rgba(6,12,22,0.64)] py-4 shadow-[0_18px_54px_rgba(0,0,0,0.16)] backdrop-blur-[18px]"
      }`}
    >
      <div className="container-shell flex items-center justify-between gap-4">
        <AppLink href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-3">
          <span className="header-logo-wrapper grid h-12 w-12 shrink-0 place-items-center sm:h-[54px] sm:w-[54px]">
            <OptimizedImage
              src={assetPath(assets.logo)}
              alt={copy.header.logoAlt}
              width="44"
              height="44"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="header-logo-image h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0 max-w-[190px] sm:max-w-none">
            <span
              className={`block text-sm font-black leading-[1.08] sm:text-base sm:leading-tight ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              Seller Group Azerbaijan
            </span>
            <span
              className={`block max-h-[24px] overflow-hidden text-[9px] font-semibold leading-[11px] sm:max-h-none sm:text-xs sm:leading-4 ${
                scrolled ? "text-slate-300" : "text-slate-300"
              }`}
            >
              {copy.header.subtitle}
            </span>
          </span>
        </AppLink>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main navigation">
          {copy.navigation.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className={`text-sm font-bold transition ${
                scrolled ? "text-slate-200 hover:text-copper-light" : "text-slate-200 hover:text-copper-light"
              }`}
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
            className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold transition ${
              scrolled
                ? "border border-copper/70 bg-white/[0.05] text-white shadow-[0_0_30px_rgba(201,149,82,0.16)] hover:bg-copper hover:text-graphite"
                : "border border-copper/70 bg-white/[0.04] text-white shadow-[0_0_30px_rgba(201,149,82,0.14)] hover:bg-copper hover:text-graphite"
            }`}
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
