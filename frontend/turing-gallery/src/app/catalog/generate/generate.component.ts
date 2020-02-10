import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelComponent } from './model/model.component';
import { ImportComponent } from '../../pictures/import/import.component';
import { Picture } from '../../pictures/picture';


@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {
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

  selectedModel = 0;
  pictures: Picture[] = [];

  @ViewChild(ModelComponent, null)
  private modelComponent: ModelComponent;
  @ViewChild(ImportComponent, null)
  private importComponent: ImportComponent;

  constructor() { }

  ngOnInit() {
  }

  onClickNextStep = () => {
    if (this.step == 1 && this.modelComponent.isComponentValid() ) {
      this.step++;
      this.errorMessage = '';
      this.selectedModel = this.modelComponent.selectedModel;
    }
    else if (this.step == 1 && !this.modelComponent.isComponentValid() ) {
      this.errorMessage = "Veuillez séléctionner un model de catalogue pour continuer";
    }
    else if (this.step == 2 && this.importComponent.isComponentValid()) {
      this.step++;
      this.errorMessage = '';
      this.pictures = this.importComponent.pictures;
    }
    else if (this.step == 2 && !this.importComponent.isComponentValid()) {
      this.errorMessage = "Veuillez importer des images valides pour votre catalogue"
    }
  }

  onClickPreviousStep = () => {
    if (this.step > 1) {
      this.errorMessage = '';
      this.step--;
    }
  }

}
