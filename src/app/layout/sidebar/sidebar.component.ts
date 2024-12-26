import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Menus } from '../enums/menus';
import { SettingsService } from 'src/app/services/settings.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  path: string = '';
  settings: any = {};
  menus = Menus;

  constructor(
    public sidebarService: SidebarService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.loadSettings();
    this.settingsService.settingconfig$.subscribe((state) => {
      this.settings = state;
    });
    this.path = this.router.url;
  }

  handleRouter(path: string) {
    this.router.navigate([`/${path}`]);
    this.path = path;
  }
}
