import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from './../../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.scss'],
})
export class MyLocationComponent implements OnInit {

  myLocation = [];
  current_location = {
    latitude: 0,
    longitude: 0
  }
   constructor(
   	private geolocation: Geolocation,
    private aptService: GeolocationService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.fetchLatLong();
    let locationResult = this.aptService.getLocations();
    locationResult.snapshotChanges().subscribe(res => {
      this.myLocation = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.myLocation.push(a);
      })
    })

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.current_location = {latitude: resp.coords.latitude, longitude: resp.coords.longitude };
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  fetchLatLong() {
    this.aptService.getLocations().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  saveLocations() {
    console.log(this.current_location);
    this.aptService.saveLocation({
      current_location: this.current_location,
      current_time: new Date().getTime()}).then(res => {
    }).catch(error => console.log(error));	
  }

}
