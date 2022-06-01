import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CutTextPipe } from './cut-text.pipe';

@NgModule({
  declarations: [CutTextPipe],
  imports: [CommonModule],
  exports: [CutTextPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
