import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOMERS, Customer } from '../../core/data';
import { ICONS } from '../../core/icons';
import { PillComponent } from '../../shared/pill';
import { DrawerComponent } from '../../shared/drawer';

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [CommonModule, PillComponent, DrawerComponent],
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class CustomersPage {
  readonly icons = ICONS;
  readonly query = signal('');
  readonly plan = signal<'All' | 'Enterprise' | 'Growth' | 'Starter'>('All');
  readonly plans = ['All', 'Enterprise', 'Growth', 'Starter'] as const;
  readonly selected = signal<Customer | null>(null);

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const p = this.plan();
    return CUSTOMERS.filter(
      (c) =>
        (p === 'All' || c.plan === p) &&
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q)),
    );
  });

  readonly stats = computed(() => {
    const total = CUSTOMERS.length;
    const active = CUSTOMERS.filter((c) => c.status === 'Active').length;
    const ltv = CUSTOMERS.reduce((s, c) => s + c.spend, 0);
    const orders = CUSTOMERS.reduce((s, c) => s + c.orders, 0);
    return [
      { label: 'Total customers', value: String(total) },
      { label: 'Active', value: String(active) },
      { label: 'Lifetime value', value: '$' + ltv.toLocaleString('en-US') },
      { label: 'Avg. orders', value: (orders / total).toFixed(1) },
    ];
  });

  setQuery(v: string) {
    this.query.set(v);
  }

  tone(status: string) {
    return status === 'Active' ? 'good' : status === 'Trial' ? 'warn' : 'bad';
  }

  money(n: number) {
    return '$' + n.toLocaleString('en-US');
  }

  initials(name: string) {
    return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  }
}
