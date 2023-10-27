import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpcionSubMenu, RolPermiso, RolesResponse } from '../model/user.model';
import { Subject, map, of } from 'rxjs';
import { MENU, PERMISOS } from 'src/utils/constants';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.urlApiBovis;

  http = inject(HttpClient)

  private _roles: RolPermiso[] = []
  private _menu: MegaMenuItem[] = []

  private tokenSubject = new Subject<string>()

  get rolesG() {
    return this._roles
  }

  get menuG() {
    return this._menu
  }

  constructor() { }

  sendToken(data: string) {
    this.tokenSubject.next(data)
  }

  getToken() {
    return this.tokenSubject.asObservable()
  }

  getRoles() {
    if(localStorage.getItem('tk')) {
      return this.http.get<RolesResponse>(`${this.baseUrl}api/Rol`)
        .pipe(map(data => {
          if(data.data) {
            const {permisos} = data.data
            this._roles = permisos.map(permiso => ({rol: (`${permiso.chmodulo_slug}.${permiso.chsub_modulo_slug}`).toLowerCase(), administrador: permiso.chpermiso === PERMISOS.ADMIN}))
            const tempMenu: MegaMenuItem[] = []
            MENU.forEach(opcion => {

              if(this.verificarRolPadre(opcion.id)) {
                if(opcion.items) {
                  const [opcionHija] = opcion.items[0]
                  const tempOpciones: OpcionSubMenu[] = []
                  if(opcionHija.items) {
                    opcionHija.items.forEach((opcionSubMenu: any) => {
                      if(opcionSubMenu.id && this.verificarRol(`${opcion.id}.${opcionSubMenu.id}`)) {
                        tempOpciones.push(opcionSubMenu)
                      }
                    })
                  }
                  opcionHija.items = tempOpciones
                }
                tempMenu.push(opcion)
              }
            })
            this._menu = tempMenu
            return true
          } else {
            return false
          }
        }))
    } else {
      return of(false)
    }
  }

  verificarRol(rol: string): RolPermiso | null {

    const findIndex = this.rolesG.findIndex((registro) => registro.rol === rol)

    if(findIndex >= 0) {
      return this.rolesG.at(findIndex)
    }

    return null
  }

  verificarRolPadre(rol:string) {

    const findIndex = this.rolesG.findIndex((registro) => registro.rol.startsWith(`${rol}.`))

    if(findIndex >= 0) {
      return this.rolesG.at(findIndex)
    }

    return null
  }
}
