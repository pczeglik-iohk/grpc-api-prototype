// Original file: proto/swap.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SwapRequest as _swap_SwapRequest, SwapRequest__Output as _swap_SwapRequest__Output } from '../swap/SwapRequest';
import type { SwapResponse as _swap_SwapResponse, SwapResponse__Output as _swap_SwapResponse__Output } from '../swap/SwapResponse';
import type { SwapsResponse as _swap_SwapsResponse, SwapsResponse__Output as _swap_SwapsResponse__Output } from '../swap/SwapsResponse';

export interface SwapClient extends grpc.Client {
  Init(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  Init(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_SwapRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_SwapRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_SwapRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  init(argument: _swap_SwapRequest, callback: grpc.requestCallback<_swap_SwapsResponse__Output>): grpc.ClientUnaryCall;
  
  Liquidity(argument: _swap_SwapRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_SwapResponse__Output>;
  Liquidity(argument: _swap_SwapRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_SwapResponse__Output>;
  liquidity(argument: _swap_SwapRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_SwapResponse__Output>;
  liquidity(argument: _swap_SwapRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_swap_SwapResponse__Output>;
  
}

export interface SwapHandlers extends grpc.UntypedServiceImplementation {
  Init: grpc.handleUnaryCall<_swap_SwapRequest__Output, _swap_SwapsResponse>;
  
  Liquidity: grpc.handleServerStreamingCall<_swap_SwapRequest__Output, _swap_SwapResponse>;
  
}

export interface SwapDefinition extends grpc.ServiceDefinition {
  Init: MethodDefinition<_swap_SwapRequest, _swap_SwapsResponse, _swap_SwapRequest__Output, _swap_SwapsResponse__Output>
  Liquidity: MethodDefinition<_swap_SwapRequest, _swap_SwapResponse, _swap_SwapRequest__Output, _swap_SwapResponse__Output>
}
