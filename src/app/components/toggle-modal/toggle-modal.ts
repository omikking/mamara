import { Component, inject, Input } from '@angular/core';
import { Togglemodalservice } from '../../services/togglemodalservice';
import { CommonModule } from '@angular/common';
import { Versionservice } from '../../services/versions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-modal',
  imports: [CommonModule,MatIconModule],
  templateUrl: './toggle-modal.html',
  styleUrl: './toggle-modal.css'
})
export class ToggleModal {
  toggle=inject(Togglemodalservice)
  versionservice=inject(Versionservice)
  @Input() data: any; 
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log(this.data);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.data);
  }
  cancel(): void {
    // this.close.emit();
    this.toggle.isopen=false;
  }

  deactivate(): void {
    this.cancel()
    // console.log(`Deactivation confirmed for version ${this.version()}`);
    // this.confirm.emit();
    this.versionservice.setdata("Inactive",this.data.version)
  }
  activate():void{
    this.cancel()
    this.versionservice.setdata("Active",this.data.version)
  }
}
