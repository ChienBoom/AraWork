import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Menus } from '../enums/menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isOpenSidebar: boolean = false;
  menus = Menus;
  constructor(public sidebarService: SidebarService) {}
  ngOnInit(): void {
    this.isOpenSidebar = this.sidebarService.loadOpenSidebar();
    this.sidebarService.isOpen$.subscribe((state) => {
      this.isOpenSidebar = state;
    });
  }
}
