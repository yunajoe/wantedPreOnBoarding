import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import LoadingSpinner from "./components/LoadingSpinner";
import useObserver from "./hooks/useObserver";
import { MockData } from "./types/data";
import { calculatePrice, getMockData } from "./utils/api";

function App() {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState<MockData[]>([]);
  const [currentViewDataIdArr, setCurrentViewDataIdArr] = useState<string[]>(
    []
  );
  const [totalSum, setTotalSum] = useState(0);

  const { ref, isRefVisible } = useObserver();

  const getData = useCallback(async () => {
    const result = await getMockData(page);
    return result;
  }, [page]);

  const callData = async () => {
    // setIsLoading(true);
    const result = await getData();
    const { datas, isEnd } = result;
    if (isEnd) {
      setIsLoading(false);
    }

    if (datas.length > 0) {
      setCurrentData((prev) => {
        if (prev.length === 0) {
          return [...datas];
        }
        const result = prev.every((item, index) => item === datas[index]);
        if (!result) {
          return [...prev, ...datas];
        }
        return prev;
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      callData();
    } catch (error) {
      throw error;
    } finally {
      // setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (isRefVisible) {
      setPage((prev) => prev + 1);
      return;
    }
  }, [isRefVisible]);

  useEffect(() => {
    const result = calculatePrice(currentViewDataIdArr);
    setTotalSum(result);
  }, [currentViewDataIdArr]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-2 bg-red-500">
        <h2>총금액:{totalSum}</h2>
      </nav>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {currentData.map((item: MockData, index) => {
            const { boughtDate, price, productId, productName } = item;
            return (
              <Card
                key={index}
                boughtDate={boughtDate}
                price={price}
                productId={productId}
                productName={productName}
                currentViewDataIdArr={currentViewDataIdArr}
                setCurrentViewDataIdArr={setCurrentViewDataIdArr}
              />
            );
          })}
        </>
      )}

      <div ref={ref}></div>
    </>
  );
}

export default App;
