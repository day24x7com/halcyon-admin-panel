import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardPage),
    data: { title: 'Dashboard', eyebrow: 'Overview' },
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics').then((m) => m.AnalyticsPage),
    data: { title: 'Analytics', eyebrow: 'Insights' },
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders/orders').then((m) => m.OrdersPage),
    data: { title: 'Orders', eyebrow: 'Commerce' },
  },
  {
    path: 'customers',
    loadComponent: () => import('./pages/customers/customers').then((m) => m.CustomersPage),
    data: { title: 'Customers', eyebrow: 'Relationships' },
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then((m) => m.ProductsPage),
    data: { title: 'Products', eyebrow: 'Catalog' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsPage),
    data: { title: 'Settings', eyebrow: 'Workspace' },
  },
  { path: '**', redirectTo: 'dashboard' },
];
