import { Component, OnInit } from '@angular/core';
import { CatalogModel, generateDefaultCatalogModels } from '../catalog-model';


@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  catalogModels: CatalogModel[] = [];
  pages = [];
  currentModel = 1;
  currentPages = 1;
  pagesNumber = 1;
  pageNumber = 1;

  constructor() { 
  }

  ngOnInit() {
    // get default catalog models
    this.catalogModels = generateDefaultCatalogModels();
    const restePage = (this.catalogModels[this.currentModel-1].pagesImgUrl.length % 3);
    this.pagesNumber = (this.catalogModels[this.currentModel-1].pagesImgUrl.length / 3);
    if (restePage > 0) {
      this.pagesNumber++;
    }
    this.pageNumber = this.catalogModels[this.currentModel-1].pagesImgUrl.length;
    // set first pages to show 
    this.updatePagesToShow();
  }

  updatePagesToShow() {
    this.pages = [];
    for (let i = this.currentPages-1, j = 0; i < this.pageNumber && j < 3; i++, j++) {
      this.pages.push(this.catalogModels[this.currentModel-1].pagesImgUrl[i]);
    }
  }

  onClickNextPages() {
    if (this.currentPages < this.pagesNumber) {
      this.currentPages++;
      this.updatePagesToShow();
    }
  }

  onClickPreviousPages() {
    if (this.currentPages > 1) {
      this.currentPages--;
      this.updatePagesToShow();
    }
  }

}
