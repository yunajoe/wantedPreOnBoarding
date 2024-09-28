// import { useEffect, useState } from "react";

// function useFetch({api}) {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const callData = async () => {
//       const result = await getData();
//       const { datas, isEnd } = result;
//       if (isEnd) {
//         setIsLoading(false);
//         return;
//       }

//       if (datas.length > 0) {
//         setCurrentData((prev) => {
//           return [...prev, ...datas];
//         });
//       }
//     };

//     try {
//       setIsLoading(true);
//       callData();
//     } catch (error) {
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page]);
//   return <div></div>;
// }

// export default useFetch;
