import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Picture } from './picture';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

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
   * send a request to get pictures as json object
   */
  get = (pictures: Picture[], total: number[], page: number): void => {
    this.http.get('http://localhost:9090/api/v1/pictures/' + page).subscribe(
      (data) => {
        for (let i = 0; i < data['id'].length; i++) {
          const picture = new Picture();
          picture.getPicture(
            data['id'][i],
            data['title'][i],
            data['height'][i],
            data['width'][i],
            data['size'][i],
            this.sanitizer.bypassSecurityTrustUrl(data['image'][i])
          );
          pictures.push(picture);
        }
        for (let i = 1; i <= data['total']; i++) {
          total.push(i);
        }
        console.log(pictures);
      },
      (err) => {
        console.log(err);
      });
  }
}
