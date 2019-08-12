import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {

  selectedColor: any;
  defaultColor: any;
  currentColor: any;

  constructor() { }

  setSelectedColor(newColor) {
    this.selectedColor = newColor;
  }
}
