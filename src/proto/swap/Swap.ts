// Original file: proto/swap.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LiquidityRequest as _swap_LiquidityRequest, LiquidityRequest__Output as _swap_LiquidityRequest__Output } from '../swap/LiquidityRequest';
import type { SwapRequest as _swap_SwapRequest, SwapRequest__Output as _swap_SwapRequest__Output } from '../swap/SwapRequest';
import type { SwapTransaction as _swap_SwapTransaction, SwapTransaction__Output as _swap_SwapTransaction__Output } from '../swap/SwapTransaction';
import type { TradingPair as _swap_TradingPair, TradingPair__Output as _swap_TradingPair__Output } from '../swap/TradingPair';
import type { TradingPairListResponse as _swap_TradingPairListResponse, TradingPairListResponse__Output as _swap_TradingPairListResponse__Output } from '../swap/TradingPairListResponse';

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
  
  /**
   * Write Domain
   */
  Swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  Swap(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  /**
   * Write Domain
   */
  swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  swap(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapTransaction__Output>): grpc.ClientUnaryCall;
  
}

export interface SwapHandlers extends grpc.UntypedServiceImplementation {
  /**
   * Read Domain
   */
  Init: grpc.handleUnaryCall<_swap_LiquidityRequest__Output, _swap_TradingPairListResponse>;
  
  Liquidity: grpc.handleServerStreamingCall<_swap_LiquidityRequest__Output, _swap_TradingPair>;
  
  /**
   * Write Domain
   */
  Swap: grpc.handleUnaryCall<_swap_SwapRequest__Output, _swap_SwapTransaction>;
  
}

export interface SwapDefinition extends grpc.ServiceDefinition {
  Init: MethodDefinition<_swap_LiquidityRequest, _swap_TradingPairListResponse, _swap_LiquidityRequest__Output, _swap_TradingPairListResponse__Output>
  Liquidity: MethodDefinition<_swap_LiquidityRequest, _swap_TradingPair, _swap_LiquidityRequest__Output, _swap_TradingPair__Output>
  Swap: MethodDefinition<_swap_SwapRequest, _swap_SwapTransaction, _swap_SwapRequest__Output, _swap_SwapTransaction__Output>
}
