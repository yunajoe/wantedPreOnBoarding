import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import LoadingSpinner from "./components/LoadingSpinner";
import useObserver from "./hooks/useObserver";
import { MockData } from "./types/data";
import { getMockData } from "./utils/api";

function App() {
  const [page, setPage] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState<MockData[]>([]);
  console.log("page", page);

  // console.log("총 데이터갯수", MOCK_DATA.length);
  // console.log("현재데이터갯수", currentData);
  const { ref, isRefVisible } = useObserver();

  const getData = useCallback(async () => {
    const result = await getMockData(page);
    return result;
  }, [page]);

  useEffect(() => {
    const callData = async () => {
      const result = await getData();
      const { datas, isEnd } = result;
      if (isEnd) {
        setIsLoading(false);
        return;
      }

      if (datas.length > 0) {
        setCurrentData((prev) => {
          return [...prev, ...datas];
        });
      }
    };

    try {
      setIsLoading(true);
      callData();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(()=)

  useEffect(() => {
    if (isRefVisible) {
      setPage((prev) => prev + 1);
    }
  }, [isRefVisible]);

  const showLoading = isLoading && isRefVisible;

  // console.log("이즈로오딩??", isLoading);

  return (
    <>
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
              />
            );
          })}
        </>
      )}

      <div ref={ref}>안녕나는인터셉터어</div>
    </>
  );
}

export default App;
