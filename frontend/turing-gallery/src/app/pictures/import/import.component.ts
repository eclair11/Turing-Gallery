/**
 * 
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  /**
   * all url of pictures that have been uploaded
   */
  imgURLs: string[] = [];

  constructor() { }

  ngOnInit() {
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
        reader.onload = () => {
          this.imgURLs.push(reader.result as string);
        };
      }
    }
  }

}
