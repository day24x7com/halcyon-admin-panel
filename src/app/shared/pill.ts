import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  template: `<span class="pill" [attr.data-tone]="tone">{{ label }}</span>`,
  styles: [
    `
      .pill {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
      }
      .pill[data-tone='good'] { color: #1b7f4b; background: rgba(27, 127, 75, 0.14); }
      .pill[data-tone='warn'] { color: #b06b00; background: rgba(176, 107, 0, 0.14); }
      .pill[data-tone='bad'] { color: #b03a2e; background: rgba(176, 58, 46, 0.14); }
      .pill[data-tone='info'] { color: var(--primary); background: color-mix(in srgb, var(--primary) 15%, transparent); }
      .pill[data-tone='neutral'] { color: var(--text-muted); background: var(--surface-alt); }
    `,
  ],
})
export class PillComponent {
  @Input() label = '';
  @Input() tone: 'good' | 'warn' | 'bad' | 'info' | 'neutral' = 'neutral';
}
