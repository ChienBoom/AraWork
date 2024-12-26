import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StreamingChatService } from '../services/streaming-chat.service';

@Component({
  selector: 'streaming-chat',
  templateUrl: './streaming-chat.component.html',
  styleUrls: ['./streaming-chat.component.scss'],
  animations: [
    trigger('chatAnimation', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'scale3d(0.8, 0.8, 1)',
          display: 'none', //loại bỏ khỏi layout
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          display: 'block', //thêm vào layout
        })
      ),
      transition(
        'hidden <=> visible',
        animate('200ms cubic-bezier(0, 1.2, 1, 1)')
      ),
    ]),
  ],
})
export class StreamingChatComponent implements OnInit {
  @Input() isHiddenButton = false; //Ẩn button chat
  @Input() showChatFirst = false; //Mở chat khi khởi động ứng dụng
  @Input() isStream = false; //Sử dụng chế độ stream trong request
  @Input() isEnableHistory = true; //Sử dụng lịch sử chat
  @Input() firstQuestion = 'how can you help me';
  @Input() chatTitle = 'Aratech AI'; //Tiêu đề khung chat
  @Input() chatColor = 'rgb(63, 81, 181)'; // Màu cho khung chat
  @Input() textTitleColor = 'white'; // Màu cho title khung chat
  @Input() botImageUrl = 'assets/logo/logo.svg'; // Đường dẫn ảnh cho Bot
  @Input() userImageUrl =
    'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'; // Đường dẫn ảnh cho User
  @Input() botChatBackgroundColor = 'rgb(247, 248, 255)'; // Màu background của Bot
  @Input() userChatBackgroundColor = 'rgb(63, 81, 181)'; // Màu background của user
  @Input() botChatTextColor = 'rgb(48, 50, 53)'; // Màu text của Bot
  @Input() userChatTextColor = 'rgb(255, 255, 255)'; // Màu text của user
  @Input() botGreeting = 'Hello! How can Aratech help you?'; // Lời chào của Bot
  @Input() placeholderInput = 'Type your question'; // placeholder của phần searchInput
  @Input() heightFrame = '550px'; // Chiều cao khung chat(Tính theo px hoặc %)
  @Input() widthFrame = '400px'; // Chiều rộng khung chat(Tính theo px hoặc %)
  @Input() buttonImageUrl = 'assets/logo/logo.svg'; // Đường dẫn icon của button
  @Input() borderRadius = '6px'; // bo viền cho khung chat
  @Input() chatImageUrl = 'assets/logo/logo.svg'; //Đường dẫn ảnh Chat
  @Input() chatPowerBy = 'Aratech VN'; //Được xây dựng bởi
  @Input() originUrlConfig = 'https://flow.ai.aratech.vn'; //Cấu hình origin request url
  @Input() sessionId = 'd5be43de-921c-4f65-8845-175af3cb82d3'; //Cấu hình sessionid request url
  @Input() xApiKeyConfig = 'sk-lrw7K_D340w_fPItbtSPitqDgrLWcKHHciLlzFx2JR0'; //Cấu hình xapikey request url
  showChatFrame = false;
  chats: any[] = [];
  requestString = '';
  currentResponseChat = '';
  answers: any[] = [];
  isRenderResponse = false;
  isAutoScroll = true;
  isDisableSend = false;
  isStopRequest = false;
  isCompleteRequest = true;
  requestOrigin = 'https://langflow.hientd.vn';
  midUrl = '/api/v1/run/';
  tweaks: any = {};

  private subscription: Subscription | undefined;
  private subscriptionStream: Subscription | undefined;

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  constructor(
    private streamingChatService: StreamingChatService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.isEnableHistory) {
      this.chats = localStorage.getItem('ChatHistory')
        ? JSON.parse(localStorage.getItem('ChatHistory')!)
        : [];
    }
    this.requestOrigin = this.originUrlConfig;
    this.showChatFrame = this.showChatFirst;
    if (this.chats.length === 0 && this.firstQuestion.trim() != '') {
      this.isStopRequest = false;
      this.isRenderResponse = true;
      this.isDisableSend = true;
      this.isCompleteRequest = false;
      this.chats.push({
        question: this.firstQuestion,
        text: '',
        responseLoading: true,
      });
      this.isAutoScroll = true;

      setTimeout(() => this.scrollToBottom(), 0);
      this.fetch(this.firstQuestion);
      this.requestString = '';
    }
  }

  handleShowChat() {
    this.showChatFrame = !this.showChatFrame;
    if (this.showChatFrame) {
      setTimeout(() => document.getElementById('chat-input')!.focus(), 0);
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  handleResetChat() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      if (this.subscriptionStream) this.subscriptionStream.unsubscribe();
    }
    this.chats = [];
    if (this.isEnableHistory) localStorage.removeItem('ChatHistory');
    if (this.firstQuestion.trim() != '') {
      this.isStopRequest = false;
      this.isRenderResponse = true;
      this.isDisableSend = true;
      this.isCompleteRequest = false;
      this.chats.push({
        question: this.firstQuestion,
        text: '',
        responseLoading: true,
      });
      this.isAutoScroll = true;

      setTimeout(() => this.scrollToBottom(), 0);
      this.fetch(this.firstQuestion);
      this.requestString = '';
    }
  }

  async hanldeSend() {
    if (this.isDisableSend) {
      this.isStopRequest = true;
      if (this.subscription) {
        this.subscription.unsubscribe();
        if (!this.isCompleteRequest) {
          this.isCompleteRequest = true;
          this.chats.pop();
        }
        if (this.subscriptionStream) this.subscriptionStream.unsubscribe();
        if (this.isStream && this.currentResponseChat == '') {
          this.isCompleteRequest = true;
          this.chats.pop();
        }
      }
      this.isDisableSend = false;
      return;
    }
    this.isStopRequest = false;
    this.isRenderResponse = true;
    this.isDisableSend = true;
    this.isCompleteRequest = false;
    this.chats.push({
      question: this.requestString.trim(),
      text: '',
      responseLoading: true,
    });
    this.isAutoScroll = true;

    setTimeout(() => this.scrollToBottom(), 0);
    this.fetch(this.requestString.trim());
    this.requestString = '';
  }

  fetch(question: string) {
    if (this.isStream) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.xApiKeyConfig,
      });
      this.subscription = this.http
        .post(
          `${this.originUrlConfig}${this.midUrl}${this.sessionId}?stream=${this.isStream}`,
          {
            input_value: question,
            output_type: 'chat',
            input_type: 'chat',
            tweaks: this.tweaks,
          },
          { headers: headers }
        )
        .subscribe(
          (rs: any) => {
            const streamRequest = `${this.requestOrigin}${rs.outputs[0].outputs[0].artifacts.stream_url}`;
            this.subscriptionStream = this.streamingChatService
              .getDataSteam(streamRequest)
              .subscribe({
                next: (res: any) => {
                  res.split('\n').forEach((line: any) => {
                    if (line.trim()) {
                      if (line.startsWith('event')) {
                        if (line.endsWith('close')) return;
                      } else {
                        const stringData = line.replace('data: ', '');
                        try {
                          const data = JSON.parse(stringData);
                          if (
                            data?.chunk.trim() &&
                            data?.chunk.trim().length > 0
                          ) {
                            this.answers.push(data.chunk);
                            if (this.answers.length == 1) this.typeEffect();
                          }
                        } catch (er) {
                          // console.log(er)
                        }
                      }
                    }
                  });
                },
                error: (error: any) => {
                  console.error(error);
                  this.answers.push('Sorry! Server Error');
                  this.typeEffect();
                  setTimeout(() => this.scrollToBottom(), 0);
                },
                complete: () => {
                  console.log('complete stream');
                  // this.isCompleteRequest = true;
                },
              });
          },
          (error: any) => {
            console.error(error);
            this.answers.push('Sorry! Server Error');
            this.typeEffect();
            setTimeout(() => this.scrollToBottom(), 0);
          },
          () => {
            console.log('complete');
            this.isCompleteRequest = true;
          }
        );
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': this.xApiKeyConfig,
      });
      this.subscription = this.http
        .post(
          `https://localhost:7228/chat-api/chat/chat`,
          'bạn có biết về ngôh ngữ python không',
          { headers: headers }
        )
        .subscribe(
          (rs: any) => {
            console.log("rs", rs)
            console.log('text: ', rs.candidates[0].content.parts[0].text);
            this.answers.push(rs.candidates[0].content.parts[0].text);
            // this.answers.push(rs.outputs[0].outputs[0].messages[0].message);
            this.typeEffect();
          },
          (error) => {
            console.error(error);
            this.answers.push('Sorry! Server Error');
            this.typeEffect();
            setTimeout(() => this.scrollToBottom(), 0);
          },
          () => {
            console.log('complete');
            this.isCompleteRequest = true;
          }
        );
    }
  }

  typeEffect() {
    this.isRenderResponse = false;
    if (this.answers.length === 0) {
      return;
    }
    let index = 0;
    const typing = () => {
      if (this.isStopRequest) {
        this.isDisableSend = false;
        this.isStopRequest = false;
        this.saveCurrentChat();
        return;
      }
      if (this.answers.length > 0 && index < this.answers[0].length) {
        this.currentResponseChat += this.answers[0][index];
        index++;
        setTimeout(() => this.scrollToBottom(), 0);
        requestAnimationFrame(typing);
      } else {
        this.answers.shift();
        index = 0;
        if (this.answers.length === 0) {
          this.saveCurrentChat();
        } else {
          setTimeout(() => this.scrollToBottom(), 0);
          requestAnimationFrame(typing);
        }
      }
    };

    requestAnimationFrame(typing);
  }

  saveCurrentChat() {
    const question = this.chats[this.chats.length - 1]?.question;
    this.chats.pop();
    this.chats.push({
      question: question,
      text: this.currentResponseChat,
      responseLoading: false,
    });
    if (this.isEnableHistory) {
      localStorage.setItem('ChatHistory', JSON.stringify(this.chats));
    }
    this.currentResponseChat = '';
    this.isDisableSend = false;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  handleScroll(event: any) {
    if (
      Math.abs(
        event.target.scrollHeight -
          event.target.scrollTop -
          event.target.clientHeight
      ) < 1
    ) {
      this.isAutoScroll = true;
      return;
    }
    this.isAutoScroll = false;
  }

  handleKeydDownChat(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!this.isDisableSend) this.hanldeSend();
    }
  }

  scrollToBottom() {
    if (!this.isAutoScroll) return;
    const crollHeight = this.chatMessages.nativeElement.scrollHeight;
    this.chatMessages.nativeElement.scrollTop = crollHeight;
  }
}
