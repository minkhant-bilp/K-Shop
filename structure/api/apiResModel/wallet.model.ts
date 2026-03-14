import type { BaseEntity } from "./base.model";

export type WalletStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED";

export interface Wallet extends BaseEntity {
  id: number;
  balance: number;
  status: WalletStatus;
}

export interface WalletDetailResponse {
  wallet: Wallet;
  rechargeHistory: unknown[];
  topupHistory: unknown[];
}

export interface CoinPrice {
  id: number;
  price: number;
}

export interface CoinPriceResponse {
  status: string;
  message: string;
  data: CoinPrice;
}

