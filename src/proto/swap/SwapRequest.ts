// Original file: proto/swap.proto

import type { TradingPair as _swap_TradingPair, TradingPair__Output as _swap_TradingPair__Output } from '../swap/TradingPair';
import type { UTxO as _swap_UTxO, UTxO__Output as _swap_UTxO__Output } from '../swap/UTxO';

export interface SwapRequest {
  'destAddr'?: (string);
  'pair'?: (_swap_TradingPair | null);
  'utxos'?: (_swap_UTxO)[];
}

export interface SwapRequest__Output {
  'destAddr'?: (string);
  'pair'?: (_swap_TradingPair__Output);
  'utxos'?: (_swap_UTxO__Output)[];
}
