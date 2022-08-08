import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CutTextPipe } from './cut-text.pipe';

@NgModule({
  declarations: [CutTextPipe],
  imports: [CommonModule],
  exports: [CutTextPipe],
})
export class SharedModule {}
