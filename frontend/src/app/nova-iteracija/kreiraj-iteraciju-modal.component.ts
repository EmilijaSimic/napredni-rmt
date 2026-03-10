import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'la-kreiraj-iteraciju-modal',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <div class="modal-wrap">
      <div class="icon-ring">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
      </div>

      <div class="text">
        <h4>Nova iteracija</h4>
        <p>Pokrenuće se iteracija <strong>{{ data.novaGodina }}</strong> za projekat <strong>{{ data.displayNaziv }}</strong>.</p>
      </div>

      <div class="actions">
        <button class="cancel-btn" (click)="cancel()">Otkaži</button>
        <button class="confirm-btn" (click)="confirm()">Pokreni</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-wrap {
      padding: 40px 32px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
      min-width: 400px;
    }

    .icon-ring {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--primary-light);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 8px color-mix(in srgb, var(--primary) 8%, transparent);

      svg { width: 28px; height: 28px; }
    }

    .text {
      display: flex;
      flex-direction: column;
      gap: 8px;

      h4 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        color: var(--text);
        letter-spacing: -0.3px;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: var(--text-muted);
        line-height: 1.6;
        max-width: 280px;

        strong {
          color: var(--text);
          font-weight: 600;
        }
      }
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 4px;
      width: 100%;

      button { flex: 1; }
    }

    .cancel-btn {
      padding: 11px 0;
      border: 1px solid var(--border);
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      background: transparent;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;

      &:hover {
        background: var(--surface-2);
        color: var(--text);
      }
    }

    .confirm-btn {
      padding: 11px 0;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: var(--primary);
      cursor: pointer;
      transition: background 0.15s, box-shadow 0.15s;

      &:hover {
        background: var(--primary-hover);
        box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
      }
    }
  `],
})
export class KreirajIteracijuModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { displayNaziv: string; trenutnaGodina: number; novaGodina: number },
    private dialogRef: MatDialogRef<KreirajIteracijuModalComponent>,
  ) {}

  confirm(): void { this.dialogRef.close(true); }
  cancel(): void  { this.dialogRef.close(false); }
}
