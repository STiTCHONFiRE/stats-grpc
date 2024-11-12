import { Component, effect, inject, signal } from '@angular/core';
import { TransactionStatsService } from '../../service/transaction-stats.service';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TransactionAllStatsWithBlockTime, TransactionStats } from '../../interface/transaction-stats';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-all-stats',
  standalone: true,
  imports: [
    AsyncPipe,
    NgxEchartsDirective
  ],
  templateUrl: './all-stats.component.html',
  styleUrl: './all-stats.component.scss',
  providers: [provideEcharts()],
})
export class AllStatsComponent {
  state = signal<'all' | 'relatively'>('all');

  transactionStatsService = inject(TransactionStatsService);

  transactionAllStats$?: Observable<{ appState: string, appData?: TransactionAllStatsWithBlockTime, err?: HttpErrorResponse; }>;
  transactionRelativelyStats$?: Observable<{ appState: string, appData?: TransactionStats, err?: HttpErrorResponse; }>;

  relativelyEChart?: EChartsOption;
  allStatsEChart?: EChartsOption;

  constructor() {
    effect(() => {
      if (this.state() == 'all') {
        this.transactionAllStats$ = this.transactionStatsService.transactionAllStatsWithBlockTime$()
          .pipe(
            map(result => {
              this.setupAllStatsEChart(result);
              return {appState: 'APP_LOADED', appData: result};
            }),
            startWith({appState: 'APP_LOADING'}),
            catchError((err: HttpErrorResponse) => of({appState: 'APP_ERROR', err}))
          );
      } else {
        this.transactionRelativelyStats$ = this.transactionStatsService.transactionsStats$()
          .pipe(
            map(result => {
              this.setupRelativelyEChart(result);
              return {appState: 'APP_LOADED', appData: result};
            }),
            startWith({appState: 'APP_LOADING'}),
            catchError((err: HttpErrorResponse) => of({appState: 'APP_ERROR', err}))
          );
      }
    });
  }

  public updateState(state: 'all' | 'relatively') {
    this.state.set(state);
  }

  private setupRelativelyEChart(stats: TransactionStats): void {
    const temp: number[] = [];
    for (let i = 0; i < stats.size; ++i) {
      temp.push(i);
    }

    this.relativelyEChart = {
      darkMode: true,
      textStyle: {
        color: '#FFFFFF'
      },
      title: {
        show: false
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
          name: 'difference',
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
          y: stats.transactionInfos.map(x => x.timeDifference),
        }
      }
    };
  }

  private setupAllStatsEChart(stats: TransactionAllStatsWithBlockTime): void {
    const temp: number[] = [];
    for (let i = 0; i < stats.size; ++i) {
      temp.push(i);
    }

    this.allStatsEChart = {
      darkMode: true,
      textStyle: {
        color: '#FFFFFF'
      },
      title: {
        show: false
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
          name: 'websocket',
          type: 'line',
          showSymbol: false,
          color: '#8100ff',
          dimensions: [
            {
              name: 'x',
              type: 'number'
            },
            {
              name: 'websocket',
              type: 'number'
            }
          ]
        },
        {
          name: 'yellowstone',
          type: 'line',
          showSymbol: false,
          color: '#019318',
          dimensions: [
            {
              name: 'x',
              type: 'number'
            },
            {
              name: 'yellowstone',
              type: 'number'
            }
          ]
        }
      ],
      dataset: {
        source: {
          x: temp,
          websocket: stats.websocket.map(x => x.timeDifference),
          yellowstone: stats.yellowstone.map(x => x.timeDifference),
        }
      }
    };
  }
}
