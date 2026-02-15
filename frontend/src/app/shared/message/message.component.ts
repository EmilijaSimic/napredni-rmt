import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'la-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  messages$ = this.messageService.messages$;

  confirmData: { message: string, resolve: (result: boolean) => void } | null = null;

  constructor(private messageService: MessageService) {
    this.messageService.confirmRequest$.subscribe(data => {
      this.confirmData = data;
    });
  }


  dismiss(id: number) {
    this.messageService.dismiss(id);
  }

  onConfirm() {
    this.confirmData?.resolve(true);
    this.confirmData = null;
  }

  onCancel() {
    this.confirmData?.resolve(false);
    this.confirmData = null;
  }

  getIcon(type: string) {
    switch (type) {
      case 'success': return '';
      case 'error': return '';
      case 'warning': return '';
      default: return '';
    }
  }
}
