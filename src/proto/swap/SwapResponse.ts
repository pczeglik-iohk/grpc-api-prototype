// Original file: proto/swap.proto

import type { UTxO as _swap_UTxO, UTxO__Output as _swap_UTxO__Output } from '../swap/UTxO';
import type { TxOut as _swap_TxOut, TxOut__Output as _swap_TxOut__Output } from '../swap/TxOut';

export interface SwapResponse {
  'ins'?: (_swap_UTxO)[];
  'outs'?: (_swap_TxOut)[];
}

export interface SwapResponse__Output {
  'ins'?: (_swap_UTxO__Output)[];
  'outs'?: (_swap_TxOut__Output)[];
}
