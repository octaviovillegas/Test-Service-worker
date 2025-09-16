import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
  serverTimestamp
} from '@angular/fire/firestore';
import { map } from 'rxjs';

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  createdAt: Date | undefined;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly firestore = inject(Firestore);
  private readonly messagesRef = collection(this.firestore, 'chatMessages');
  private readonly orderedMessages = query(this.messagesRef, orderBy('createdAt', 'asc'), limit(200));

  public readonly messages = toSignal(
    collectionData(this.orderedMessages, { idField: 'id' }).pipe(
      map((items) =>
        items.map((item) => ({
          id: item['id'] as string,
          author: (item['author'] as string) ?? 'Anonimo',
          content: (item['content'] as string) ?? '',
          createdAt: this.timestampToDate(item['createdAt'])
        }))
      )
    ),
    { initialValue: [] as ChatMessage[] }
  );

  async sendMessage(payload: Pick<ChatMessage, 'author' | 'content'>): Promise<void> {
    const author = payload.author.trim();
    const content = payload.content.trim();

    if (!author || !content) {
      throw new Error('author and content are required');
    }

    await addDoc(this.messagesRef, {
      author,
      content,
      createdAt: serverTimestamp()
    });
  }

  private timestampToDate(value: unknown): Date | undefined {
    if (!value) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    const timestamp = value as Timestamp & { toDate?: () => Date };

    if (typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }

    return undefined;
  }
}
