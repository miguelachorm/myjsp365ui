import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from './../../services/geolocation.service';
declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @ViewChild('mapElement') mapContainer: ElementRef;
  map: any;
  myLocation = [];

  constructor(
    private geolocation: Geolocation,private aptService: GeolocationService) { }

  ngOnInit() {
  	this.fetchLatLong();
  	let bookingRes = this.aptService.getLocations();
    bookingRes.snapshotChanges().subscribe(res => {
      this.myLocation = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.myLocation.push(a);
      })
      this.displayGoogleMap();
    })
  }

  ngAfterViewInit() {
  }

  fetchLatLong() {
    this.aptService.getLocations().valueChanges().subscribe(res => {})
  }

  displayGoogleMap() {
  	const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
  	this.geolocation.getCurrentPosition(options).then((resp) => {
  		const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
	    const mapOptions = {
	      center: latLng,
	      disableDefaultUI: true,
	      zoom: 4,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
	    this.getMarkers();
    }).catch((error) => {
    });

  }

  getMarkers() {
    for (let i = 0; i < this.myLocation.length; i++) {
      this.addMarkersToMap(this.myLocation[i]);
    }

  }

  addMarkersToMap(mapObject) {
    const position = new google.maps.LatLng(mapObject.current_location.latitude, mapObject.current_location.longitude);
    const mapObjectMarker = new google.maps.Marker({ position, title: '' });
    mapObjectMarker.setMap(this.map);
    const infowindow = new google.maps.InfoWindow({
      content: new Date(mapObject.current_time) + '',
      maxWidth: 400
    });
    mapObjectMarker.addListener('click', function() {
	    infowindow.open(this.map, mapObjectMarker);
	  });
  }
}