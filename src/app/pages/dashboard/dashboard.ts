import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTIVITY, CHANNELS, KPIS, ORDERS, TRAFFIC } from '../../core/data';
import { ICONS } from '../../core/icons';
import { PillComponent } from '../../shared/pill';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PillComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardPage {
  readonly icons = ICONS;
  readonly kpis = KPIS;
  readonly orders = ORDERS.slice(0, 6);
  readonly activity = ACTIVITY;
  readonly channels = CHANNELS;
  readonly traffic = TRAFFIC;
  readonly maxTraffic = Math.max(...TRAFFIC.flatMap((t) => [t.a, t.b]));
  readonly range = signal('7d');
  readonly ranges = ['24h', '7d', '30d', '90d'];

  readonly totalSessions = computed(() => this.traffic.reduce((s, t) => s + t.a, 0));

  tone(status: string) {
    return status === 'Paid' ? 'good' : status === 'Pending' ? 'warn' : status === 'Refunded' ? 'bad' : 'neutral';
  }

  money(n: number) {
    return '$' + n.toLocaleString('en-US');
  }

  linePath(values: number[], w: number, h: number) {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = max - min || 1;
    return values
      .map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / span) * (h - 4) - 2;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }
}
