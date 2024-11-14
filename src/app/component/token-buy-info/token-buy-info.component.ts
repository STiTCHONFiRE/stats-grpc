import { Component } from '@angular/core';
import { TransactionStatsService } from '../../service/transaction-stats.service';
import { Observable } from 'rxjs';
import { TokenBuyInfo } from '../../interface/transaction-stats';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-token-buy-info',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './token-buy-info.component.html',
  styleUrl: './token-buy-info.component.scss'
})
export class TokenBuyInfoComponent {

  tokens$: Observable<TokenBuyInfo[]>;

  constructor(private readonly transactionStatsService: TransactionStatsService) {
    this.tokens$ = this.transactionStatsService.tokenBuyInfo$();
  }

}
