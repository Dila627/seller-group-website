import { useEffect, useRef, useState } from "react";

const OBSERVER_ROOT_MARGIN = "900px 0px";
const TRANSPARENT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const observedImages = new Map();
let sharedObserver = null;

function getSharedObserver() {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const load = observedImages.get(entry.target);
          if (load) {
            load();
            observedImages.delete(entry.target);
          }

          sharedObserver?.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: 0.01,
      },
    );
  }

  return sharedObserver;
}

function OptimizedImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority = loading === "eager" ? "auto" : "low",
  decoding = "async",
  className = "",
  onLoad,
  onError,
  ...props
}) {
  const imageRef = useRef(null);
  const shouldLoadImmediately = loading === "eager";
  const [shouldLoad, setShouldLoad] = useState(shouldLoadImmediately);

  useEffect(() => {
    if (shouldLoadImmediately) {
      setShouldLoad(true);
      return undefined;
    }

    const node = imageRef.current;
    const observer = getSharedObserver();

    if (!node || !observer) {
      setShouldLoad(true);
      return undefined;
    }

    const load = () => setShouldLoad(true);
    observedImages.set(node, load);
    observer.observe(node);

    return () => {
      observedImages.delete(node);
      observer.unobserve(node);
    };
  }, [shouldLoadImmediately, src]);

  return (
    <img
      ref={imageRef}
      src={shouldLoad ? src : TRANSPARENT_PLACEHOLDER}
      srcSet={shouldLoad ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      className={className}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
}

export { OBSERVER_ROOT_MARGIN };
export default OptimizedImage;
