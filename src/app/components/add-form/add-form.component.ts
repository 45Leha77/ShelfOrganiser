import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { Genre } from 'src/app/models';
import { GenresService } from 'src/app/services/genres.service';
import { Store } from '@ngrx/store';
import { addBook } from '../books/state/books.actions';
import { addMovie } from '../movies/state/movies.actions';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  faStar = faStar;
  rating!: string;
  document!: 'films' | 'books';
  genres: Genre[] = this.genresService.genres;

  constructor(
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private genresService: GenresService,
    private store: Store
  ) {}
  form!: FormGroup;
  documentForm!: FormGroup;
  notifier = this.notifierService;

  ngOnInit(): void {
    this.document = this.route.snapshot.queryParams['doc'];
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      released: new FormControl('', [Validators.pattern('^[12][0-9]{3}$')]),
      website: new FormControl('', [
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ]),
      genre: new FormControl('', Validators.required),
      rating: new FormControl(),
    });
    this.documentForm = new FormGroup({
      document: new FormControl(`${this.document}`, [Validators.required]),
    });
  }

  setRating(value: string) {
    return (this.rating = value);
  }

  updateRating() {
    this.form.patchValue({
      rating: this.rating || '',
    });
  }

  sendData(document: string) {
    const addedItem = {
      ...this.form.value,
      status: 'wish',
    };
    if (document === 'books') {
      return this.store.dispatch(addBook({ book: addedItem }));
    }
    if (document === 'films') {
      return this.store.dispatch(addMovie({ movie: addedItem }));
    }
  }

  onSubmit(document: string) {
    this.updateRating();
    this.sendData(document);
    this.form.reset();
    this.documentForm.reset();
  }

  onDocumentChange() {
    this.document = this.documentForm.value.document;
  }
}
