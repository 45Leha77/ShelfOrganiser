import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, Genre } from 'src/app/models';
import { EditedContentValidatorService } from 'src/app/services/validation/edited-content-validator.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { GenresService } from 'src/app/services/genres.service';
import { Store } from '@ngrx/store';
import {
  deleteBook,
  editBook,
  finishReading,
  loadBooks,
  startReading,
} from '../state/books.actions';
import { getBookById } from '../state/books.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [EditedContentValidatorService],
})
export class BookComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public validator: EditedContentValidatorService,
    private genresService: GenresService,
    private store: Store<AppState>
  ) {}
  id!: string;
  book!: Book;

  faClose = faClose;
  modalOpened = false;

  genres: Genre[] = this.genresService.genres;

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
    this.id = this.route.snapshot.queryParams['id'];
    this.loadBook(this.id);
  }
  ngOnDestroy(): void {
    this.loadBook(this.id).unsubscribe();
  }
  loadBook(id: string) {
    return this.store.select(getBookById, { id }).subscribe((book) => {
      this.book = book;
    });
  }
  deleteBook(id: string) {
    this.store.dispatch(deleteBook({ id }));
    this.closeModal();
  }
  editBlock(block: any) {
    let value = block.innerText;
    if (block.value) {
      value = block.value;
    }
    const editedBook: Book = {
      ...this.book,
      [block.id]: value,
    };
    this.store.dispatch(editBook({ book: editedBook }));
  }
  permitEdit(event: any) {
    event.target.contentEditable = 'true';
  }
  stopEditing(event: any, id: string, validation?: any) {
    if (validation === false) {
      location.reload();
      return;
    }
    this.editBlock(event.target);
    event.target.contentEditable = 'false';
  }
  startReading() {
    const editedBook: Book = {
      ...this.book,
      status: 'inProgress',
      currentPage: '0',
    };
    this.store.dispatch(startReading({ book: editedBook }));
  }
  finishReading() {
    const editedBook: Book = {
      ...this.book,
      status: 'finished',
    };
    this.store.dispatch(finishReading({ book: editedBook }));
  }
  getStatusBlockColor(): string {
    if (this.book.status === 'wish') {
      return 'rgba(11, 182, 25, 0.779)';
    }
    if (this.book.status === 'finished') {
      return 'rgba(215, 17, 17, 0.811)';
    }
    if (this.book.status === 'inProgress') {
      return 'rgb(219, 144, 5)';
    } else {
      throw new Error('Wrong status');
    }
  }
  openModal(event: any) {
    this.modalOpened = true;
    event.stopPropagation();
  }
  closeModal() {
    this.modalOpened = false;
  }
  test(input: HTMLSelectElement) {
    this.editBlock(input);
  }
}
