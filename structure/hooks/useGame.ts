import { useQuery } from "@tanstack/react-query";
import {
  GameServices,
  type GameListParams,
} from "@/structure/api/services/gameServices";

export const useGame = (params?: GameListParams) => {
  const gameListQuery = useQuery({
    queryKey: ["games", params],
    queryFn: () => GameServices.getGames(params),
  });

  return {
    gameListQuery,
    games: gameListQuery.data?.data.list ?? [],
    pagination: gameListQuery.data?.data,
  };
};

