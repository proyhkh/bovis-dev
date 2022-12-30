import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {

  _accesos = [];
  get accesos(): any {
    return this._accesos;
  }
  @Input() set accesos(value: any) {
    console.log(value);
    if(value){
      this._accesos = value;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
