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

  transactionsStats$ = (page: number) =>
    this.http.get<TransactionStats>(`${this.host}/api/v1/transactions`, {
      params: {
        page: page
      }
    });

  transactionAllStatsWithBlockTime$ = (page: number) =>
    this.http.get<TransactionAllStatsWithBlockTime>(`${this.host}/api/v1/transactions/block-time`, {
      params: {
        page: page
      }
    });

  transactionStatsYellowstone$ = (page: number) =>
    this.http.get<TransactionStatsWithBlockTime>(`${this.host}/api/v1/transactions/yellowstone`, {
      params: {
        page: page
      }
    });

  transactionStatsWebsocket$ = (page: number) =>
    this.http.get<TransactionStatsWithBlockTime>(`${this.host}/api/v1/transactions/websocket`, {
      params: {
        page: page
      }
    });
}
