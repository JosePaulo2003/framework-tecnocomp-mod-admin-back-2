import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-voltar',
  templateUrl: './header-voltar.component.html',
  styleUrls: ['./header-voltar.component.css'],
})
export class HeaderVoltarComponent {
  @Input() texto: String = '';
  @Input() caminhoVoltar: String = '';

  constructor(private location: Location, private router: Router) {}

  voltarPagina() {
    if (this.caminhoVoltar) {
      this.router.navigate([this.caminhoVoltar]);
      return;
    }
    this.location.back();
  }
}
