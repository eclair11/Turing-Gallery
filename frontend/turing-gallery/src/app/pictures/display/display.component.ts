import { Component, OnInit } from '@angular/core';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  pictures: Picture[] = [];
  total: number[] = [];
  actualpage: number;

  constructor(private service: PictureService) { }

  ngOnInit() {
    this.actualpage = 1;
    this.getPictures(1);
  }

  getTotal = (): number => {
    return this.total[this.total.length - 1];
  }

  getPictures = (page: number): void => {
    this.actualpage = page;
    this.pictures = [];
    this.total = [];
    this.service.get(this.pictures, this.total, page);
  }

  rmPicture = (pictureId: number): void => {
    this.service.delete(pictureId, this.actualpage);
  }

}