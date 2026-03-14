import { useQuery } from "@tanstack/react-query";
import { CoinServices } from "@/structure/api/services/coinServices";

export const useCoin = () => {
  const walletQuery = useQuery({
    queryKey: ["wallet"],
    queryFn: () => CoinServices.getWallet(),
  });

  const coinPriceQuery = useQuery({
    queryKey: ["coinPrice"],
    queryFn: () => CoinServices.getCoinPrice(),
  });

  return {
    walletQuery,
    coinPriceQuery,
    wallet: walletQuery.data?.wallet,
    rechargeHistory: walletQuery.data?.rechargeHistory ?? [],
    topupHistory: walletQuery.data?.topupHistory ?? [],
    coinPrice: coinPriceQuery.data?.data,
  };
};

