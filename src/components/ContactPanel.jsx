import { Mail, MapPin, Phone } from "lucide-react";
import { assets, contacts } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";
import { ContactActionButton, ContactActions, getContactActions } from "./ContactActions.jsx";

function ContactDetail({ icon: Icon, label, children }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/[0.1] bg-white/[0.055] p-3.5">
      <div className="flex items-center gap-2 text-copper-light">
        <Icon size={15} />
        <p className="text-[0.68rem] font-extrabold uppercase leading-none">{label}</p>
      </div>
      <div className="mt-2 min-w-0 text-sm font-black leading-6 text-white">{children}</div>
    </div>
  );
}

function BottomBar({ copy, socialActions }) {
  return (
    <div className="mt-7 border-t border-white/10 pt-5">
      <div className="grid gap-5 text-center md:grid-cols-[1fr_auto_1fr] md:items-center md:text-left">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white">
              <img
                src={assetPath(assets.logo)}
                alt="Seller Group Azerbaijan logo"
                width="36"
                height="36"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="text-sm font-black text-white">Seller Group Azerbaijan</span>
          </div>
          <div className="text-xs leading-5 text-slate-400">
            <p className="font-bold text-slate-300">© 2026 Seller Group Azerbaijan</p>
            <p>{copy.footer.rights}</p>
          </div>
        </div>

        <nav
          className="flex flex-col items-center gap-2 md:flex-row md:gap-4"
          aria-label={copy.footer.navigationTitle}
        >
          {copy.footer.nav.map((item) => (
            <AppLink
              key={item.href}
              href={item.href}
              className="text-xs font-bold text-slate-300 transition hover:text-copper-light"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="flex justify-center md:justify-end" aria-label={copy.footer.socialTitle}>
          <div className="flex gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1.5 backdrop-blur">
            {socialActions.map((action) => (
              <ContactActionButton key={action.id} action={action} iconOnly />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPanel({ copy }) {
  const contact = copy.contact;
  const socialActions = getContactActions(contact.actions, {
    includeMax: false,
    ids: ["whatsapp", "telegram", "email"],
  });

  return (
    <section id="contacts" className="scroll-mt-28 bg-graphite text-white">
      <div className="container-shell py-9 sm:py-11 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)] lg:items-stretch">
          <div className="order-2 flex min-w-0 flex-col lg:order-1">
            {contact.eyebrow ? (
              <p className="section-eyebrow text-copper-light">{contact.eyebrow}</p>
            ) : null}
            <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {contact.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
              {contact.intro}
            </p>

            <div className="mt-5 rounded-2xl border border-white/[0.12] bg-white/[0.06] p-3.5 shadow-premium sm:p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <ContactDetail icon={Phone} label={contact.labels.phone}>
                  <a
                    href={contacts.phoneHref}
                    className="focus-ring inline-block whitespace-nowrap transition hover:text-copper-light"
                  >
                    {contacts.phoneDisplay}
                  </a>
                </ContactDetail>

                <ContactDetail icon={Mail} label={contact.labels.email}>
                  <a
                    href={contacts.emailHref}
                    className="focus-ring inline-block max-w-full break-words transition hover:text-copper-light"
                  >
                    {contacts.email}
                  </a>
                </ContactDetail>

                <ContactDetail icon={MapPin} label={contact.labels.address}>
                  <a
                    href={contacts.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-block max-w-full break-words transition hover:text-copper-light"
                  >
                    {contacts.address}
                  </a>
                </ContactDetail>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="mb-3 text-[0.68rem] font-extrabold uppercase text-copper-light">
                  {contact.actionTitle}
                </p>
                <ContactActions labels={contact.actions} variant="dark" />
              </div>
            </div>
          </div>

          <div className="order-1 h-[230px] overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-100 shadow-premium sm:h-[280px] lg:order-2 lg:h-auto lg:min-h-[365px]">
            <iframe
              title={contact.labels.address}
              src={contacts.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </div>

        <BottomBar copy={copy} socialActions={socialActions} />
      </div>
    </section>
  );
}

export default ContactPanel;
