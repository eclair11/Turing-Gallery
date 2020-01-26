import { Component, OnInit } from '@angular/core';



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

  constructor() { }

  ngOnInit() {
  }

  onClickNextStep = () => {
    if (this.step < this.STEPS_TITLE.length) {
      this.step++;
    }
  }

  onClickPreviousStep = () => {
    if (this.step > 1) {
      this.step--;
    }
  }

}
