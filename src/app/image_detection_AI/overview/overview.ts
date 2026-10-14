import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  MatTableModule } from '@angular/material/table';
import { TableComponent } from '../../components/table/table';
import { Healthservice } from '../../services/key-health-indicator';
import { Overviewservice } from '../../services/overviewservice';
import { Loader } from '../../components/loader/loader';

interface HealthIndicator {
  metric: string;
  currentValue: string;
  thresholdExpected: string;
  status: 'Healthy' | 'Critical' | 'Warning';
  lastUpdated: string;
}

@Component({
  selector: 'app-model-overview',
  templateUrl: './overview.html',
  styleUrls: ['./overview.css'],
  imports:[MatTableModule,CommonModule,MatCardModule,TableComponent,Loader]
})
export class ModelOverviewComponent {
  loading:boolean=false;
  overviewdata=inject(Overviewservice)
  model=this.overviewdata.model
  healthservice = inject(Healthservice)
  health:HealthIndicator[]=[]
  healthColumns:string[]=["metric","currentValue","thresholdExpected","status","lastUpdated"]
  ngOnInit(){
    this.loading=true
    this.healthservice.getdata().subscribe()
    this.healthservice.health.subscribe((data)=>{
      console.log(data,"health");
      this.health=data;
      this.loading=false
    })
  }
}
