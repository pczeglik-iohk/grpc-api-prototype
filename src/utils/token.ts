import { Token__Output } from '../proto/swap/Token';

export const isValid = (
  t?: Token__Output,
  allowEmptyPolicy: boolean = false
) => {
  return (
    t &&
    t.name &&
    t.name.length > 0 &&
    t.policy &&
    (allowEmptyPolicy ? t.policy.length >= 0 : t.policy.length > 0) &&
    t.amount &&
    t.amount.greaterThan(0)
  );
};

export const keyForTokenOutput = (t: Token__Output) => {
  return t.policy === '' ? '' : `${t.policy!}.${t.name!}`;
};

export const keyForPair = (pair: [Token__Output, Token__Output]) => {
  const tokenAKey = keyForTokenOutput(pair[0]);
  const tokenBKey = keyForTokenOutput(pair[1]);
  if (tokenAKey < tokenBKey)
    // sort alphanumerically for correct pool name
    return `${tokenAKey === '' ? '' : `${tokenAKey}:`}${tokenBKey}`;
  return `${tokenBKey === '' ? '' : `${tokenBKey}:`}${tokenAKey}`;
};
