import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  toggle(): void {
    this.updateTheme(!this.isDarkTheme.value);
  }

  updateTheme(isDarkmode: boolean): void {
    this.isDarkTheme.next(isDarkmode);
    const body = document.body;
    if (isDarkmode) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  loadTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      this.isDarkTheme.next(true);
    }
    return this.isDarkTheme.value;
  }
}
