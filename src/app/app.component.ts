import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionStatsServiceService } from './service/transaction-stats-service.service';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Observable, tap } from 'rxjs';
import { TransactionStats } from './interface/transaction-stats';
import { EChartsOption } from 'echarts';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxEchartsDirective, AsyncPipe, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideEcharts()]
})
export class AppComponent implements OnInit {
  eChartContainer = viewChild.required<ElementRef<HTMLDivElement>>('container');

  transactionStats$: Observable<TransactionStats>

  eChartOpt1?: EChartsOption;
  eChartOpt2?: EChartsOption;

  width: number = 1500;

  constructor(private transactionStatsService: TransactionStatsServiceService) {
    this.transactionStats$ = this.transactionStatsService.transactionsStats$()
      .pipe(tap(x => this.setEChartOpt(x)));
  }

  ngOnInit(): void {

  }

  public onSavePdf(format: string): void {
    const canvas = this.eChartContainer().nativeElement.children[0].children[0] as HTMLCanvasElement;

    console.log(canvas.toDataURL('image/png', 'png'));
    const pdf = new jsPDF('l', 'mm', format);

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(canvas, 0, 0, pageWidth, pageHeight);
    pdf.save(`test-${format}.pdf`)
  }

  private setEChartOpt(response: TransactionStats): void {
    const temp: number[] = []
    for (let i = 0; i < response.n; ++i) {
      temp.push(i);
    }

    this.eChartOpt1 = {
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
        width: this.width,
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
          name: "websocket",
          type: 'line',
          showSymbol: false,
          color: '#8100ff',
          dimensions: [
            {
              name: "x",
              type: "number"
            },
            {
              name: "websocket",
              type: "number"
            }
          ]
        },
        {
          name: "yellowstone",
          type: 'line',
          showSymbol: false,
          color: '#05ed26',
          dimensions: [
            {
              name: "x",
              type: "number"
            },
            {
              name: "yellowstone",
              type: "number"
            }
          ]
        }
      ],
      dataset: {
        source: {
          x: temp,
          websocket: response.transactionInfosWebsocket.map(x => x.timeDifference),
          yellowstone: response.transactionInfosYellowstone.map(x => x.timeDifference)
        }
      }
    };

    this.eChartOpt2 = {
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
        width: this.width,
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
          name: "difference",
          type: 'line',
          showSymbol: false,
          color: '#8100ff',
          dimensions: [
            {
              name: "x",
              type: "number"
            },
            {
              name: "y",
              type: "number"
            }
          ]
        }
      ],
      dataset: {
        source: {
          x: temp,
          y: response.transactionInfos.map(x => x.timeDifference)
        }
      }
    };
  }
}
