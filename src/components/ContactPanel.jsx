import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "./Reveal.jsx";
import { assets, contacts } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

const paintPath =
  "M -40 104 C 130 158 230 72 390 102 C 540 136 628 145 755 92 C 895 34 1015 132 1155 98 C 1310 60 1408 146 1640 70";

function FooterIcon({ icon: Icon }) {
  return (
    <span className="footer-icon">
      <Icon size={18} />
    </span>
  );
}

function ContactItem({ icon, label, children, href, external = false }) {
  const content = (
    <>
      <FooterIcon icon={icon} />
      <span className="min-w-0">
        <span className="footer-item-label">{label}</span>
        <span className="footer-item-value">{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="focus-ring footer-info-link"
      >
        {content}
      </a>
    );
  }

  return <div className="footer-info-link">{content}</div>;
}

function PaintFlow() {
  return (
    <div className="footer-paint-flow" aria-hidden="true">
      <div className="footer-paint-flow__track">
        <svg
          className="footer-paint-flow__svg"
          viewBox="0 0 1600 180"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="paintRibbonGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A93428" />
              <stop offset="24%" stopColor="#C99552" />
              <stop offset="48%" stopColor="#D7B24A" />
              <stop offset="68%" stopColor="#2E6CA8" />
              <stop offset="100%" stopColor="#4E9B42" />
            </linearGradient>
            <linearGradient id="paintRibbonHighlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="18%" stopColor="rgba(255,255,255,0.58)" />
              <stop offset="52%" stopColor="rgba(255,255,255,0.22)" />
              <stop offset="82%" stopColor="rgba(255,255,255,0.46)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="paintRibbonGlow" x="-8%" y="-80%" width="116%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.78  0 1 0 0 0.48  0 0 1 0 0.22  0 0 0 0.34 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path className="footer-paint-flow__shadow" d={paintPath} />
          <path id="footerPaintPath" className="footer-paint-flow__path" d={paintPath} />
          <path className="footer-paint-flow__highlight" d={paintPath} />
        </svg>

        <span className="paint-drop paint-drop--red" />
        <span className="paint-drop paint-drop--yellow" />
        <span className="paint-drop paint-drop--blue" />
        <span className="paint-drop paint-drop--green" />
      </div>
    </div>
  );
}

function ContactPanel({ copy }) {
  const footer = copy.footer;
  const contact = copy.contact;

  const socialLinks = [
    {
      id: "whatsapp",
      href: contacts.whatsappHref,
      label: contact.labels.whatsapp,
      description: footer.socialDescriptions.whatsapp,
      icon: FaWhatsapp,
      external: true,
    },
    {
      id: "telegram",
      href: contacts.telegramHref,
      label: contact.labels.telegram,
      description: footer.socialDescriptions.telegram,
      icon: Send,
      external: false,
    },
    {
      id: "email",
      href: contacts.emailHref,
      label: contact.labels.email,
      description: footer.socialDescriptions.email,
      icon: Mail,
      external: false,
    },
  ];

  return (
    <footer id="contacts" className="site-footer scroll-mt-28">
      <div className="footer-shell">
        <div className="footer-grid">
          <Reveal as="section" className="footer-column footer-column--1">
            <h2 className="footer-column-title">{footer.contactTitle}</h2>
            <div className="footer-info-list">
              <ContactItem icon={Phone} label={contact.labels.phone} href={contacts.phoneHref}>
                {contacts.phoneDisplay}
              </ContactItem>
              <ContactItem icon={Mail} label={contact.labels.email} href={contacts.emailHref}>
                {contacts.email}
              </ContactItem>
              <ContactItem
                icon={MapPin}
                label={contact.labels.address}
                href={contacts.mapHref}
                external
              >
                {contacts.address}
              </ContactItem>
              <ContactItem icon={Clock3} label={footer.workTitle}>
                {footer.workDays}
                <span className="footer-work-hours">{footer.workHours}</span>
              </ContactItem>
            </div>
          </Reveal>

          <Reveal as="section" className="footer-column footer-column--2">
            <nav aria-label={footer.navigationTitle}>
              <h2 className="footer-column-title">{footer.navigationTitle}</h2>
              <ul className="footer-nav-list">
                {footer.nav.map((item) => (
                  <li key={item.href}>
                    <AppLink href={item.href} className="focus-ring footer-nav-link">
                      <span>{item.label}</span>
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal as="section" className="footer-column footer-column--3">
            <h2 className="footer-column-title">{footer.socialTitle}</h2>
            <div className="footer-social-list" aria-label={footer.socialTitle}>
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    aria-label={`${item.label}: ${item.description}`}
                    className={`focus-ring footer-social-card footer-social-card--${item.id}`}
                  >
                    <span className="footer-social-icon">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="footer-social-name">{item.label}</span>
                      <span className="footer-social-description">{item.description}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal as="section" className="footer-column footer-column--4">
            <div className="footer-brand">
              <span className="footer-brand-logo">
                <img
                  src={assetPath(assets.logo)}
                  alt="Seller Group Azerbaijan logo"
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div>
                <p className="footer-brand-name">Seller Group</p>
                <p className="footer-brand-country">Azerbaijan</p>
              </div>
              <p className="footer-brand-tagline">{footer.brandTagline}</p>
            </div>
          </Reveal>
        </div>

        <PaintFlow />

        <div className="footer-bottom">
          <p>© 2026 Seller Group Azerbaijan</p>
          <p>{footer.bottomRight ?? footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export default ContactPanel;
