export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface ApiResponse {
  datas: MockData[];
  isEnd: boolean;
}
