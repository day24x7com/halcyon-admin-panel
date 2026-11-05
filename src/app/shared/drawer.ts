import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICONS } from '../core/icons';

@Component({
  selector: 'app-drawer',
  standalone: true,
  template: `
    @if (open) {
      <div class="dr-scrim" (click)="closed.emit()"></div>
      <aside class="dr" role="dialog" aria-modal="true">
        <header class="dr-head">
          <div>
            <p class="dr-eyebrow">{{ eyebrow }}</p>
            <h2>{{ title }}</h2>
          </div>
          <button class="dr-close" (click)="closed.emit()" aria-label="Close">
            <svg viewBox="0 0 24 24"><path [attr.d]="icons.close" /></svg>
          </button>
        </header>
        <div class="dr-body"><ng-content /></div>
      </aside>
    }
  `,
  styles: [
    `
      .dr-scrim {
        position: fixed; inset: 0; z-index: 60;
        background: rgba(0, 0, 0, 0.45);
        animation: fade 0.2s ease;
      }
      .dr {
        position: fixed; top: 0; right: 0; bottom: 0; z-index: 61;
        width: min(440px, 100vw);
        display: flex; flex-direction: column;
        background: var(--surface);
        border-left: 1px solid var(--border);
        box-shadow: var(--shadow);
        animation: slide 0.24s cubic-bezier(0.3, 0.9, 0.3, 1);
      }
      .dr-head {
        display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
        padding: 20px 20px 16px;
        border-bottom: 1px solid var(--border);
      }
      .dr-eyebrow {
        margin: 0 0 4px; font-size: 10.5px; letter-spacing: 0.12em;
        text-transform: uppercase; color: var(--primary); font-weight: 700;
      }
      .dr-head h2 { margin: 0; font-size: 17px; font-family: var(--heading-font); }
      .dr-close {
        width: 32px; height: 32px; display: grid; place-items: center;
        border-radius: 8px; border: 1px solid var(--border);
        color: var(--text-muted); background: var(--surface);
      }
      .dr-close:hover { color: var(--text); border-color: var(--primary); }
      .dr-close svg { width: 15px; height: 15px; fill: currentColor; }
      .dr-body { padding: 20px; overflow-y: auto; flex: 1; }
      @keyframes fade { from { opacity: 0 } to { opacity: 1 } }
      @keyframes slide { from { transform: translateX(24px); opacity: 0 } to { transform: none; opacity: 1 } }
    `,
  ],
})
export class DrawerComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() eyebrow = 'Details';
  @Output() closed = new EventEmitter<void>();
  readonly icons = ICONS;
}
