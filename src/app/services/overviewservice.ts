import { inject, Injectable } from '@angular/core';
import { Versionservice } from './versions';

interface model {
  version: string,
    deploymentDate: string,
    lastUpdated: string,
    status: string
}
interface ModelVersion {
  version: string;
  accuracy: string;
  precision: string;
  f1Score: string;
  latency: string;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}
@Injectable({
  providedIn: 'root'
})
export class Overviewservice {
  activeView: string = 'overview';

  model : model= {
    version: "v2.0",
    deploymentDate: 'Jan 10, 2025',
    lastUpdated: 'Jan 10, 2025',
    status:"active"
  };
  updatemodel(data:any){
    this.model.version = data.version,
    this.model.status = data.status
    this.model.lastUpdated=data.lastUpdated
  }
}
