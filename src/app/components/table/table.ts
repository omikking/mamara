import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Togglemodalservice } from '../../services/togglemodalservice';
import { Overviewservice } from '../../services/overviewservice';
import { ToggleModal } from '../toggle-modal/toggle-modal';
import { MatIconModule } from '@angular/material/icon';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule,ToggleModal,MatIconModule,Loader],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class TableComponent {
  toggle=inject(Togglemodalservice)
  overview=inject(Overviewservice)
  @Input() columns: string[] = [];
  @Input() dataSource: any[] = [];
  
  openmodal(data:any){
    this.toggle.isopen=true;
    this.toggle.data=data
  }
  navigateToOverview(data:Object){
    this.overview.activeView="overview"
    this.overview.updatemodel(data)
  }
  switchclass(column:string){
    if(column=="Active") return "active status";
    if(column=="Healthy") return "active status";
    if(column=="Critical") return "inactive status";
    if(column=="Warning") return "warning status";
    else return "inactive status"

  }
  get displayedColumns(): string[] {
    return this.columns;
  }
}
