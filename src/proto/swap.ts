import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SwapClient as _swap_SwapClient, SwapDefinition as _swap_SwapDefinition } from './swap/Swap';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  swap: {
    Swap: SubtypeConstructor<typeof grpc.Client, _swap_SwapClient> & { service: _swap_SwapDefinition }
    SwapRequest: MessageTypeDefinition
    SwapResponse: MessageTypeDefinition
    SwapsResponse: MessageTypeDefinition
    Token: MessageTypeDefinition
  }
}

