import { Component, OnInit } from '@angular/core';
import { Picture } from '../picture';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  page: string;

  constructor(private service: PictureService) { }

  ngOnInit() {
    this.getPictures();
  }

  getPictures = async () => {
    this.page = "1";
    this.service.get(this.page);
  }

}