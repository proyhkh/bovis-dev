import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '../../services/catalogos.service';
import { Viaticos } from '../../Models/viaticos';
import { ServicetestService } from 'src/app/servicetest.service';

@Component({
  selector: 'app-viaticos',
  templateUrl: './viaticos.component.html',
  styleUrls: ['./viaticos.component.css']
})
export class ViaticosComponent implements OnInit {

  listViaticosModel: Viaticos[];

  constructor(private cat: CatalogosService, private serv: ServicetestService) {

    this.cat.getViaticos().subscribe(data => {
      console.log(data);
      this.listViaticosModel.push(data)
      console.log(this.listViaticosModel);
    });
  }

  ngOnInit(): void {
  }

}
