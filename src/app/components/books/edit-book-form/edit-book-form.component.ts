import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Book, Genre } from 'src/app/models';
import { GenresService } from 'src/app/services/genres.service';
import { AppState } from 'src/app/store/app.state';
import { getBookById } from '../state/books.selector';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { editBook } from '../state/books.actions';

@Component({
  selector: 'app-edit-book-form',
  templateUrl: './edit-book-form.component.html',
  styleUrls: ['./edit-book-form.component.scss'],
})
export class EditBookFormComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private genresService: GenresService
  ) {}

  @Input() id!: string;
  @Output() closeModal = new EventEmitter();
  editForm!: FormGroup;

  book!: Book;
  genres!: Genre[];

  faClose = faClose;

  ngOnInit(): void {
    this.genres = this.genresService.genres;
    this.loadBooksData();
  }
  ngOnDestroy(): void {
    this.loadBooksData().unsubscribe();
  }

  loadBooksData() {
    return this.store
      .select<Book>(getBookById, { id: this.id })
      .subscribe((book: Book) => {
        this.book = book;
        if (this.book) {
          this.createForm();
        }
      });
  }
  createForm() {
    return (this.editForm = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required]),
      description: new FormControl(this.book.description),
      website: new FormControl(this.book.website, [
        Validators.pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
      ]),
      rating: new FormControl(this.book.rating, [
        Validators.min(1),
        Validators.max(10),
      ]),
      released: new FormControl(this.book.released, [
        Validators.pattern('^[12][0-9]{3}$'),
      ]),
      genre: new FormControl(this.book.genre, Validators.required),
    }));
  }

  onFormSubmit() {
    let edited: Book = {
      ...this.book,
      ...this.editForm.value,
    };
    this.store.dispatch(editBook({ book: edited }));
    this.stopEditing();
  }

  stopEditing() {
    this.closeModal.emit();
  }
}
