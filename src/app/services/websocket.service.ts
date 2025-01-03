import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Token } from '../layout/enums/token';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private hubConnection!: signalR.HubConnection;
  private accessToken = Token;

  // Khởi tạo kết nối SignalR
  public startConnection(hubUrl: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => this.accessToken,
      })
      .withAutomaticReconnect() // Tự động kết nối lại
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) =>
        console.error('Error while starting SignalR connection: ', err)
      );

    // Lắng nghe các sự kiện kết nối
    // Sự kiện đang kết nối lại
    this.hubConnection.onreconnecting((error) => {
      console.log('Reconnecting...', error);
    });

    // Sự kiện kết nối lại thành công
    this.hubConnection.onreconnected((connectionId) => {
      console.log('Reconnected successfully!', connectionId);
    });

    //Sự kiện khi mất kết nối (do server ngắt kết nối, mất kết nối không khắc phục được, client chủ động ngắt kết nối)
    this.hubConnection.onclose((error) => {
      console.error('Connection closed. Trying to reconnect...', error);
      this.startConnection(hubUrl); // Thử kết nối lại khi mất kết nối
    });
  }

  // Lắng nghe sự kiện từ server
  public onServerEvent(eventName: string, callback: (data: any) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on(eventName, callback);
    }
  }

  // Gửi dữ liệu đến server
  public sendMessage(eventName: string, data: any): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke(eventName, data)
        .catch((err) => console.error(err));
    }
  }

  // Ngắt kết nối
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR Disconnected'));
    }
  }
}
