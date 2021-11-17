import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  locationListRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  saveLocation(apt) {
  	console.log(apt)
  	this.locationListRef = this.db.list('/lists');
    return this.locationListRef.push({
      current_location: apt.current_location,
      current_time: apt.current_time
    })
  }

  getLocations() {
    this.locationListRef = this.db.list('/lists');
    return this.locationListRef;
  }
}
