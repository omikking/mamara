import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableComponent } from '../../components/table/table';
import { Versionservice } from '../../services/versions';
import { ToggleModal } from '../../components/toggle-modal/toggle-modal';
import { Togglemodalservice } from '../../services/togglemodalservice';
import { Loader } from '../../components/loader/loader';
import { CommonModule } from '@angular/common';

interface ModelVersion {
  id:number;
  version: string;
  accuracy: string;
  precision: string;
  f1Score: string;
  latency: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

@Component({
  selector: 'app-versions',
  imports: [CommonModule,MatCardModule,MatTableModule,MatIconModule,MatToolbarModule,MatMenuModule,TableComponent,ToggleModal,Loader],
  templateUrl: './versions.html',
  styleUrl: './versions.css'
})
export class Versions {
  loading:boolean=false;
  toggle=inject(Togglemodalservice)
   versionservice = inject(Versionservice)
   versions:ModelVersion[]=[]
   filteredversion:ModelVersion[]=[]
   versionColumns:string[]=["version","accuracy","precision","f1Score","latency","status","lastUpdated","Actions"]
   ngOnInit(){
    this.loading=true
    this.versionservice.getdata().subscribe();
    this.versionservice.version.subscribe((data)=>{
      console.log(data,"version");
      this.loading=false;
      this.versions=data;
    })
   }
   filterdata(val:any){
      this.filteredversion=this.versions.filter((v)=>{
        return v.version.includes(val.target.value.toLowerCase())
      })
   }
}
