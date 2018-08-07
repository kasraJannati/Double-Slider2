import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-double-slider-bar',
  templateUrl: './double-slider-bar.component.html',
  styleUrls: ['./double-slider-bar.component.scss']
})

export class DoubleSliderBarComponent implements OnInit {
  @ViewChild('minSign') minSign: ElementRef;
  @ViewChild('maxSign') maxSign: ElementRef;
  @ViewChild('lineDoubleSlider') lineDoubleSlider: ElementRef;
  @ViewChild('minNumber') minNumber: ElementRef;
  @ViewChild('maxNumber') maxNumber: ElementRef;
  minAmount: number = 200;
  maxAmount: number = 400;
  dragging = false;
  draggingMax = false;
  minSignOffset: number = 0;
  offset: any;
  fixAccident: any;
  finalNum: any;
  maxRight:any;
  maxRight2:any;

  constructor() {
  }

  ngOnInit() {
    this.maxRight2 = this.lineDoubleSlider.nativeElement.offsetWidth - this.maxSign.nativeElement.offsetWidth;
    this.maxSign.nativeElement.style.left = this.maxRight2 + 'px';
  }
  // minimum mark
  onmousedown(e) {
    this.minSignOffset = e.clientX - this.minSign.nativeElement.offsetLeft;
    this.dragging = true;
  }
  onmouseup() {
    this.dragging = false;
  }
  onmousewheel(e) {
    if (this.dragging) {
      this.offset = e.clientX - this.lineDoubleSlider.nativeElement.offsetLeft - this.minSignOffset;
      this.fixAccident = this.maxSign.nativeElement.offsetLeft;
      if (this.offset < 0) {
        this.offset = 0;
        this.maxSign.nativeElement.style.zIndex = '2'; // fix z-index bug
      }
      else if (this.offset > this.fixAccident) {
        this.offset = this.fixAccident;
        this.maxSign.nativeElement.style.zIndex = '0'; // fix z-index bug
      }
      this.maxRight = this.lineDoubleSlider.nativeElement.offsetWidth - this.minSign.nativeElement.offsetWidth;
      this.minSign.nativeElement.style.left = this.offset + "px";
      this.finalNum = (this.offset * ((this.maxAmount - this.minAmount) / this.maxRight)) + this.minAmount;
      this.finalNum = parseInt(this.finalNum.toString());
      this.minNumber.nativeElement.innerHTML = this.finalNum.toString();
    }
  }
  // maximum mark
  onmousedownMax(e) {
    this.minSignOffset = e.clientX - this.maxSign.nativeElement.offsetLeft;
    this.draggingMax = true;
  }
  onmouseupMax() {
    this.draggingMax = false;
  }
  onmousewheelMax(e) {
    if (this.draggingMax) {
      this.offset = e.clientX - this.lineDoubleSlider.nativeElement.offsetLeft - this.minSignOffset;
      this.fixAccident = this.minSign.nativeElement.offsetLeft;
      if (this.offset < this.fixAccident) {
        this.offset = this.fixAccident;
        this.maxSign.nativeElement.style.zIndex = '2'; // fix z-index bug
      }
      else if (this.offset > this.maxRight2) {
        this.offset = this.maxRight2;
        this.maxSign.nativeElement.style.zIndex = '0'; // fix z-index bug
      }
      this.maxSign.nativeElement.style.left = this.offset + "px";
      this.finalNum = (this.offset * ((this.maxAmount - this.minAmount) / this.maxRight2)) + this.minAmount;
      this.finalNum = parseInt(this.finalNum.toString());
      this.maxNumber.nativeElement.innerHTML = this.finalNum.toString();
    }
  }
}
