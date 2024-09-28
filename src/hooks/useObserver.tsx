import { useEffect, useRef, useState } from "react";

type useObserverObtions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

function useObserver({
  root = null,
  rootMargin = "0%",
  threshold = 1,
}: useObserverObtions = {}) {
  const [isRefVisible, setIsRefVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null); // 타입을 HTMLDivElement로 설정
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const thresholds = Array.isArray(observer.thresholds)
        ? observer.thresholds
        : [observer.thresholds];

      entries.forEach((entry) => {
        const isIntersecting =
          entry.isIntersecting &&
          thresholds.some((threshold) => entry.intersectionRatio >= threshold);
        setIsRefVisible(isIntersecting);
      });
    },
    { root, rootMargin, threshold }
  );
  useEffect(() => {
    if (!ref.current) return;

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold]);
  return {
    ref,
    isRefVisible,
  };
}

export default useObserver;
