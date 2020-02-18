import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Picture } from 'src/app/pictures/picture';
import { PictureService } from 'src/app/pictures/picture.service';



@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})

export class CustomizeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  titre = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  resume = new FormControl('', [Validators.required]);
  tel = new FormControl('', [Validators.required]);
  entreprise = new FormControl('', [Validators.required]);
  auteur = new FormControl('', [Validators.required]);

  /** all pictures that have been added */
  pictures: Picture[] = [];
  pic1: Picture = null;
  pic2: Picture = null;

   // indicator when this component is valid (usefull for its parents)
   isComponentValid = false;




  constructor(public fb: FormBuilder, private service: PictureService) {
  }

  ngOnInit() {
  }

  // email
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter the email' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // titre
  getErrorMessage1() {
    return this.titre.hasError('required') ? 'You must enter the title' :
      this.titre.hasError('titre') ? 'Not a valid titre' :
        '';
  }

  // description
  getErrorMessage2() {
    return this.description.hasError('required') ? 'You must enter the description' :
      this.description.hasError('description') ? 'Not a valid ' :
        '';
  }

  //  resume

  getErrorMessage3() {
    return this.resume.hasError('required') ? 'You must enter the resume' :
      this.resume.hasError('resume') ? 'Not a valid ' :
        '';
  }

  //  tel
  getErrorMessage4() {
    return this.tel.hasError('required') ? 'You must enter the phone number' :
      this.tel.hasError('tel') ? 'Not a valid phone number ' :
        '';

  }

  // entreprise
  getErrorMessage5() {
    return this.entreprise.hasError('required') ? 'You must enter entreprise name' :
      this.entreprise.hasError('entreprise') ? 'Not a valid ' :
        '';
  }
  // auteur
  getErrorMessage6() {
    return this.auteur.hasError('required') ? 'You must enter the author name' :
      this.auteur.hasError('entreprise') ? 'Not a valid ' :
        '';
  }


  preview2 = (files: any[]): void => {

    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      // check if file is an image
      if (file.type.match(/image\/*/) !== null) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const picture = new Picture();
            picture.postPicture(
              reader.result as string,
              image.height,
              image.width,
              file
            );
            this.pic1 = picture;

          };
        };
      }
    }
  }
  preview1 = (files: any[]): void => {

    if (files.length === 0) {
      return;
    }
    for (const file of files) {
      // check if file is an image
      if (file.type.match(/image\/*/) !== null) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const picture = new Picture();
            picture.postPicture(
              reader.result as string,
              image.height,
              image.width,
              file
            );
            this.pic2 = picture;

          };
        };
      }
    }
  }


}
