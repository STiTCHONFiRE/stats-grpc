export interface TransactionStats {
  mean: number;
  size: number;
  grpcFasterWebsocketCount: number;
  max: number;
  min: number;
  transactionInfos: TransactionInfo[];
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
  protocolTimestamp: Date;
}

export interface TransactionAllStatsWithBlockTime {
  size: number;
  yellowstone: TransactionInfoWithBlockTime[];
  websocket: TransactionInfoWithBlockTime[];
}

export interface TransactionStatsWithBlockTime {
  mean: number;
  size: number;
  max: number;
  min: number;
  protocolInfos: TransactionInfoWithBlockTime[];
}
