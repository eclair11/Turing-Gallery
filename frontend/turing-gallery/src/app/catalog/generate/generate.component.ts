import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  step: number = 1;

  constructor() { }

  ngOnInit() {
  }

  onClickNextStep = () => {
    if (this.step < 2) {
      this.step++;
    }
  }

}
