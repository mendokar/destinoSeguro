import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Injectable({
  providedIn: 'root'
})
export class GlobalFunctions {

  constructor(private camera: Camera) { }

  /**
   * takePhoto
   */
  public takePhoto() {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        saveToPhotoAlbum:false,
        sourceType:this.camera.PictureSourceType.CAMERA
      }
      
    return  this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
        return imageData;
       
      }, (err) => {
       // Handle error
      });
  }
}