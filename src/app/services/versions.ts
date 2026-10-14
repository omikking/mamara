import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { catchError, Observable, Subject, tap, throwError } from 'rxjs'

interface ModelVersion {
  id: number
  version: string
  accuracy: string
  precision: string
  f1Score: string
  latency: string
  status: 'Active' | 'Inactive'
  lastUpdated: string
}

@Injectable({
  providedIn: 'root'
})
export class Versionservice {
  http = inject(HttpClient)
  versiondata: ModelVersion[] = []
  private versiondataSubject = new Subject<ModelVersion[]>()
  version: Observable<ModelVersion[]> = this.versiondataSubject.asObservable()

  getdata (): Observable<ModelVersion[]> {
    return this.http
      .get<ModelVersion[]>(
        'https://6879e974abb83744b7ea7819.mockapi.io/nothing/newendpoint'
      )
      .pipe(
        tap(data => {
          // Use the tap operator to inspect the data and update the Subject
          // console.log(data);
          console.log('hello', data)

          this.versiondataSubject.next(data)
          this.versiondata = data
          console.log('Versions data successfully loaded and broadcasted.')
        }),
        catchError(error => {
          console.error('Error fetching model versions from API:', error)
          return throwError(() => new Error('Failed to load version data.'))
        })
      )
  }
  setdata (status: 'Active' | 'Inactive', version: string) {
    let newdat: any
    // newdat= this.versiondata.map((d)=>{
    //   if(d.version==version){
    //     d.status=status
    //   }
    //   return d;
    // })
    // let id =3;
    // this.http.put(`https://6879e974abb83744b7ea7819.mockapi.io/nothing/newendpoint/${id}`,newdat).subscribe((data)=>{
    //   console.log(data);

    // })
    this.getdata().subscribe(d => {
      console.log(d, 'dd')
    })
    this.versiondataSubject.subscribe(vd => {
      console.log(vd)
      newdat = vd.map(d => {
        if (d.version == version) {
          d.status = status
        }
        return d
      })
    })

    this.versiondataSubject.next(newdat)
  }
}
