import { TradingPair__Output } from "../proto/swap/TradingPair";
import { UTxO__Output } from "../proto/swap/UTxO"
import { keyForTokenOutput } from "./token";

export const isValid = (utxos: UTxO__Output[], pair: TradingPair__Output) => {
  const tokenA = keyForTokenOutput(pair.a!);
  const tokenB = keyForTokenOutput(pair.b!);

  // Check 1: Validate that enough tokenA is present in utxos

  return true;
}