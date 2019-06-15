import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


import {storage} from "firebase";
 
export interface Photo {
  id?: string,
  name: string,
  image: string,
  coords:any
}
@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  private photos: Observable<Photo[]>;
  private photoCollection: AngularFirestoreCollection<Photo>;
 
  constructor(private afs: AngularFirestore) {
    this.photoCollection = this.afs.collection<Photo>('photos');
    this.photos = this.photoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getPhotos(): Observable<Photo[]> {
    return this.photos;
  }
  

  /**
   * saveDataPhoto
   */
  public saveDataPhoto(photos: Photo): Promise<DocumentReference> {
    return this.photoCollection.add(photos);
  }

  /**
   * uploadPhoto
   */
  public uploadPhoto(photos:Photo) {
    const image = storage().ref("imagenesSubidas/"+photos.id);
    return image.putString(photos.image, 'data_url',{contentType:'image/jpg'}).then(response =>{
      return response;
    });
    }

  /**
   * getImageUrl
   */
  public getImageUrl(photos:Photo) {
    try {
      return storage().ref().child("/imagenesSubidas/"+photos.id).getDownloadURL().then(url =>{
        return url;
      })
    } catch (e) {
      console.log("Error"+e);
    }
  }
}
