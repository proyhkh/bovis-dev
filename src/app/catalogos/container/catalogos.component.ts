import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogosComponent implements OnInit {

  catalogos: any[] = [
    {
      catalogo: 'cat_viaticos',
      id: null,
      nombre: 'Viaticos',
    },
    {
      catalogo: 'normativa_tipoInstrumento',
      id: null,
      nombre: 'Catalogo 2',
    },
    {
      catalogo: 'normativa_tipoCircular',
      id: null,
      nombre: 'Catalogo 3',
    },
    {
      catalogo: 'normativa_materiaRegulacion',
      id: null,
      nombre: 'Catalogo 4',
    },
   /*  {
      catalogo: 'normativa_ambitoIncide',
      id: null,
      nombre: 'Ámbito incide (Diversa normativa)',
    },
    { catalogo: 'acuerdos_votacion', id: null, nombre: 'Votación (Acuerdos)' },
    { catalogo: 'acuerdos_vigencia', id: null, nombre: 'Vigencia (Acuerdos)' },
    { catalogo: 'acuerdos_organo', id: null, nombre: 'Órgano (Acuerdos)' },
    {
      catalogo: 'voto_tipoTemaSustantivo',
      id: null,
      nombre: 'Tema sustantivo (Votos)',
    },
    {
      catalogo: 'voto_tipoTemaProcesal',
      id: null,
      nombre: 'Tema procesal (Votos)',
    },
    {
      catalogo: 'voto_tipoTemaAbordado',
      id: null,
      nombre: 'Tema abordado (Votos)',
    },
    { catalogo: 'voto_tipoVoto', id: null, nombre: 'Tipo voto (Votos)' },
    { catalogo: 'voto_tipoAsunto', id: null, nombre: 'Tipo asunto (Votos)' },
    {
      catalogo: 'sentencia_sentidoResolucion',
      id: null,
      nombre: 'Sentido resolución (Sentencias)',
    },
    {
      catalogo: 'sentencia_tramiteEngrose',
      id: null,
      nombre: 'Trámite engrose (Sentencias)',
    },
    {
      catalogo: 'sentencia_momentoEfectoInvalidez',
      id: null,
      nombre: 'Momento efecto invalidez (Sentencias)',
    },
    {
      catalogo: 'sentencia_invacionPoderesAnalizado',
      id: null,
      nombre: 'Invasión poderes analizado (Sentencias)',
    },
    {
      catalogo: 'sentencia_invacionEsferasAnalizado',
      id: null,
      nombre: 'Invasión esferas analizado (Sentencias)',
    },
    {
      catalogo: 'sentencia_congresoEmitio',
      id: null,
      nombre: 'Congreso emitió (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoSentencia',
      id: null,
      nombre: 'Tipo sentencia (Sentencias)',
    },
    {
      catalogo: 'sentencias_metodologiaAnalisisConstitucionalidad',
      id: null,
      nombre: 'Metodología análisis constitucionalidad (Sentencias)',
    },
    {
      catalogo: 'sentencias_causasImprocedenciaAnalizadas',
      id: null,
      nombre: 'Causas improcedencia (Sentencias)',
    },
    {
      catalogo: 'sentencias_violacionInvacionPoderes',
      id: null,
      nombre: 'Violación invasión poderes (Sentencias)',
    },
    {
      catalogo: 'sentencias_violacionInvacionEsferas',
      id: null,
      nombre: 'Violación invasión esferas (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoVicioProcesoLegislativo',
      id: null,
      nombre: 'Vicio proceso legislativo (Sentencias)',
    },
    {
      catalogo: 'sentencias_violacionOrganicaAnalizada',
      id: null,
      nombre: 'Violación Orgánica (Sentencias)',
    },
    {
      catalogo: 'sentencias_derechosHumanos',
      id: null,
      nombre: 'Derechos humanos (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoViolacionPlanteadaenlaDemanda',
      id: null,
      nombre: 'Planteada en la demanda (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoPersonaJuridicaColectiva',
      id: null,
      nombre: 'Persona jurídica (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoPersonaPromovente',
      id: null,
      nombre: 'Persona promovente (Sentencias)',
    },
    {
      catalogo: 'sentencia_organoRadicacion',
      id: null,
      nombre: 'Órgano radicación (Sentencias)',
    },
    {
      catalogo: 'sentencia_tipoAsunto',
      id: null,
      nombre: 'Tipo asunto (Sentencias)',
    },
    { catalogo: 'ministros', id: null, nombre: 'Ministros' }, */
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
