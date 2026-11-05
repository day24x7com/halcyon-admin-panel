import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from './core/theme.service';
import { ICONS, IconName } from './core/icons';
import { Theme } from './themes';

interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  badge?: string;
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'orders', label: 'Orders', icon: 'orders', badge: '28' },
  { id: 'customers', label: 'Customers', icon: 'customers' },
  { id: 'products', label: 'Products', icon: 'products' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeSvc = inject(ThemeService);
  private readonly router = inject(Router);

  readonly icons = ICONS;
  readonly nav = NAV;
  readonly pickerOpen = signal(false);
  readonly sidebarOpen = signal(false);
  readonly search = signal('');

  readonly vars = this.themeSvc.vars;
  readonly theme = this.themeSvc.current;
  readonly themes = this.themeSvc.themes;

  readonly pageTitle = signal('Dashboard');
  readonly pageEyebrow = signal('Overview');

  readonly results = computed(() => {
    const q = this.search().trim().toLowerCase();
    if (!q) return [];
    return NAV.filter((n) => n.label.toLowerCase().includes(q)).slice(0, 5);
  });

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        this.pageTitle.set(route.data['title'] ?? 'Dashboard');
        this.pageEyebrow.set(route.data['eyebrow'] ?? 'Overview');
        this.sidebarOpen.set(false);
      });
  }

  selectTheme(t: Theme) {
    this.themeSvc.select(t);
    this.pickerOpen.set(false);
  }

  closePicker() {
    this.pickerOpen.set(false);
  }

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }
}
