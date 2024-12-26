import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Schemes, Themes } from '../layout/enums/settings';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('settingAnimation', [
      state(
        'setting-hidden',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
          display: 'none', //loại bỏ khỏi layout
        })
      ),
      state(
        'setting-visible',
        style({
          opacity: 1,
          transform: 'translateX(0)',
          display: 'block', //thêm vào layout
        })
      ),
      transition('setting-hidden => setting-visible', [
        style({ display: 'block' }), // Đảm bảo phần tử nằm trong layout trước khi animation chạy
        animate(
          '300ms cubic-bezier(0.4, 0.0, 0.2, 1)' // Hiệu ứng smooth
        ),
      ]),
      transition('setting-visible => setting-hidden', [
        animate(
          '300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            opacity: 0,
            transform: 'translateX(100%)', // Kéo phần tử mờ dần về bên trái
          })
        ),
      ]),
    ]),
  ],
})
export class SettingsComponent implements OnInit {
  settings: any = {};
  themes = Themes;
  schemes = Schemes;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settings = this.settingsService.loadSettings();
    const body = document.body;
    const scheme = this.settings?.scheme ?? 'light';
    if (scheme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
    const theme = this.settings?.theme ?? 'rgb(192 132 252)';
    this.settings.theme = theme;
    document.documentElement.style.setProperty('--app-color', theme);
    this.settingsService.updateSettings(this.settings);
  }

  handleDrawer() {
    this.settings.setting = !this.settings.setting;
    this.settingsService.updateSettings(this.settings);
  }

  handleTheme(theme: string) {
    this.settings.theme = theme;
    document.documentElement.style.setProperty('--app-color', theme);
    this.settingsService.updateSettings(this.settings);
  }

  handleScheme(scheme: string) {
    const body = document.body;
    this.settings.scheme = scheme;
    if (scheme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
    this.settingsService.updateSettings(this.settings);
  }
}
