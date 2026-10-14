import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

interface HealthIndicator {
  metric: string;
  currentValue: string;
  thresholdExpected: string;
  status: 'Healthy' | 'Critical' | 'Warning';
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class Healthservice {
  http = inject(HttpClient)
  private healthdata = new Subject<HealthIndicator[]>();
  health: Observable<HealthIndicator[]> = this.healthdata.asObservable();
    
  
  getdata(): Observable<HealthIndicator[]> {
    return this.http.get<HealthIndicator[]>("https://6879e974abb83744b7ea7819.mockapi.io/nothing/roles").pipe(
      tap(data => {
        // Use the tap operator to inspect the data and update the Subject
        this.healthdata.next(data);
        console.log('Versions data successfully loaded and broadcasted.');
      }),
      catchError(error => {
        console.error('Error fetching model versions from API:', error);
        return throwError(() => new Error('Failed to load version data.'));
      })
    );
  }
}
