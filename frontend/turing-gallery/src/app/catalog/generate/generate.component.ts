import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModelComponent } from './model/model.component';
import { ImportComponent } from '../../pictures/import/import.component';
import { Picture } from '../../pictures/picture';
import { CatalogModel } from './catalog-model';
import { Catalog } from '../catalog';
import { CustomizeComponent } from './customize/customize.component';
import { CustomInfo } from '../custom-info';



@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit, AfterViewInit {
  STEPS_TITLE = [
    "CHOIX DU MODELE DE CATALOGUE",
    "CHOIX DES IMAGES À AJOUTER DANS LE CATALOGUE",
    "PERSONALISER LE CATALOGUE",
  ];
  STEPS_SUBTITLE = [
    "Seléctionner un modèle parmis ceux qui sont proposés",
    "Cliquez sur le boutton ci-dessous pour importer des images",
    "Remplissez le formulaire ci-dessous pour pérsonnaliser votre catalogue"
  ]
  step: number = 1;
  errorMessage = '';

  selectedModel: CatalogModel;
  pictures: Picture[] = [];
  catalog: Catalog = null;
  customInfo: CustomInfo = new CustomInfo();

  @ViewChild(ModelComponent, null)
  private modelComponent: ModelComponent;
  @ViewChild(ImportComponent, null)
  private importComponent: ImportComponent;
  @ViewChild(CustomizeComponent, null)
  private customizeComponent: CustomizeComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  generateCatalog = () => {
    this.catalog = new Catalog(this.pictures, this.selectedModel);
  }

  onClickNextStep = () => {
    if (this.step == 1 && this.modelComponent.isComponentValid() ) {
      this.step++;
      this.errorMessage = '';
      this.selectedModel = this.modelComponent.catalogModels[this.modelComponent.selectedModel - 1];
    }
    else if (this.step == 1 && !this.modelComponent.isComponentValid() ) {
      this.errorMessage = "Veuillez séléctionner un model de catalogue pour continuer";
    }
    else if (this.step == 2 && this.importComponent.isComponentValid()) {
      this.step++;
      this.errorMessage = '';
      this.pictures = this.importComponent.pictures;
      this.generateCatalog();
    }
    else if (this.step == 2 && !this.importComponent.isComponentValid()) {
      this.errorMessage = "Veuillez importer des images valides pour votre catalogue"
    }
    else if (this.step == 3 && this.customizeComponent.isComponentValid()) {
      this.step++;
      this.errorMessage = '';
      const coverPictures = [this.customizeComponent.pic1, this.customizeComponent.pic2];
      this.customInfo.title = this.customizeComponent.titre.value;
      this.customInfo.description = this.customizeComponent.description.value;
      this.customInfo.enterprise = this.customizeComponent.entreprise.value;
      this.customInfo.mail = this.customizeComponent.email.value;
      this.customInfo.phone = this.customizeComponent.tel.value;
      this.customInfo.author = this.customizeComponent.auteur.value;
      this.catalog.drawPages(coverPictures, this.customInfo);
    }
    else if (this.step == 3 && !this.customizeComponent.isComponentValid()) {
      this.errorMessage = "Veuillez remplir correctement le formulaire pour personnaliser le catalogue";
    }
  }

  onClickPreviousStep = () => {
    if (this.step > 1) {
      this.errorMessage = '';
      this.step--;
      if (this.step >= 2) {
        this.pictures = null;
        this.catalog = null;
      }
      if (this.step == 1) {
        this.selectedModel = null;
      }
    }
  }

}
