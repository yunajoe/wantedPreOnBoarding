import { ApiResponse, MockData } from "../types/data";
import { MOCK_DATA } from "./data";

const PER_PAGE = 10;

// 페이지는 1부터 시작함

export const getMockData = (pageNum: number): Promise<ApiResponse> => {
  // console.log("ppp", pageNum);
  return new Promise((resolve) => {
    setTimeout(() => {
      const datas: MockData[] = MOCK_DATA.slice(
        PER_PAGE * pageNum,
        PER_PAGE * (pageNum + 1)
      );
      console.log(
        "데이터",
        datas,
        "pageNum",
        pageNum,
        "처음데이터",
        PER_PAGE * pageNum,
        "마지막데이터",
        PER_PAGE * (pageNum + 1)
      );
      const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;
      resolve({ datas, isEnd });
    });
  });
};
