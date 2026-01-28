import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-criar-referencia',
  templateUrl: './dialog-criar-referencia.component.html',
  styleUrls: ['./dialog-criar-referencia.component.css'],
})
export class DialogCriarReferenciaComponent {
  descricao: string;
  link: string;
  data: { descricao?: string; link?: string } = {};

  constructor(
    public dialogRef: MatDialogRef<DialogCriarReferenciaComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { descricao?: string; link?: string } | null
  ) {
    this.data = data ?? {};
    this.descricao = this.data.descricao || '';
    this.link = this.data.link || '';
  }

  salvar(): void {
    if (this.descricao.trim()) {
      this.dialogRef.close({ descricao: this.descricao, link: this.link });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
