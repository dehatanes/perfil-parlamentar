import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParlamentarInvestimento } from '../../shared/models/parlamentarInvestimento.model';
import { ParlamentarService } from '../../shared/services/parlamentar.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-teste-da-debs',
  templateUrl: './teste-da-debs.component.html',
  styleUrls: ['./teste-da-debs.component.scss']
})
export class TesteDaDebsComponent implements OnInit {

  parlamentar: ParlamentarInvestimento;

  isLoading: boolean;

  constructor(
    private activatedroute: ActivatedRoute,
    private parlamentarService: ParlamentarService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedroute.parent.params.pipe(take(1)).subscribe(params => {
      this.getParlamentarById(params.id);
    });
  }

  getParlamentarById(parlamentarId) {
    this.parlamentarService
      .getInvestimentoById(parlamentarId)
      .pipe(take(1))
      .subscribe(
        resp => this.handleRequestResponse(resp),
        err => this.handleRequestError(err),
      )
  }

  handleRequestResponse(resp) {
    console.log(resp);
    this.isLoading = false;
  }

  handleRequestError(error) {
    console.log('Erro ao buscar parlamentar: ', error);
    this.isLoading = false;
  }

  onClick(content): void {
    this.modalService.open(content, { ariaLabelledBy: 'Sobre' });
  }
}
