import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalWindowComponent } from './modal-window.component';

@NgModule({
  declarations: [ModalWindowComponent],
  imports: [FontAwesomeModule],
  exports: [ModalWindowComponent],
})
export class ModalWindowModule {}
