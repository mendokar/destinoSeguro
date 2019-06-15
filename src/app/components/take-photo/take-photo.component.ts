import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/functions/globalFunctions';
import { FireServiceService } from 'src/app/services/fire-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss'],
})
export class TakePhotoComponent implements OnInit {

  constructor(private loading:LoadingController,private geolocation: Geolocation,private _globalFunctions:GlobalFunctions,private _firebaseService:FireServiceService) { }
  img ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAAAMFBMVEX////Ly8vIyMjT09Ps7Ozv7+/Y2Nj39/f6+vrz8/Po6OjV1dXPz8/g4ODk5OTb29s0vKVlAAABM0lEQVR4nO3YyW7CMBQF0NghI9P//21bRYCJo5YNMarPWeZtnq88xU0DAAAAAAAAAAAAAAAAAAAAAAAAAADvdQx3x9K9fI74SCWW7uVzSGVt6Ns2JNot59Jd7i3E8LdYWSzdK6F8K93nvg7rVOJi/bV0n/tapRLDuRvGoTuvFlbVqcTLvXCRys2UVAapLEMfnkpjvdeYJJV4WNWS86neVNqseJRKNlXSyVJtKmHMq+bKaaPaVp9Kvq00TS+VjapUrKCH5AzKd9vRbhvn34oFWisoOZnzJdSaK+kP82J24/8ZevdUmvwdLmNPL/1dCFJZBn+9HUTjNUrlMfx+7qZu7mPVL5T5G//WY3ZtqTRZAFvitXSbO5tOL6TSl+4SAAAAAAAAAAAAAAAAAAAAAAAAAID/7QsEjQXGyugcuQAAAABJRU5ErkJggg==";
  image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAAAMFBMVEX////Ly8vIyMjT09Ps7Ozv7+/Y2Nj39/f6+vrz8/Po6OjV1dXPz8/g4ODk5OTb29s0vKVlAAABM0lEQVR4nO3YyW7CMBQF0NghI9P//21bRYCJo5YNMarPWeZtnq88xU0DAAAAAAAAAAAAAAAAAAAAAAAAAADvdQx3x9K9fI74SCWW7uVzSGVt6Ns2JNot59Jd7i3E8LdYWSzdK6F8K93nvg7rVOJi/bV0n/tapRLDuRvGoTuvFlbVqcTLvXCRys2UVAapLEMfnkpjvdeYJJV4WNWS86neVNqseJRKNlXSyVJtKmHMq+bKaaPaVp9Kvq00TS+VjapUrKCH5AzKd9vRbhvn34oFWisoOZnzJdSaK+kP82J24/8ZevdUmvwdLmNPL/1dCFJZBn+9HUTjNUrlMfx+7qZu7mPVL5T5G//WY3ZtqTRZAFvitXSbO5tOL6TSl+4SAAAAAAAAAAAAAAAAAAAAAAAAAID/7QsEjQXGyugcuQAAAABJRU5ErkJggg==";
  ngOnInit() {}

  /**
   * takePhoto
   */
  public takePhoto() {
    this._globalFunctions.takePhoto().then((response:any)=>{
      this.image = 'data:image/jpeg;base64,' + response;
    })
  }


  /**
   * uploadPhoto
   */
  public async uploadPhoto() {
    const loading = await this.loading.create();
    loading.present();
    const resp = await this.geolocation.getCurrentPosition();
    const coords = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    }
    let id = Math.random() * (10000 - 1) + 1;
    let photos = {
      id: ""+id,
      name: "Imagen - " + id,
      image: this.image,
      coords:coords
    }

    //this._firebaseService.saveDataPhoto(photos);
    this._firebaseService.uploadPhoto(photos).then((response =>{
      this._firebaseService.getImageUrl(photos).then((res)=>{
        photos.image = res;
        this._firebaseService.saveDataPhoto(photos).then((re)=>{
          alert(JSON.stringify(re));
          this.image = this.img;
          loading.dismiss();
        });
      })
    }));

  }

}
