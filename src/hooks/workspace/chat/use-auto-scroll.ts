"use client";

import { useRef, useEffect } from "react";

export function useAutoScroll<T>(dependencies: T[]) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [dependencies]);

  return scrollRef;
}
