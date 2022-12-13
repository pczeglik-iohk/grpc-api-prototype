// Original file: proto/swap.proto

import type { TxIn as _swap_TxIn, TxIn__Output as _swap_TxIn__Output } from '../swap/TxIn';
import type { TxOut as _swap_TxOut, TxOut__Output as _swap_TxOut__Output } from '../swap/TxOut';

export interface UTxO {
  'in'?: (_swap_TxIn | null);
  'out'?: (_swap_TxOut | null);
}

export interface UTxO__Output {
  'in'?: (_swap_TxIn__Output);
  'out'?: (_swap_TxOut__Output);
}
