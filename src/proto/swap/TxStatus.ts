// Original file: proto/swap.proto

export const TxStatus = {
  PENDING_SUBMISSION: 0,
  PENDING_BATCHING: 1,
  CANCELLED: 2,
  COMPLETE: 4,
  INVALID: 5,
} as const;

export type TxStatus =
  | 'PENDING_SUBMISSION'
  | 0
  | 'PENDING_BATCHING'
  | 1
  | 'CANCELLED'
  | 2
  | 'COMPLETE'
  | 4
  | 'INVALID'
  | 5

export type TxStatus__Output = typeof TxStatus[keyof typeof TxStatus]
