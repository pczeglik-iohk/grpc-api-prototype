// Original file: proto/swap.proto

import type { TradingPair as _swap_TradingPair, TradingPair__Output as _swap_TradingPair__Output } from '../swap/TradingPair';

export interface SwapRequest {
  'destAddr'?: (string);
  'pair'?: (_swap_TradingPair | null);
}

export interface SwapRequest__Output {
  'destAddr'?: (string);
  'pair'?: (_swap_TradingPair__Output);
}
