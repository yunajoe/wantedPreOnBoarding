import { useEffect, useRef, useState } from "react";
import usePrevious from "../hooks/usePrevious";
import { MockData } from "../types/data";

interface CardProps extends MockData {
  currentViewDataIdArr: string[];
  setCurrentViewDataIdArr: React.Dispatch<React.SetStateAction<string[]>>;
}

function Card({
  boughtDate,
  price,
  productId,
  productName,
  currentViewDataIdArr,
  setCurrentViewDataIdArr,
}: CardProps) {
  const [isView, setIsView] = useState(false);

  const eleRef = useRef<HTMLDivElement>(null);

  const wasInView = usePrevious(isView);

  const checkInView = () => {
    const ele = eleRef.current;
    if (!ele) {
      return;
    }
    const rect = ele.getBoundingClientRect();
    const condition = rect.top < window.innerHeight && rect.bottom >= 0;

    setIsView(condition);
  };

  useEffect(() => {
    document.addEventListener("scroll", checkInView);
    window.addEventListener("resize", checkInView);
    return () => {
      document.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, []);
  useEffect(() => {
    const ele = eleRef.current;
    if (!ele) {
      return;
    }
    if (wasInView) {
      setCurrentViewDataIdArr((prev) => {
        return prev.filter((item) => item !== productId);
      });
    }
    if (!wasInView && isView) {
      setCurrentViewDataIdArr((prev) => [...prev, productId]);
    }
  }, [isView]);

  useEffect(() => {
    checkInView();
  }, []);

  return (
    <div
      className="max-w-sm p-4 m-4 bg-white rounded-lg shadow-lg"
      ref={eleRef}
    >
      <h2 className="text-gray-500">{productName}</h2>
      <p className="text-gray-700">{price}</p>
      <p className="mb-2 text-lg font-bold text-gray-700">{boughtDate}</p>
      <p className="text-gray-600">{productId}</p>
    </div>
  );
}

export default Card;
