export function assetPath(path) {
  if (!path) {
    return "";
  }

  if (/^(https?:|data:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}
