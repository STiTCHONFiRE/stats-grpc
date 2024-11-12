import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionAllStatsWithBlockTime, TransactionStats, TransactionStatsWithBlockTime } from '../interface/transaction-stats';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatsService {

  private readonly TEST_HOST: string = "http://localhost:8081";
  private readonly HOST: string = "http://195.133.14.141:8082";

  private get host(): string {
    if (isDevMode()) {
      return this.TEST_HOST
    } else {
      return this.HOST
    }
  }

  constructor(private http: HttpClient) {
  }

  transactionsStats$ = () =>
    this.http.get<TransactionStats>(`${this.host}/api/v1/transactions`);

  transactionAllStatsWithBlockTime$ = () =>
    this.http.get<TransactionAllStatsWithBlockTime>(`${this.host}/api/v1/transactions/block-time`);

  transactionStatsYellowstone$ = () =>
    this.http.get<TransactionStatsWithBlockTime>(`${this.host}/api/v1/transactions/yellowstone`);

  transactionStatsWebsocket$ = () =>
    this.http.get<TransactionStatsWithBlockTime>(`${this.host}/api/v1/transactions/websocket`);
}
