import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "../components/Reveal.jsx";
import { assets, contacts } from "../data/catalog.js";
import { assetPath } from "../lib/assets.js";
import { AppLink } from "../lib/navigation.jsx";

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

function Footer({ copy }) {
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

  const contactItems = [
    {
      id: "phone",
      icon: Phone,
      label: contact.labels.phone,
      href: contacts.phoneHref,
      value: contacts.phoneDisplay,
    },
    {
      id: "email",
      icon: Mail,
      label: contact.labels.email,
      href: contacts.emailHref,
      value: contacts.email,
    },
    {
      id: "address",
      icon: MapPin,
      label: contact.labels.address,
      href: contacts.mapHref,
      value: contacts.address,
      external: true,
    },
    {
      id: "work",
      icon: Clock3,
      label: footer.workTitle,
      value: (
        <>
          {footer.workDays}
          <span className="footer-work-hours">{footer.workHours}</span>
        </>
      ),
    },
  ];

  return (
    <footer id="contacts" className="site-footer scroll-mt-28">
      <div className="footer-shell">
        <div className="footer-grid">
          <Reveal as="section" className="footer-column footer-column--brand">
            <div className="footer-brand">
              <span className="footer-brand-logo">
                <img
                  src={assetPath(assets.logo)}
                  alt={copy.header.logoAlt}
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
              <p className="footer-brand-tagline">{copy.header.subtitle}</p>
              <p className="footer-brand-description">{footer.description}</p>
            </div>
          </Reveal>

          <Reveal as="section" className="footer-column footer-column--1">
            <h2 className="footer-column-title">{footer.contactTitle}</h2>
            <div className="footer-info-list">
              {contactItems.map((item) => (
                <ContactItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  external={item.external}
                >
                  {item.value}
                </ContactItem>
              ))}
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
        </div>

        <div className="footer-bottom">
          <p>© 2026 Seller Group Azerbaijan</p>
          <p>{footer.bottomRight ?? footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
