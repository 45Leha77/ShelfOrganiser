import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CutTextPipe } from './cut-text.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [CutTextPipe, SafePipe],
  imports: [CommonModule],
  exports: [CutTextPipe, SafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
