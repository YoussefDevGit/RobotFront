import { Component, OnInit } from '@angular/core';
import { Menu, menuList } from '../../data/menus';

@Component({
  selector: 'll-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navList: Menu[] = [];
  constructor() { }

  ngOnInit(): void {
    this.navList = menuList;
  }

}
