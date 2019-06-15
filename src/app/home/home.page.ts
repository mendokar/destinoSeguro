import { Component, OnInit } from '@angular/core';
declare var google;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { FireServiceService, Photo } from '../services/fire-service.service';

import {LoadingController} from "@ionic/angular"
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public datos = 'camera';
  private photos: Observable<Photo[]>;
  constructor(private loading:LoadingController,private geolocation: Geolocation, private _serviceFire: FireServiceService) { }

  ngOnInit() {
    this.loadMap();
    




  }




  async loadMap() {
    
    const loading = await this.loading.create();
    loading.present();
    const resp = await this.geolocation.getCurrentPosition();
    const coords = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    }
    const mapEle: HTMLElement = document.getElementById('map');
    const map = new google.maps.Map(mapEle, {
      center: coords,
      zoom: 12
    });

    let img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc7n1L5xZMx/ddKhlM2tncTz37qyosTWw7+XjM5+ccr96LmUhciGeMr/97VdUM7Xxb5rXs12aMy6qcN6bMusm8XLucDiz72Rhs/v27oAo3iBAAABw0lEQVR4nO3by3LaMBiAUWrXJcI4SbmE0oQE6OX9H7FAIdBRFjLTQGuds2LDzM83thGD1OsBAAAAAAAAAAAAAAAAAAAAAPx3mqKN5trjXsBg9LGNSQ5NxnWZrurfXHveCxjX68+pHr7kkaR8+JRqlU+SD4nuJZFEkt8kiUgSkeQgNCHsVqKS7IV5VdXftk0k2WsmddWfSnJik2TRc+OcaibltNi9kmRPkogkEUkikkQkOQqDwSBIciLMhsPhfCDJ0VNV1+XjPEjy6qZf3d5+v3OVHG2SrIrCs+TEJsls83SV5EiSiCQRSSJvJflxn+olkySbb+VkXfybPEoSfrbYOFDW1dOVP8DfFydZDdvYvblb4htn+zswXfeKvJEkRejy3qOzkoSX0fM7znRlZyUppo+j7l4nZyYpO7xtT5LIaZLkJcZTJknqRe8uUW9R55GkqpNVOSTZbqZoY97BNdreIclm0Rpa6OKq9eA1CQftkmRxsKJVkufFMoMmbZKEr/3xuw7zb2iXpJTkT/kkWRVNmmKWS5LlepRmvawzSZJ+cK3OIkkzaXW6cTS49sAX4AwsAAAAAAAAAAAAAAAAAAAAANB5vwAXHUBXhPX4ZAAAAABJRU5ErkJggg==";
    
    this._serviceFire.getPhotos().subscribe((response:any)=>{
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        this.setMarkers(response[i].coords, response[i].image, map);
        
      }
      
    });
    loading.dismiss();
  }

  /**
   * setMarkers
   */
  public setMarkers(coords, img, map) {
    var infowindow = new google.maps.InfoWindow({
      content: "<span style=\"height:180px;width:180px\">Imagen Tomada en esta ubicacion <img style=\"height:150px;width:150px\" src=\"" + img + "\"></span>"
    });

    const marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: 'Hello World!',
      icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });
  }

}
