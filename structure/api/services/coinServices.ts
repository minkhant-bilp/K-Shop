import { API_ENDPOINTS } from "@/structure/api/endpoints";
import apiHelper from "@/structure/utils/apiHelper";
import type {
  CoinPriceResponse,
  WalletDetailResponse,
} from "@/structure/api/apiResModel";

export const CoinServices = {
  getWallet: async (): Promise<WalletDetailResponse> => {
    const response = await apiHelper.get<WalletDetailResponse>(
      API_ENDPOINTS.getWallletSummary,
    );
    return response.data;
  },

  getCoinPrice: async (): Promise<CoinPriceResponse> => {
    const response = await apiHelper.get<CoinPriceResponse>(
      API_ENDPOINTS.coinPrice,
    );
    return response.data;
  },
};

