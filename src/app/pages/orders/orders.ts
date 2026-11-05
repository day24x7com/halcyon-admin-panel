import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ORDERS, Order, OrderStatus } from '../../core/data';
import { ICONS } from '../../core/icons';
import { PillComponent } from '../../shared/pill';
import { DrawerComponent } from '../../shared/drawer';

type SortKey = 'id' | 'customer' | 'amount' | 'status' | 'date';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PillComponent, DrawerComponent],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class OrdersPage {
  readonly icons = ICONS;
  readonly statuses: (OrderStatus | 'All')[] = ['All', 'Paid', 'Pending', 'Refunded', 'Failed'];

  readonly query = signal('');
  readonly status = signal<OrderStatus | 'All'>('All');
  readonly sortKey = signal<SortKey>('id');
  readonly sortDir = signal<'asc' | 'desc'>('desc');
  readonly page = signal(1);
  readonly pageSize = 8;

  readonly selected = signal<Order | null>(null);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const st = this.status();
    const key = this.sortKey();
    const dir = this.sortDir() === 'asc' ? 1 : -1;

    return ORDERS.filter((o) => {
      const matchesQuery =
        !q ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.plan.toLowerCase().includes(q);
      const matchesStatus = st === 'All' || o.status === st;
      return matchesQuery && matchesStatus;
    }).sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  });

  readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  readonly paged = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  readonly counts = computed(() => {
    const base: Record<string, number> = { All: ORDERS.length, Paid: 0, Pending: 0, Refunded: 0, Failed: 0 };
    for (const o of ORDERS) base[o.status]++;
    return base;
  });

  setQuery(v: string) {
    this.query.set(v);
    this.page.set(1);
  }

  setStatus(s: OrderStatus | 'All') {
    this.status.set(s);
    this.page.set(1);
  }

  sortBy(key: SortKey) {
    if (this.sortKey() === key) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  go(p: number) {
    this.page.set(Math.min(Math.max(1, p), this.pages()));
  }

  tone(status: string) {
    return status === 'Paid' ? 'good' : status === 'Pending' ? 'warn' : status === 'Refunded' ? 'bad' : 'neutral';
  }

  money(n: number) {
    return '$' + n.toLocaleString('en-US');
  }

  rangeLabel() {
    const total = this.filtered().length;
    if (!total) return 'No results';
    const start = (this.page() - 1) * this.pageSize + 1;
    const end = Math.min(this.page() * this.pageSize, total);
    return `${start}–${end} of ${total}`;
  }
}
