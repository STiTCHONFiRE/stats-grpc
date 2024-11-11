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
    this.http.get<TransactionStats>('http://195.133.14.141:8082/api/v1/transactions');

  transactionStatsWithBlockTime$ = () =>
    this.http.get<TransactionStatsWithBlockTime>('http://195.133.14.141/8082/api/v1/transactions/block-time');

}
