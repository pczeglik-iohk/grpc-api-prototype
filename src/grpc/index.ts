import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from '../proto/swap';

const PROTO_FILE = '../../proto/swap.proto';
const packageDef = loadSync(path.resolve(__dirname, PROTO_FILE));
const grpc: ProtoGrpcType = loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const swap = grpc.swap;
export default swap;
