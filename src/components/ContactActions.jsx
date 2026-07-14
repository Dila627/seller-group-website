import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { contacts } from "../data/catalog.js";

const iconByAction = {
  call: Phone,
  whatsapp: FaWhatsapp,
  telegram: Send,
  email: Mail,
  max: MessageCircle,
};

const linkByAction = {
  call: contacts.phoneHref,
  whatsapp: contacts.whatsappHref,
  telegram: contacts.telegramHref,
  email: contacts.emailHref,
  max: contacts.maxHref,
};

const externalActions = new Set(["whatsapp", "max"]);

export function getContactActions(labels, options = {}) {
  const { includeMax = true, ids = ["call", "whatsapp", "telegram", "email", "max"] } = options;

  return ids
    .filter((id) => includeMax || id !== "max")
    .map((id) => ({
      id,
      href: linkByAction[id],
      label: labels[id],
      icon: iconByAction[id],
      external: externalActions.has(id),
    }))
    .filter((item) => item.href && item.label && item.icon);
}

function getButtonClassName(variant) {
  const base =
    "focus-ring inline-flex min-h-9 w-[102px] items-center justify-center gap-1.5 rounded-full px-2 text-xs font-extrabold transition";

  if (variant === "light") {
    return `${base} border border-slate-200 bg-white text-graphite shadow-sm hover:border-navy hover:bg-navy hover:text-white`;
  }

  return `${base} border border-white/15 bg-white/10 text-white hover:border-copper hover:bg-white/[0.16]`;
}

export function ContactActionButton({ action, variant = "dark", iconOnly = false }) {
  const Icon = action.icon;
  const isWhatsApp = action.id === "whatsapp";

  return (
    <a
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
      aria-label={action.label}
      title={action.label}
      className={
        iconOnly
          ? "focus-ring grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-graphite transition hover:bg-navy hover:text-white"
          : getButtonClassName(variant)
      }
    >
      <Icon size={iconOnly ? 16 : 15} className={isWhatsApp ? "text-[#25D366]" : undefined} />
      {iconOnly ? null : <span>{action.label}</span>}
    </a>
  );
}

export function ContactActions({ labels, variant = "dark", includeMax = true, ids }) {
  const actions = getContactActions(labels, { includeMax, ids });

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <ContactActionButton key={action.id} action={action} variant={variant} />
      ))}
    </div>
  );
}
