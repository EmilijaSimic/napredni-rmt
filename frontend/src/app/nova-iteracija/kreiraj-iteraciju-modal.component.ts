import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'la-kreiraj-iteraciju-modal',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="modal-header">
      <h4>Kreiraj novu iteraciju</h4>
      <button class="close-btn" (click)="cancel()">✕</button>
    </div>

    <div class="modal-body">
      <div class="icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
        </svg>
      </div>
      <p class="message">
        Da li ste sigurni da želite da kreirate iteraciju<br>
        <strong>{{ data.novaGodina }}</strong> za projekat <strong>{{ data.displayNaziv }}</strong>?
      </p>
    </div>

    <div class="modal-actions">
      <button class="cancel-btn" (click)="cancel()">Otkaži</button>
      <button class="confirm-btn" (click)="confirm()">Da, kreiraj</button>
    </div>
  `,
  styles: [`
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px 0;

      h4 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--text);
      }
    }

    .close-btn {
      border: none;
      background: none;
      font-size: 18px;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color 0.15s, background 0.15s;

      &:hover {
        color: var(--text);
        background: var(--surface-2);
      }
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 28px 32px 20px;
      text-align: center;
    }

    .icon-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: var(--primary-light);
      color: var(--primary);

      svg {
        width: 28px;
        height: 28px;
      }
    }

    .message {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-secondary);

      strong {
        color: var(--text);
        font-weight: 600;
      }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 0 24px 20px;
    }

    .cancel-btn {
      padding: 9px 20px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      background: transparent;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s;

      &:hover {
        border-color: #94a3b8;
        color: var(--text);
      }
    }

    .confirm-btn {
      padding: 9px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      background: var(--primary);
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s;

      &:hover {
        background: var(--primary-hover);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
      }
    }
  `],
})
export class KreirajIteracijuModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { displayNaziv: string; novaGodina: number },
    private dialogRef: MatDialogRef<KreirajIteracijuModalComponent>,
  ) {}

  confirm(): void { this.dialogRef.close(true); }
  cancel(): void  { this.dialogRef.close(false); }
}
