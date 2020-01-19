import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from './picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http: HttpClient) { }

  /** 
   * send post request with pictures as multipart-form-data 
   * @param Picture[]
   * @return void
  */ 
 post = (pictures: Picture[]) => {
   const formData = new FormData();
   for (let picture of pictures) {
     if (picture.isValid) {
      formData.append('pictures', picture.file, picture.file.name);
      formData.append('widths', picture.width + '');
      formData.append('heights', picture.height + '');
      formData.append('sizes', picture.size + '');
     }
    }
    console.log(formData.getAll('widths'));
   this.http.post('http://localhost:9090/api/v1/import', formData).subscribe(
    (res) => console.log(res),
    (err) => console.log(err)
  );
 }
}
