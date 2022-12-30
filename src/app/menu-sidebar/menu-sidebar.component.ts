import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {

  rol: string;
  _accesos = [];
  get accesos(): any {
    return this._accesos;
  }
  @Input() set accesos(value: any) {
    console.log(value);
    if (value) {
      this._accesos = value;
      this.rol = value[0].split('.')[0];
      console.log(this.rol);

    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
