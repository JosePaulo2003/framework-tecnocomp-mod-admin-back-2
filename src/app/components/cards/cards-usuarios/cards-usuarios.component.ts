import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/interfaces/user';
import { ConfirmacaoExclusaoComponent } from '../../confirmacao-exclusao/confirmacao-exclusao.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.css'],
})
export class CardsUsuariosComponent {
  @Input() user!: User;
  @Output() excluirUsuario = new EventEmitter<{ idAdm: number; senhaAdm: string; idExcluir: number }>();

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  abrirConfirmacaoExcluir() {
    const dialogRef = this.dialog.open(ConfirmacaoExclusaoComponent);
    dialogRef.afterClosed().subscribe((senhaAdm) => {

      if (senhaAdm) {
        this.excluirUsuario.emit({idAdm: this.getUsuarioDados().id , senhaAdm: senhaAdm , idExcluir: this.user.id});
      }
    });
  }

  getUsuarioDados(): User {
    return this.authService.getUsuarioDados();
  }

  verPerfil(userId: number) {
    // Agora existe uma página decente, então eu navego feliz para /ver-perfil/:id
    // em vez de mandar o usuário para o limbo do logout involuntário.
    this.router.navigate(['/ver-perfil', userId]);
  }
}
