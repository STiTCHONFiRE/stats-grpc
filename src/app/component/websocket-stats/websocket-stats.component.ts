import { Component, effect, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { TransactionStatsWithBlockTime } from '../../interface/transaction-stats';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionStatsService } from '../../service/transaction-stats.service';
import { EChartsOption } from 'echarts';
import { AsyncPipe } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-websocket-stats',
  standalone: true,
  imports: [
    AsyncPipe,
    NgxEchartsDirective
  ],
  templateUrl: './websocket-stats.component.html',
  styleUrl: './websocket-stats.component.scss',
  providers: [provideEcharts()],
})
export class WebsocketStatsComponent {
  transactionStatsService = inject(TransactionStatsService);
  currentPage = signal<number>(0);

  websocketStats$?: Observable<{ appState: string, appData?: TransactionStatsWithBlockTime, err?: HttpErrorResponse; }>

  eChartsOptions?: EChartsOption;

  constructor() {
    effect(() => {
      this.websocketStats$ = this.transactionStatsService.transactionStatsWebsocket$(this.currentPage())
        .pipe(
          map(result => {
            this.setupECharts(result);
            return {appState: 'APP_LOADED', appData: result};
          }),
          startWith({appState: 'APP_LOADING'}),
          catchError((err: HttpErrorResponse) => of({appState: 'APP_ERROR', err}))
        );
    });
  }

  public nextPage(): void {
    this.currentPage.update(v => v + 1);
  }

  public prevPage(): void {
    this.currentPage.update(v => v - 1);
  }

  private setupECharts(stats: TransactionStatsWithBlockTime): void {
    const temp: number[] = [];
    for (let i = 0; i < stats.size; ++i) {
      temp.push(i);
    }

    this.eChartsOptions = {
      darkMode: true,
      textStyle: {
        color: '#FFFFFF'
      },
      title: {
        text: 'График сравнения WebSocket с Block time',
        textStyle: {
          color: '#FFFFFF'
        },
        left: 'center'
      },
      legend: {
        bottom: 5,
        textStyle: {
          color: '#FFFFFF'
        }
      },
      grid: {
        width: window.innerWidth - window.innerWidth * 0.10,
        left: 'center',
        containLabel: true
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        scale: true,
      },
      yAxis: {
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        scale: true
      },
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'inside',
          xAxisIndex: [0],
          filterMode: 'none'
        },
        {
          id: 'dataZoomY',
          type: 'inside',
          yAxisIndex: [0],
          filterMode: 'none'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      series: [
        {
          name: 'WebSocket',
          type: 'line',
          showSymbol: false,
          color: '#8100ff',
          dimensions: [
            {
              name: 'x',
              type: 'number'
            },
            {
              name: 'y',
              type: 'number'
            }
          ]
        }
      ],
      dataset: {
        source: {
          x: temp,
          y: stats.protocolInfos.map(x => x.timeDifference),
        }
      }
    };
  }
}
