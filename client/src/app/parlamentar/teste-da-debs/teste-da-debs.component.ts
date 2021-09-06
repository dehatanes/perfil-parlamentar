import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-da-debs',
  templateUrl: './teste-da-debs.component.html',
  styleUrls: ['./teste-da-debs.component.scss']
})
export class TesteDaDebsComponent implements OnInit {

  isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
  }

  onClick(): void {
    // todo -> this is just temporary toggling the loading so I can check the behavior
    this.isLoading = !this.isLoading;
  }

}
