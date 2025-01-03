import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from '../enums/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages = Languages;
  settings: any = {};
  constructor(
    private translate: TranslateService,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.loadSettings();
    const language = this.settings?.language ?? 'vi';
    this.settings.language = language;
    this.settingsService.updateSettings(this.settings);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }

  ngOnInit(): void {
    const sidebar = this.settings?.sidebar ?? false;
    this.settings.sidebar = sidebar;
    this.settingsService.updateSettings(this.settings);
  }

  handleChangeSidebar() {
    this.settings.sidebar = !this.settings.sidebar;
    this.settingsService.updateSettings(this.settings);
  }

  handleChangeLanguage(event: any) {
    this.settings.language = event.value;
    this.translate.use(event.value);
    this.settingsService.updateSettings(this.settings);
  }
}
