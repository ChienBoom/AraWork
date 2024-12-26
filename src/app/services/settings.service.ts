import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settingconfig = new BehaviorSubject<any>({
    sidebar: false,
    scheme: 'dark',
    theme: 'primary',
    setting: false,
    language: 'vi',
  });
  settingconfig$ = this.settingconfig.asObservable();

  getSettings(): any {
    return this.settingconfig.value;
  }

  updateSettings(settings: any): void {
    this.settingconfig.next(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  loadSettings(): any {
    const savedSettings = localStorage.getItem('settings')
      ? JSON.parse(localStorage.getItem('settings')!)
      : {};
    this.settingconfig.next(savedSettings);
    return this.settingconfig.value;
  }
}
