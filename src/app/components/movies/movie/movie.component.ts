import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, Genre } from 'src/app/models';
import { EditedContentValidatorService } from 'src/app/services/validation/edited-content-validator.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { GenresService } from 'src/app/services/genres.service';
import {
  deleteMovie,
  editMovie,
  finishWatching,
  loadMovies,
  startWatching,
} from '../state/movies.actions';
import { Store } from '@ngrx/store';
import { getMovieById } from '../state/movies.selector';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [EditedContentValidatorService],
})
export class MovieComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public validator: EditedContentValidatorService,
    private genresService: GenresService,
    private store: Store
  ) {}

  id!: string;
  movie!: Movie;

  faClose = faClose;
  modalOpened = false;

  genres: Genre[] = this.genresService.genres;

  isEditing = false;

  ngOnInit(): void {
    this.store.dispatch(loadMovies());
    this.id = this.route.snapshot.queryParams['id'];
    this.loadMovie(this.id);
  }

  ngOnDestroy(): void {
    this.loadMovie(this.id).unsubscribe();
  }
  loadMovie(id: string) {
    return this.store.select(getMovieById, { id }).subscribe((movie) => {
      this.movie = movie;
    });
  }
  deleteMovie(id: string) {
    this.store.dispatch(deleteMovie({ id }));
    this.closeModal();
  }
  editBlock(block: any) {
    let value = block.innerText;
    if (block.value) {
      value = block.value;
    }
    const editedMovie: Movie = {
      ...this.movie,
      [block.id]: value,
    };
    this.store.dispatch(editMovie({ movie: editedMovie }));
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

  startWatching() {
    const editedMovie: Movie = {
      ...this.movie,
      status: 'inProgress',
      currentMin: '0',
    };
    this.store.dispatch(startWatching({ movie: editedMovie }));
  }
  finishWatching() {
    const editedMovie: Movie = {
      ...this.movie,
      status: 'finished',
    };
    this.store.dispatch(finishWatching({ movie: editedMovie }));
  }
  getStatusBlockColor(): string {
    if (this.movie.status === 'wish') {
      return 'rgba(11, 182, 25, 0.779)';
    }
    if (this.movie.status === 'finished') {
      return 'rgba(215, 17, 17, 0.811)';
    }
    if (this.movie.status === 'inProgress') {
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
  editGenre(id: string, input: HTMLSelectElement) {
    this.editBlock(input);
  }

  openEditingForm() {
    this.isEditing = true;
  }
  closeEditingForm() {
    this.isEditing = false;
  }
}
