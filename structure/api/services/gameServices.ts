import type { GameListResponse } from "@/structure/api/apiResModel";
import { API_ENDPOINTS } from "@/structure/api/endpoints";
import apiHelper from "@/structure/utils/apiHelper";

export interface GameListParams {
  gameName?: string;
}

export const GameServices = {
  getGames: async (params?: GameListParams): Promise<GameListResponse> => {
    const response = await apiHelper.get<GameListResponse>(
      API_ENDPOINTS.gameList,
      { params },
    );
    return response.data;
  },
};
