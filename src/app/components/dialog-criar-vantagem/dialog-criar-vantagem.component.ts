import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-criar-vantagem',
  templateUrl: './dialog-criar-vantagem.component.html',
  styleUrls: ['./dialog-criar-vantagem.component.css'],
})
export class DialogCriarVantagemComponent {
  descricao: string;
  data: { descricao?: string } = {};

  constructor(
    public dialogRef: MatDialogRef<DialogCriarVantagemComponent>,
    @Inject(MAT_DIALOG_DATA) data: { descricao?: string } | null
  ) {
    this.data = data ?? {};
    this.descricao = this.data.descricao || '';
  }

  salvar(): void {
    if (this.descricao.trim()) {
      this.dialogRef.close(this.descricao);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
