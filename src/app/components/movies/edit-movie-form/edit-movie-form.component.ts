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
import { Genre, Movie } from 'src/app/models';
import { GenresService } from 'src/app/services/genres.service';
import { AppState } from 'src/app/store/app.state';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { getMovieById } from '../state/movies.selector';
import { editMovie } from '../state/movies.actions';

@Component({
  selector: 'app-edit-movie-form',
  templateUrl: './edit-movie-form.component.html',
  styleUrls: ['./edit-movie-form.component.scss'],
})
export class EditMovieFormComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private genresService: GenresService
  ) {}

  @Input() id!: string;
  @Output() closeModal = new EventEmitter();
  editForm!: FormGroup;

  movie!: Movie;
  genres!: Genre[];

  faClose = faClose;

  ngOnInit(): void {
    this.genres = this.genresService.genres;
    this.loadMoviesData();
  }
  ngOnDestroy(): void {
    this.loadMoviesData().unsubscribe();
  }

  loadMoviesData() {
    return this.store
      .select<Movie>(getMovieById, { id: this.id })
      .subscribe((movie: Movie) => {
        this.movie = movie;
        if (this.movie) {
          this.createForm();
        }
      });
  }
  createForm() {
    return (this.editForm = new FormGroup({
      title: new FormControl(this.movie.title, [Validators.required]),
      description: new FormControl(this.movie.description),
      website: new FormControl(this.movie.website, [
        Validators.pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
      ]),
      rating: new FormControl(this.movie.rating, [
        Validators.min(1),
        Validators.max(10),
      ]),
      released: new FormControl(this.movie.released, [
        Validators.pattern('^[12][0-9]{3}$'),
      ]),
      genre: new FormControl(this.movie.genre, Validators.required),
    }));
  }

  onFormSubmit() {
    let edited: Movie = {
      ...this.movie,
      ...this.editForm.value,
    };
    this.store.dispatch(editMovie({ movie: edited }));
    this.stopEditing();
  }

  stopEditing() {
    this.closeModal.emit();
  }
}
