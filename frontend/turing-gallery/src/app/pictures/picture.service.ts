import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from './picture';
import { Gallery } from './gallery';

const SECOND = 1000;
const MESSAGE_UPLOAD_OK = 'Les images ont été importé avec succés';
const MESSAGE_UPLOAD_KO = 'L\'importation des images ont échouées, veuillez réessayer';
const MESSAGE_DURATION = 6 * SECOND;

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  /** uploading indicator */
  isUploading = false;
  isUploadOk = null;
  uploadMessage = null;

  constructor(private http: HttpClient, private sanitizer : DomSanitizer) { }

  /** send post request with pictures as multipart-form-data */
  post = (pictures: Picture[]): void => {
    this.isUploading = true;
    this.isUploadOk = null;
    this.uploadMessage = null;
    const formData = new FormData();
    for (const picture of pictures) {
      if (picture.isValid) {
        formData.append('pictures', picture.file, picture.file.name);
        formData.append('widths', picture.width + '');
        formData.append('heights', picture.height + '');
        formData.append('sizes', picture.size + '');
      }
    }
    this.http.post('http://localhost:9090/api/v1/import', formData).subscribe(
      () => {
        this.isUploadOk = true;
        this.isUploading = false;
        this.uploadMessage = MESSAGE_UPLOAD_OK;
        setTimeout(() => {
          this.uploadMessage = null;
          this.isUploadOk = null;
        }, MESSAGE_DURATION);
      },
      (err) => {
        console.log(err);
        this.isUploading = false;
        this.isUploadOk = false;
        this.uploadMessage = MESSAGE_UPLOAD_KO;
      });
  }

  /**
   * send a request to get pictures as a json object
   */
  get = (gallery: Gallery[], page: string): void => {
    this.http.get('http://localhost:9090/api/v1/pictures/' + page).subscribe(
      (data) => {
        let dataSize = Object.keys(data).length - 1;
        for(let i = 0; i < dataSize; i++) {
          const pic = new Gallery();
          pic.title = data[i].title;
          pic.height = data[i].height;
          pic.width = data[i].width;
          pic.size = data[i].size;
          let url = URL.createObjectURL(new Blob([data[i].image], { type: "image/jpg" }));
          pic.image = this.sanitizer.bypassSecurityTrustUrl(url);
          gallery.push(pic);
        }
        //page = data[dataSize];
      },
      (err) => {
        console.log(err);
      });
  }
}
