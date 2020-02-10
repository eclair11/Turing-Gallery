import { SafeUrl } from '@angular/platform-browser';

export class CatalogModel {
    pagesImgUrl: SafeUrl[];
}


export const generateDefaultCatalogModels = (): CatalogModel[] => {
    const catalogModels = [];
    const catalogModel1 = new CatalogModel();
    catalogModel1.pagesImgUrl = [
      "../../../../assets/img/modele-catalog/modele-1/modele-cover-face.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-1.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-2.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-3.png",
      "../../../../assets/img/modele-catalog/modele-1/modele-cover-back.png"
    ];
    catalogModels.push(catalogModel1);
    return catalogModels;
  }