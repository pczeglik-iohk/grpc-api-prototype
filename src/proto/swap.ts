import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { SwapClient as _swap_SwapClient, SwapDefinition as _swap_SwapDefinition } from './swap/Swap';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  swap: {
    LiquidityRequest: MessageTypeDefinition
    Swap: SubtypeConstructor<typeof grpc.Client, _swap_SwapClient> & { service: _swap_SwapDefinition }
    SwapRequest: MessageTypeDefinition
    SwapTransaction: MessageTypeDefinition
    Token: MessageTypeDefinition
    TradingPair: MessageTypeDefinition
    TradingPairListResponse: MessageTypeDefinition
    TxHashRequest: MessageTypeDefinition
    TxIn: MessageTypeDefinition
    TxOut: MessageTypeDefinition
    TxStatus: EnumTypeDefinition
    TxStatusResponse: MessageTypeDefinition
    UTxO: MessageTypeDefinition
  }
}

