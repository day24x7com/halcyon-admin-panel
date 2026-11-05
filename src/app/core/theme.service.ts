import { Injectable, computed, signal } from '@angular/core';
import { THEMES, Theme, themeVars } from '../themes';

const STORAGE_KEY = 'halcyon.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes = THEMES;
  private readonly id = signal(this.restore());
  readonly current = computed<Theme>(() => this.themes.find((t) => t.id === this.id()) ?? this.themes[0]);
  readonly vars = computed(() => themeVars(this.current()));

  select(theme: Theme) {
    this.id.set(theme.id);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      /* private mode: theme simply won't persist */
    }
  }

  private restore(): string {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) return saved;
    } catch {
      /* ignore */
    }
    return THEMES[0].id;
  }
}
