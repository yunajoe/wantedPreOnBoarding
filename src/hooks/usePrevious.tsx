import { useEffect, useRef } from "react";

function usePrevious(value: boolean) {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
