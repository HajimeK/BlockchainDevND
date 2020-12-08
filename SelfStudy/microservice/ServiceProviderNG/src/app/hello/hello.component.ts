import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  title!: string;
  price!: number;
  count!: number;
  message!: string;
  now!: Date;
  input!: string;
  text1!: string;
  myControl!: FormControl;
  myGroupControl!: FormGroup;
  myGroupControl2!: FormGroup;
  fb!: FormBuilder;

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
    this.myControl = new FormControl('ok.');
    this.fb = new FormBuilder();
    // this.myGroupControl = new FormGroup({
    //   name: new FormControl(''),
    //   mail: new FormControl(''),
    //   age: new FormControl('')
    // });
    this.myGroupControl = this.fb.group({
      name: new FormControl(''),
      mail: new FormControl(''),
      age: new FormControl('')
    });
    this.myGroupControl2 = new FormGroup({
      control: new FormControl('')
    });
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

  doClick2() {
    this.message = 'You typed: ' + this.myControl.value
  }

  onSubmit() {
    let result = this.myGroupControl.value;
    this.message = JSON.stringify(result);
  }
  onSubmit2() {
    let result = this.myGroupControl2.value;
    this.message = JSON.stringify(result);
  }
}
