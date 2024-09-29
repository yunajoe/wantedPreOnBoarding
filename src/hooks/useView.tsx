import { useRef, useState } from "react";

function useView() {
  const eleRef = useRef();
  const [isInvew, setIsView] = useState(false);
  const checkInView = () => {
    const ele = eleRef.current;
    if (!ele) {
      return;
    }
  };
  return <div></div>;
}

export default useView;
