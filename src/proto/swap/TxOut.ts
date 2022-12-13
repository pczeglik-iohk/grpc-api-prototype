// Original file: proto/swap.proto

import type { Token as _swap_Token, Token__Output as _swap_Token__Output } from '../swap/Token';

export interface TxOut {
  'address'?: (string);
  'value'?: (_swap_Token)[];
}

export interface TxOut__Output {
  'address'?: (string);
  'value'?: (_swap_Token__Output)[];
}
