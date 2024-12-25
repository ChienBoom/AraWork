import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(false); // Mặc định là đóng
  isOpen$ = this.isOpen.asObservable(); // Observable để các component lắng nghe

  toggle(): void {
    this.updateIsOpen(!this.isOpen.value);
  }

  updateIsOpen(isOpen: boolean): void {
    this.isOpen.next(isOpen);
    if (isOpen) {
      localStorage.setItem('sidebar', 'open');
    } else {
      localStorage.setItem('sidebar', 'close');
    }
  }

  loadOpenSidebar(): boolean {
    const savedSidebar = localStorage.getItem('sidebar');
    if (savedSidebar === 'open') {
      this.isOpen.next(true);
    }
    return this.isOpen.value;
  }
}
