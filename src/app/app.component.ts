import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  messages: string[] = [];

  constructor(private websocketService: WebSocketService) {}

  ngOnInit(): void {
    const hubUrl = 'https://localhost:4228/messageHub';
    // const hubUrl = 'https://localhost:4001/websocket-gateway/messageHub';

    // this.websocketService.startConnection(hubUrl);

    // this.websocketService.onServerEvent(
    //   'RequireClientName',
    //   (message: string) => {
    //     console.log('message: ', message);
    //     this.confirmClientId(message);
    //   }
    // );
  }

  confirmClientId(connectionId: string){
    this.websocketService.sendMessage('ConfirmClientName', {
      ConnectionId: connectionId,
      Name: 'AraWork'
    });
  }
}
