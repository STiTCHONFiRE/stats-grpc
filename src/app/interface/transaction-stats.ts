export interface TransactionStats {
  mean: number;
  n: number;
  grpcFasterWebsocketCount: number;
  max: number;
  min: number;
  variance: number;
  standardDeviation: number;
  coefficientVariance: number;
  transactionInfos: TransactionInfo[];
  transactionInfosYellowstone: TransactionInfo[];
  transactionInfosWebsocket: TransactionInfo[];
}

export interface TransactionInfo {
  txId: string;
  timeDifference: number;
  websocketTimestamp: Date;
  yellowstoneTimestamp: Date;
}

export interface TransactionInfoWithBlockTime {
  txId: string;
  timeDifference: number;
  blockTimestamp: Date;
  websocketTimestamp: Date;
}

export interface TransactionStatsWithBlockTime {
  mean: number;
  transactionInfoWithBlockTime: TransactionInfoWithBlockTime[];
}
