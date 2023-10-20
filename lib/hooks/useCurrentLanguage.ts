import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  return null;
};

export default function useCurrentLanguage() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
