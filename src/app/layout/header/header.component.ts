import { Component, OnInit } from '@angular/core';
import { Languages } from '../enums/languages';
import { ThemeService } from 'src/app/services/theme.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages = Languages;
  language: string = 'vi';
  isDarkmode: boolean = false;
  isOpenSidebar: boolean = false;
  constructor(
    public themeService: ThemeService,
    public sidebarService: SidebarService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.language);
    this.language = localStorage.getItem('lang') || this.language;
    this.translate.use(this.language);
  }

  ngOnInit(): void {
    this.isDarkmode = this.themeService.loadTheme();
  }

  handleChangeSidebar() {
    this.sidebarService.toggle();
  }

  handleChangeMode(event: any) {
    this.isDarkmode = event.checked;
    this.themeService.updateTheme(event.checked);
  }

  handleChangeLanguage(event: any){
    console.log('lang: ', event.value)
    this.language = event.value;
    this.translate.use(event.value);
    localStorage.setItem('lang', event.value);
  }

  // handleTheme() {
  //   const primary = '#42b0f5';
  //   document.documentElement.style.setProperty('--app-primary', primary);
  //   this.themeService.toggle();
  // }
}
