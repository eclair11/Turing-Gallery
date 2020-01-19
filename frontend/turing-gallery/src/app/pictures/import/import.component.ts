/**
 * 
 */
import { Component, OnInit } from '@angular/core';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  /**
   * all url of pictures that have been uploaded
   */
  pictures : Picture[] = [];
  /**
   * delete picture indicator
   */
  isShownDeletes = {};
  shownDeleteIndex = -1;
  deletedPicture = null;

  /** number of valid picture */
  validPictureCount = 0;
  /** number of invalid picture */
  invalidPictureCount = 0;
  
  /** uploading indicator */
  isUploading = false;

  constructor(private service : PictureService) { }

  ngOnInit() {
  }

  startUpload = async () => {
    console.log("uploading");
    this.isUploading = true;
    await this.service.post(this.pictures);
    this.isUploading = false;
  }

  onClickDeletePicture = (picture: Picture): void => {
    this.deletedPicture = picture;
  }

  deletePicture = (): void => {
    if (this.deletedPicture !== null) {
      this.pictures = this.pictures.filter((currentPicture) => {
        return this.deletedPicture !== currentPicture;
      });
      this.updatePictureCounter();
      this.reinitDeletedPicture();
    }
  }

  reinitDeletedPicture = (): void => {
    this.deletedPicture = null;
  }

  updatePictureCounter = (): void => {
    if (this.deletedPicture.isValid) {
      this.validPictureCount--;
    } else {
      this.invalidPictureCount--;
    }
  }

  onMouseoverPicture = (index: number): void => {
    for (let i = 0; i < this.pictures.length; i++) {
      this.isShownDeletes['' + i] = false;
    }
    this.isShownDeletes['' + index] = true;
    this.shownDeleteIndex = index;
  }

  onMouseleavePreview = (): void => {
    this.isShownDeletes['' + this.shownDeleteIndex] = false;
  }

  preview = (files: any[]): void => {
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
            const picture = new Picture(
              reader.result as string, 
              image.height,
              image.width,
              file
            );
            this.pictures.push(picture);
            if (picture.isValid) {
              this.validPictureCount++;
            } else {
              this.invalidPictureCount++;
            }
          }
          
        };
      }
    }
  }

}
