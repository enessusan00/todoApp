import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: WebSocket | null = null;
  public messages: string[] = [];
  private adminListener: Subject<any> = new Subject();
  private notifyListener: Subject<any> = new Subject();
  constructor() { }

  public openWebSocket() {
    if (this.webSocket && this.webSocket.readyState !== WebSocket.CLOSED) {
      console.log('WebSocket zaten açık.');
      return;
    }
    this.webSocket = new WebSocket('ws://localhost:8080');

    this.webSocket.onopen = (event) => {
      console.log('WebSocket bağlantısı açıldı');
    };

    this.webSocket.onmessage = (event) => {
      // if (event.data instanceof Blob) {
      //   const reader = new FileReader();
      //   reader.onload = () => {
      //     const message = reader.result as string | any;

      //     this.messages.push(message);
      //   };
      //   reader.readAsText(event.data);
      //   console.log('Sunucudan mesaj alındı:', this.messages);
      // } else {
      this.messages.push(event.data);
      var changes = JSON.parse(event.data)
      if (changes.userId) {
        this.adminListener.next(changes)
      }else {
        this.notifyListener.next(changes)
      }

      console.log('Sunucudan mesaj alındı:', event.data);
      // }
    };

    this.webSocket.onclose = (event) => {
      console.log('WebSocket bağlantısı kapandı', event);
    };

    this.webSocket.onerror = (error) => {
      console.error('WebSocket hatası', error);
    };
  }
  public getUpdates(component: string): Observable<any> {
    if (component == 'admin') {
      return this.adminListener.asObservable();
    }
    return this.notifyListener.asObservable();
  }
  public sendMessage(message: string) {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {

      this.webSocket.send(message);
    } else {
      console.error('WebSocket bağlantısı açık değil');
    }
  }

  public closeWebSocket() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }
}
