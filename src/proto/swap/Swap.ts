// Original file: proto/swap.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LiquidityRequest as _swap_LiquidityRequest, LiquidityRequest__Output as _swap_LiquidityRequest__Output } from '../swap/LiquidityRequest';
import type { SwapRequest as _swap_SwapRequest, SwapRequest__Output as _swap_SwapRequest__Output } from '../swap/SwapRequest';
import type { SwapResponse as _swap_SwapResponse, SwapResponse__Output as _swap_SwapResponse__Output } from '../swap/SwapResponse';
import type { TradingPair as _swap_TradingPair, TradingPair__Output as _swap_TradingPair__Output } from '../swap/TradingPair';
import type { TradingPairListResponse as _swap_TradingPairListResponse, TradingPairListResponse__Output as _swap_TradingPairListResponse__Output } from '../swap/TradingPairListResponse';
import type { TxHashRequest as _swap_TxHashRequest, TxHashRequest__Output as _swap_TxHashRequest__Output } from '../swap/TxHashRequest';
import type { TxStatusResponse as _swap_TxStatusResponse, TxStatusResponse__Output as _swap_TxStatusResponse__Output } from '../swap/TxStatusResponse';

export interface SwapClient extends grpc.Client {
  /**
   * Read Domain
   */
  Init(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_LiquidityRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_LiquidityRequest, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  /**
   * Read Domain
   */
  init(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_LiquidityRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_LiquidityRequest, callback: grpc.requestCallback<_swap_TradingPairListResponse__Output>): grpc.ClientUnaryCall;
  
  Liquidity(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TradingPair__Output>;
  Liquidity(argument: _swap_LiquidityRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TradingPair__Output>;
  liquidity(argument: _swap_LiquidityRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TradingPair__Output>;
  liquidity(argument: _swap_LiquidityRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TradingPair__Output>;
  
  OrderStatus(argument: _swap_TxHashRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TxStatusResponse__Output>;
  OrderStatus(argument: _swap_TxHashRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TxStatusResponse__Output>;
  orderStatus(argument: _swap_TxHashRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TxStatusResponse__Output>;
  orderStatus(argument: _swap_TxHashRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_TxStatusResponse__Output>;
  
  /**
   * Write Domain
   */
  Swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  /**
   * Write Domain
   */
  swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SwapHandlers extends grpc.UntypedServiceImplementation {
  /**
   * Read Domain
   */
  Init: grpc.handleUnaryCall<_swap_LiquidityRequest__Output, _swap_TradingPairListResponse>;
  
  Liquidity: grpc.handleServerStreamingCall<_swap_LiquidityRequest__Output, _swap_TradingPair>;
  
  OrderStatus: grpc.handleServerStreamingCall<_swap_TxHashRequest__Output, _swap_TxStatusResponse>;
  
  /**
   * Write Domain
   */
  Swap: grpc.handleUnaryCall<_swap_SwapRequest__Output, _swap_SwapResponse>;
  
}

export interface SwapDefinition extends grpc.ServiceDefinition {
  Init: MethodDefinition<_swap_LiquidityRequest, _swap_TradingPairListResponse, _swap_LiquidityRequest__Output, _swap_TradingPairListResponse__Output>
  Liquidity: MethodDefinition<_swap_LiquidityRequest, _swap_TradingPair, _swap_LiquidityRequest__Output, _swap_TradingPair__Output>
  OrderStatus: MethodDefinition<_swap_TxHashRequest, _swap_TxStatusResponse, _swap_TxHashRequest__Output, _swap_TxStatusResponse__Output>
  Swap: MethodDefinition<_swap_SwapRequest, _swap_SwapResponse, _swap_SwapRequest__Output, _swap_SwapResponse__Output>
}
