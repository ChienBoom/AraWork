import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './app.layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
