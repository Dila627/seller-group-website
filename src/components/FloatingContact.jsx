import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { telegramUrl } from "../data/sellerContent.js";

const storageKey = "sellerGroupFloatingContactHidden";

function FloatingContact() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem(storageKey) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  if (hidden) return null;

  const hideButton = () => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Ignore storage restrictions; still hide for the current React state.
    }
    setHidden(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[999] sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={hideButton}
        className="absolute -left-2 -top-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-slate-950 text-white shadow-lg transition hover:bg-red-600"
        aria-label="Скрыть кнопку Telegram"
      >
        <X size={13} />
      </button>
      <a
        href={telegramUrl}
        target="_blank"
        rel="noreferrer"
        className="focus-ring group flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-blue-700 text-sm font-black text-white shadow-[0_18px_55px_rgba(37,99,235,0.35)] transition-all duration-300 hover:bg-slate-950 sm:hover:w-48 sm:hover:justify-start sm:hover:px-4"
        aria-label="Связаться в Telegram"
      >
        <Send size={20} className="shrink-0" />
        <span className="hidden whitespace-nowrap pl-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:inline">
          Telegram
        </span>
      </a>
    </div>
  );
}

export default FloatingContact;
