import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {
  @Output() positiveAnswer = new EventEmitter();
  @Output() negativeAnswer = new EventEmitter();
  @Input() blockItem!: 'book' | 'movie';

  faClose = faClose;

  constructor() {}

  ngOnInit(): void {}

  delete() {
    this.positiveAnswer.emit();
  }
  closeModal() {
    this.negativeAnswer.emit();
  }
}
