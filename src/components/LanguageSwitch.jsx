import { languages } from "../data/catalog.js";

function LanguageSwitch({ language, label, onChange }) {
  return (
    <div
      aria-label={label}
      className="grid grid-cols-2 rounded-full border border-slate-200 bg-white p-1"
      role="group"
    >
      {languages.map((item) => {
        const active = language === item.code;

        return (
          <button
            key={item.code}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(item.code)}
            className={`focus-ring min-h-9 min-w-11 rounded-full px-3 text-xs font-black transition ${
              active
                ? "bg-graphite text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-graphite"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
