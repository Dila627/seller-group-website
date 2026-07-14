import { ArrowLeft } from "lucide-react";
import { AppLink } from "../lib/navigation.jsx";

function NotFoundPage({ copy }) {
  return (
    <main className="min-h-screen bg-slate-100 pt-28">
      <div className="container-shell flex min-h-[70vh] items-center">
        <div className="max-w-xl">
          <p className="section-eyebrow text-copper-dark">404</p>
          <h1 className="mt-4 text-5xl font-black text-graphite">{copy.notFound.title}</h1>
          <p className="mt-5 body-copy text-slate-600">{copy.notFound.text}</p>
          <AppLink
            href="/"
            className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-extrabold text-white transition hover:bg-graphite"
          >
            <ArrowLeft size={17} />
            {copy.common.backToHome}
          </AppLink>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
