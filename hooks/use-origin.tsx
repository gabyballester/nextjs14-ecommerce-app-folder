import { useEffect, useState, useMemo } from "react";

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const origin = useMemo(() => {
    return typeof window !== "undefined" ? window.location.origin : "";
  }, []);

  return isMounted ? origin : "";
};
