import { Item } from "src/models/general.model";

export const errorsArray = Object.freeze([
  {
    tipo: 'required',
    mensaje: 'Este campo es requerido.'
  }, 
  {
    tipo: 'maxlength',
    mensaje: 'Este campo es inválido.'
  },
  {
    tipo: 'minlength',
    mensaje: 'Este campo es inválido.'
  },
  {
    tipo: 'email',
    mensaje: 'El formato de correo es inválido.'
  }
])

export const cieHeaders = [
    'NOMBRE CUENTA',
    'CUENTA',
    'TIPO POLIZA',
    'NUMERO',
    'FECHA',
    'MES',
    'CONCEPTO',
    'CENTRO DE COSTOS',
    'PROYECTOS',
    'SALDO INICIAL',
    'DEBE',
    'HABER',
    'MOVIMIENTO',
    'EMPRESA',
    'NUM PROYECTO',
    'TIPO',
    'EDO DE RESULTADOS',
    'RESPONSABLE',
    'TIPO',
    'TIPO PY',
    'CLASIFICACION PY'
]

export const EXCEL_EXTENSION = '.xlsx';

export const PERCENTAGE_FORMAT = '0.00%'

export const TITLES = Object.freeze({
  error:    'Oh no...',
  success:  '¡Éxito!'
})

export const SUBJECTS = Object.freeze({
  error:  'Ha ocurrido un error inesperado.'
})

/**
 * Calendar constants
 */
export const CALENDAR = Object.freeze({
  dayNames: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ]
})

export const meses: Item[] = [
  {value: 0, label: 'Todos'},
  {value: 1, label: 'Enero'},
  {value: 2, label: 'Febrero'},
  {value: 3, label: 'Marzo'},
  {value: 4, label: 'Abril'},
  {value: 5, label: 'Mayo'},
  {value: 6, label: 'Junio'},
  {value: 7, label: 'Julio'},
  {value: 8, label: 'Agosto'},
  {value: 9, label: 'Septiembre'},
  {value: 10, label: 'Octubre'},
  {value: 11, label: 'Noviembre'},
  {value: 12, label: 'Diciembre'},
]

const test = 'test chk'
