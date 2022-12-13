// Original file: proto/swap.proto

import type { Long } from '@grpc/proto-loader';

export interface Token {
  'policy'?: (string);
  'name'?: (string);
  'amount'?: (number | string | Long);
}

export interface Token__Output {
  'policy'?: (string);
  'name'?: (string);
  'amount'?: (Long);
}
