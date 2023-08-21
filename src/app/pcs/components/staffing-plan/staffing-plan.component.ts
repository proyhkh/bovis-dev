import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { SeleccionarEmpleadoComponent } from '../seleccionar-empleado/seleccionar-empleado.component';

interface Etapa {
  id:         number,
  nombre:     string,
  totalMeses: number,
  meses:      boolean[],
}

interface Empleado {
  id:         number,
  cod:        string,
  nombre:     string,
  posicion:   string,
  totalMeses: number,
  meses:      number[]
}

@Component({
  selector: 'app-staffing-plan',
  templateUrl: './staffing-plan.component.html',
  styleUrls: ['./staffing-plan.component.css'],
  providers: [DialogService]
})
export class StaffingPlanComponent {

  dialogService     = inject(DialogService)

  meses: String[] = ['Jun-23', 'Jul-23', 'Ago-23', 'Sep-23', 'Oct-23', 'Nov-23']

  /**
   * Etapas
   */
  etapaForm = this.fb.group({
    etapa: ''
  });

  etapas: Etapa[] = []

  empleados: Empleado[] = []

  get jsonEtapas(): string {
    return JSON.stringify(this.etapas, null, 3)
  }

  get duracionMeses(): number {
    let total = 0
    this.etapas.map(etapa => {
      total += etapa.totalMeses
    })
    return total
  }

  form = this.fb.group({
    empleadosCampos: this.fb.array([])
  });

  get empleadosCampos() {
    return this.form.controls["empleadosCampos"] as FormArray;
  }

  agregarEmpleado() {
    this.dialogService.open(SeleccionarEmpleadoComponent, {
      header: 'Seleccionar empleado',
      width: '50%',
      height: '450px',
      contentStyle: {overflow: 'auto'}
    })
    .onClose.subscribe(data => {
      if(data) {
        const mesesCampos = this.meses.map((mes, index) => {
          return [0]
        })
        const empleadoForm = this.fb.group({
          cod:        [data.empleado.nunum_empleado_rr_hh],
          nombre:     [data.empleado.nombre_persona],
          posicion:   [data.empleado.chpuesto],
          totalMeses: [0],
          ...mesesCampos
        })
        this.empleadosCampos.push(empleadoForm);
        this.empleados.push({
          id:         Date.now(),
          cod:        empleadoForm.value.cod,
          nombre:     empleadoForm.value.nombre,
          posicion:   empleadoForm.value.posicion,
          totalMeses: 0,
          meses:      []
        })
      }
    })
  }

  sumarTotal(i: number, iMes: number, {target}: any) {
    let total = 0
    this.meses.map((mes, index) => {
      this.empleados[i].meses[index] = (this.empleadosCampos.value[i][index] / 100)
      total += this.empleadosCampos.value[i][index]
    })
    this.empleados[i].totalMeses = (total / 100)
  }

  constructor(private fb: FormBuilder) {}

  toggleOpcion(etapa: Etapa, indice: number) {
    etapa.meses[indice] = !etapa.meses[indice]
    etapa.totalMeses = etapa.meses.filter(valor => valor).length
  }

  agregarEtapa() {
    this.etapas.push({
      id: Date.now(),
      nombre: this.etapaForm.value.etapa,
      totalMeses: 0,
      meses: Array(this.meses.length).fill(false)
    })

    this.etapaForm.reset()
  }

  borrarEtapa(etapa: Etapa) {
    this.etapas = this.etapas.filter(({id}) => id !== etapa.id)
  }

  borrarEmpleado(indice: number) {
    this.empleadosCampos.removeAt(indice);
    this.empleados = this.empleados.filter((empleado, index) => index !== indice)
  }

}
