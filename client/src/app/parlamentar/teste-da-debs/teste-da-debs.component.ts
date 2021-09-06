import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teste-da-debs',
  templateUrl: './teste-da-debs.component.html',
  styleUrls: ['./teste-da-debs.component.scss']
})
export class TesteDaDebsComponent implements OnInit {

  isLoading: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.isLoading = true;
  }

  onClick(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'Sobre' });

    // todo -> this is just temporary toggling the loading so I can check the behavior
    this.isLoading = !this.isLoading;
  }

}
