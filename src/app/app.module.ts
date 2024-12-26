import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { SettingsComponent } from './settings/settings.component';
import { StreamingChatComponent } from './streaming-chat/streaming-chat.component';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    SettingsComponent,
    StreamingChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MarkdownModule.forRoot(),
    HttpClientModule,
    AppLayoutModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
