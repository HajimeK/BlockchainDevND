import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  title: string;
  price: number;
  count: number;
  message: string;
  now: Date;
  input: string;
  text1: string;

  constructor() {
    setInterval(
      ()=>{this.now = new Date();},
      1000
    );
  }

  ngOnInit(): void {
    this.title = 'Hello-app';
    this.price = 2000;
    this.count = 0;
    this.message =  "0 times clicked";
    this.now = new Date();
    this.text1 = '';
  }

  today() {
    return this.now.toLocaleString();
  }

  doClick() {
    this.message =  ++this.count + " times clicked";
  }

  doType(val:string) {
    this.input = val;
    this.message = " You typed:" + this.input;
  }
}
