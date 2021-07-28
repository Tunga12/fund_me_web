import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from 'src/app/models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getPosition(): Observable<Location> {
    return new Observable(function (observer) {
      if (navigator.geolocation) {
        const handleSuccess = (position: any) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        };
        navigator.geolocation.getCurrentPosition(handleSuccess);
        navigator.geolocation.watchPosition(handleSuccess);
      }
    });
  }
}
