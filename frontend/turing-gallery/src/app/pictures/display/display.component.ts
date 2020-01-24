import { Component, OnInit } from '@angular/core';
import { Gallery } from '../gallery';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  page: string;
  gallery: Gallery[] = [];

  constructor(private service: PictureService) { }

  ngOnInit() {
    this.getPictures();
  }

  getPictures = () => {
    this.page = "1";
    this.service.get(this.gallery, this.page);
    console.log(this.gallery);
  }

}