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
      return;
    }
    this.webSocket = new WebSocket('ws://localhost:8080');

    this.webSocket.onopen = (event) => {
    };

    this.webSocket.onmessage = (event) => {
      this.messages.push(event.data);
      var changes = JSON.parse(event.data)
      if (changes.userId) {
        this.adminListener.next(changes)
      }else {
        this.notifyListener.next(changes)
      }
      // }
    };

    this.webSocket.onclose = (event) => {
    };

    this.webSocket.onerror = (error) => {
   
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
