import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTS, Product } from '../../core/data';
import { ICONS } from '../../core/icons';
import { PillComponent } from '../../shared/pill';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, PillComponent],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsPage {
  readonly icons = ICONS;
  readonly query = signal('');
  readonly category = signal('All');

  readonly categories = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.category();
    return PRODUCTS.filter(
      (p) =>
        (cat === 'All' || p.category === cat) &&
        (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
    );
  });

  readonly summary = computed(() => {
    const inventoryValue = PRODUCTS.reduce((s, p) => s + p.price * p.stock, 0);
    const outOfStock = PRODUCTS.filter((p) => p.stock === 0).length;
    const low = PRODUCTS.filter((p) => p.stock > 0 && p.stock < 20).length;
    return [
      { label: 'Catalog size', value: String(PRODUCTS.length) },
      { label: 'Inventory value', value: '$' + inventoryValue.toLocaleString('en-US') },
      { label: 'Low stock', value: String(low) },
      { label: 'Out of stock', value: String(outOfStock) },
    ];
  });

  stockTone(p: Product) {
    if (p.stock === 0) return 'bad';
    return p.stock < 20 ? 'warn' : 'good';
  }

  stockLabel(p: Product) {
    if (p.stock === 0) return 'Out of stock';
    return p.stock < 20 ? 'Low stock' : 'In stock';
  }

  money(n: number) {
    return '$' + n.toLocaleString('en-US');
  }
}
