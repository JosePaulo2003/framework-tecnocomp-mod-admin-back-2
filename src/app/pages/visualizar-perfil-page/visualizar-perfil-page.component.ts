import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-visualizar-perfil-page',
  templateUrl: './visualizar-perfil-page.component.html',
  styleUrls: ['./visualizar-perfil-page.component.css'],
})
export class VisualizarPerfilPageComponent implements OnInit {
  user?: User;
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private apiAdmService: ApiAdmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Usuário inválido';
      this.loading = false;
      return;
    }

    // Eu estou usando o ApiAdmService direto aqui porque aparentemente cache ainda é ficção científica neste projeto.
    this.apiAdmService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.error = 'Não consegui carregar este usuário; tente novamente.';
        this.loading = false;
      },
    });
  }

  voltar(): void {
    // Sim, depois de todo esse drama eu só volto para a lista de usuários mesmo.
    this.router.navigate(['/usuarios']);
  }
}
