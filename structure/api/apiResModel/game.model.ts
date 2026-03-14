export interface Game {
  // Replace this with the real game fields when available
  [key: string]: unknown;
}

export interface GameListData {
  list: Game[];
  page: number;
  numberofElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GameListResponse {
  status: string;
  message: string;
  data: GameListData;
}
