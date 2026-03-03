import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-toast',
  template: `
    <div class="toast-wrapper">
      @for (toast of toasts; track toast.id) {
        <div class="toast {{ toast.type }}">
          <span>{{ icons[toast.type] }}</span>
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toast-wrapper {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .toast {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        border-radius: 8px;
        font-size: 14px;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        min-width: 260px;
        animation: slideIn 0.3s ease;
      }
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .default {
        background: #555;
      }
      .success {
        background: #22c55e;
      }
      .info {
        background: #3b82f6;
      }
      .warning {
        background: #f59e0b;
      }
      .error {
        background: #ef4444;
      }
    `,
  ],
})
export class ToastComponent {
  toasts: { id: number; message: string; type: string }[] = [];
  icons: Record<string, string> = {
    default: 'ℹ️',
    success: '✅',
    info: '💡',
    warning: '⚠️',
    error: '❌',
  };
}
