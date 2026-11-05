import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/theme.service';
import { ICONS } from '../../core/icons';
import { Theme } from '../../themes';

interface Toggle {
  key: string;
  label: string;
  hint: string;
  on: boolean;
}

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class SettingsPage {
  private readonly themeSvc = inject(ThemeService);

  readonly icons = ICONS;
  readonly tabs = ['General', 'Appearance', 'Notifications', 'Billing'] as const;
  readonly tab = signal<(typeof this.tabs)[number]>('General');
  readonly saved = signal(false);

  readonly themes = this.themeSvc.themes;
  readonly current = this.themeSvc.current;

  profile = {
    name: 'Julia Kern',
    email: 'julia@halcyon.app',
    company: 'Halcyon Labs',
    timezone: 'Europe/Berlin',
    bio: 'Product lead for the Halcyon workspace. Reachable on Slack.',
  };

  readonly timezones = [
    'Europe/Berlin',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Singapore',
  ];

  readonly toggles: Toggle[] = [
    { key: 'weekly', label: 'Weekly digest', hint: 'A summary of workspace activity every Monday.', on: true },
    { key: 'orders', label: 'New order alerts', hint: 'Notify me when an order is placed or refunded.', on: true },
    { key: 'product', label: 'Product updates', hint: 'Occasional notes on new Halcyon features.', on: false },
    { key: 'security', label: 'Security alerts', hint: 'Sign-ins from new devices and locations.', on: true },
  ];

  selectTheme(t: Theme) {
    this.themeSvc.select(t);
  }

  toggle(key: string) {
    const t = this.toggles.find((x) => x.key === key);
    if (t) t.on = !t.on;
  }

  save() {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2200);
  }
}
