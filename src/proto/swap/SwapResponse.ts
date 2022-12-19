// Original file: proto/swap.proto

import type { TxOut as _swap_TxOut, TxOut__Output as _swap_TxOut__Output } from '../swap/TxOut';

export interface SwapResponse {
  'outs'?: (_swap_TxOut)[];
}

export interface SwapResponse__Output {
  'outs'?: (_swap_TxOut__Output)[];
}
