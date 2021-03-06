import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(private userService: UserService, private authenticationService: AuthenticationService, private angularFireStorage: AngularFireStorage) {
  this.authenticationService.getStatus().subscribe((status) => {this.userService.getUserById(status.uid).valueChanges().subscribe(
    (data: User) => {this.user = data;
     console.log(this.user);
    }, (error) => {console.log(error)}
  )}, (error) => {console.log(error)});
 }

  ngOnInit() {
  }

  saveSettings() {
    if(this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.angularFireStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
      this.picture = this.angularFireStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
      this.picture.subscribe((p) => {
        this.userService.setAvatar(p, this.user.uid)//.then(() => {
        //   alert('Avatar Cargado Correctamente');
        // }).catch((error) => {
        //   alert('Hubo un Error Al Cargar La Imagen');
        //   console.log(error);
        // });
      });
    }).catch((error) => {
      console.log(error);
  });
    }else {
      this.userService.editUser(this.user).then(() => {
        alert('Cambios Guardados Exitosamente');
      }).catch((error) => {
        alert('Hubo Un Error');
        console.log(error);
      });
    }
  }

    fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    }

    imageCropped(image: string) {
        this.croppedImage = image;
    }

    imageLoaded() {
        // show cropper
    }

    loadImageFailed() {
        // show message
    }
}
