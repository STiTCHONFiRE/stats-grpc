import { Routes } from '@angular/router';
import { AllStatsComponent } from './component/all-stats/all-stats.component';
import { YellowstoneStatsComponent } from './component/yellowstone-stats/yellowstone-stats.component';
import { WebsocketStatsComponent } from './component/websocket-stats/websocket-stats.component';
import { TokenBuyInfoComponent } from './component/token-buy-info/token-buy-info.component';

export const routes: Routes = [
  {
    path: '',
    component: AllStatsComponent,
  },
  {
    path: 'yellowstone',
    component: YellowstoneStatsComponent,
  },
  {
    path: 'websocket',
    component: WebsocketStatsComponent,
  },
  {
    path: 'tokens',
    component: TokenBuyInfoComponent
  }
];
