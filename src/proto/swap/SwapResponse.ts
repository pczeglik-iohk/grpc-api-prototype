// Original file: proto/swap.proto

import type { Token as _swap_Token, Token__Output as _swap_Token__Output } from '../swap/Token';

export interface SwapResponse {
  'a'?: (_swap_Token | null);
  'b'?: (_swap_Token | null);
}

export interface SwapResponse__Output {
  'a'?: (_swap_Token__Output);
  'b'?: (_swap_Token__Output);
}
