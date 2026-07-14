import { createContext, useContext } from "react";

const NavigationContext = createContext({
  path: "/",
  navigate: () => {},
});

export function NavigationProvider({ path, navigate, children }) {
  return (
    <NavigationContext.Provider value={{ path, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

export function AppLink({ href, className, children, onClick, ...props }) {
  const { navigate } = useNavigation();

  function handleClick(event) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      props.target
    ) {
      return;
    }

    const nextUrl = new URL(href, window.location.origin);

    if (nextUrl.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();
    navigate(`${nextUrl.pathname}${nextUrl.hash}`);
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function normalizePath(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}
