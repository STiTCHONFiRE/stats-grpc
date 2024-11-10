import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionStats, TransactionStatsWithBlockTime } from '../interface/transaction-stats';

@Injectable({
  providedIn: 'root'
})
export class TransactionStatsServiceService {

  constructor(private http: HttpClient) {
  }

  transactionsStats$ = () =>
    this.http.get<TransactionStats>('http://localhost:8081/api/v1/transactions');

  transactionStatsWithBlockTime$ = () =>
    this.http.get<TransactionStatsWithBlockTime>('http://localhost:8081/api/v1/transactions/block-time');

}
