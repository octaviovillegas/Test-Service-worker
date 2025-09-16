import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage, ChatService } from '../../servicios/chat.service';

@Component({
  selector: 'UTNFRA-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent {
  private readonly chatService = inject(ChatService);

  public readonly alias = signal('');
  public readonly message = signal('');
  public readonly error = signal<string | null>(null);
  public readonly sending = signal(false);

  public readonly messages = this.chatService.messages;
  public readonly canSend = computed(() => {
    return this.alias().trim().length > 0 && this.message().trim().length > 0 && !this.sending();
  });

  async sendMessage(): Promise<void> {
    const author = this.alias().trim();
    const content = this.message().trim();

    if (!author || !content) {
      this.error.set('Debes completar tu alias y un mensaje.');
      return;
    }

    this.sending.set(true);
    this.error.set(null);

    try {
      await this.chatService.sendMessage({ author, content });
      this.message.set('');
    } catch (err) {
      console.error('Error al enviar el mensaje', err);
      this.error.set('No pudimos enviar tu mensaje. Intenta nuevamente.');
    } finally {
      this.sending.set(false);
    }
  }

  trackByMessageId(index: number, item: ChatMessage): string {
    return item.id;
  }
}
