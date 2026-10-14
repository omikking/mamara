import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './components/table/table';
import { ImageDetectionAI } from './layout/image-detection-ai/image-detection-ai';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-root',
  imports: [ImageDetectionAI,MatToolbarModule,MatIconModule,MatMenuModule,MatSelectModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mamara';
  selectedLanguage: string = 'en';

}
