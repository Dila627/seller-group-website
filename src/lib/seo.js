function upsertMeta(selector, attributes) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

function getImageType(image) {
  const pathname = new URL(image, window.location.origin).pathname.toLowerCase();

  if (pathname.endsWith(".png")) {
    return "image/png";
  }

  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) {
    return "image/jpeg";
  }

  if (pathname.endsWith(".svg")) {
    return "image/svg+xml";
  }

  return "image/png";
}

export function applySeo({
  title,
  description,
  image,
  url,
  locale,
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  imageAlt,
}) {
  document.title = title;
  document.documentElement.lang = locale;

  upsertMeta('meta[name="description"]', {
    name: "description",
    content: description,
  });
  upsertMeta('meta[property="og:title"]', {
    property: "og:title",
    content: ogTitle ?? title,
  });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: ogDescription ?? description,
  });
  upsertMeta('meta[property="og:type"]', {
    property: "og:type",
    content: "website",
  });
  upsertMeta('meta[property="og:url"]', {
    property: "og:url",
    content: url,
  });
  upsertMeta('meta[property="og:image"]', {
    property: "og:image",
    content: image,
  });
  upsertMeta('meta[property="og:image:secure_url"]', {
    property: "og:image:secure_url",
    content: image,
  });
  upsertMeta('meta[property="og:image:type"]', {
    property: "og:image:type",
    content: getImageType(image),
  });
  upsertMeta('meta[property="og:image:width"]', {
    property: "og:image:width",
    content: "1200",
  });
  upsertMeta('meta[property="og:image:height"]', {
    property: "og:image:height",
    content: "630",
  });
  upsertMeta('meta[property="og:image:alt"]', {
    property: "og:image:alt",
    content: imageAlt ?? "Seller Group Azerbaijan",
  });
  upsertMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: "Seller Group Azerbaijan",
  });
  upsertMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  upsertMeta('meta[name="twitter:title"]', {
    name: "twitter:title",
    content: twitterTitle ?? ogTitle ?? title,
  });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: twitterDescription ?? ogDescription ?? description,
  });
  upsertMeta('meta[name="twitter:image"]', {
    name: "twitter:image",
    content: image,
  });
}

export function applyStructuredData(data) {
  const id = "seller-group-structured-data";
  let script = document.getElementById(id);

  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}
