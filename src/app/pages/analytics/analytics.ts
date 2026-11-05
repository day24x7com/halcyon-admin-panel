import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CHANNELS, DEVICES, PLAN_MIX, REVENUE_TREND, TOP_PAGES } from '../../core/data';
import { ICONS } from '../../core/icons';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class AnalyticsPage {
  readonly icons = ICONS;
  readonly range = signal('30d');
  readonly ranges = ['7d', '30d', '90d', '12m'];

  readonly trend = REVENUE_TREND;
  readonly channels = CHANNELS;
  readonly plans = PLAN_MIX;
  readonly devices = DEVICES;
  readonly pages = TOP_PAGES;

  readonly head = [
    { label: 'Sessions', value: '186,420', delta: 9.4 },
    { label: 'Avg. session', value: '3m 42s', delta: 4.1 },
    { label: 'Bounce rate', value: '36.8%', delta: -2.6 },
    { label: 'Revenue / visitor', value: '$2.59', delta: 7.8 },
  ];

  readonly maxTrend = Math.max(...REVENUE_TREND);

  readonly areaPath = computed(() => {
    const w = 640;
    const h = 200;
    const max = Math.max(...this.trend);
    const min = Math.min(...this.trend);
    const span = max - min || 1;
    return this.trend
      .map((v, i) => {
        const x = (i / (this.trend.length - 1)) * w;
        const y = h - ((v - min) / span) * (h - 16) - 8;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  readonly areaFill = computed(() => `${this.areaPath()} L640,200 L0,200 Z`);

  readonly donut = computed(() => {
    const total = this.channels.reduce((s, c) => s + c.share, 0);
    let offset = 0;
    const circumference = 2 * Math.PI * 56;
    return this.channels.map((c) => {
      const len = (c.share / total) * circumference;
      const seg = { label: c.label, share: c.share, dash: `${len} ${circumference - len}`, offset: -offset };
      offset += len;
      return seg;
    });
  });

  readonly donutColors = ['var(--primary)', 'var(--accent)', 'var(--highlight)', '#7c9cbf', '#b58b64'];

  deltaClass(d: number) {
    return d < 0 ? 'neg' : 'pos';
  }
}
