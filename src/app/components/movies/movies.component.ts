import { Component, OnDestroy, OnInit } from '@angular/core';
import { faClose, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMovies } from './state/movies.selector';
import { deleteMovie, loadMovies } from './state/movies.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}
  faClose = faClose;
  faStar = faStar;
  faPlus = faPlus;

  movies: Movie[] = [];
  allMovies: Movie[] = [];

  modalOpened = false;
  currentId!: string;

  filterForm!: FormGroup;

  loadMoviesData() {
    return this.store.select(getMovies).subscribe((movies) => {
      this.movies = movies;
      this.allMovies = movies;
    });
  }
  cleanQueryParams() {
    return this.route.navigate([], {
      queryParams: {
        search: null,
      },
      queryParamsHandling: 'merge',
    });
  }
  searchByRouterParams() {
    return this.activatedRoute.queryParams.subscribe((params) => {
      let searchValue = params['search'];
      this.movies = this.allMovies.filter((movie: Movie) => {
        return searchValue
          ? movie.title.toLowerCase().match(`${searchValue.toLowerCase()}`)
          : true;
      });
    });
  }

  createFilterForm() {
    this.filterForm = new FormGroup({
      status: new FormControl('all'),
    });
  }
  onFilterFormStatusChange() {
    return this.filterForm.get('status')?.valueChanges.subscribe((status) => {
      this.movies = this.allMovies.filter((movie: Movie) => {
        return status == 'all' ? true : movie.status === status;
      });
    });
  }

  ngOnInit(): void {
    this.cleanQueryParams();
    this.searchByRouterParams();
    this.store.dispatch(loadMovies());
    this.loadMoviesData();
    this.createFilterForm();
    this.onFilterFormStatusChange();
  }

  deleteMovie(id: string) {
    this.store.dispatch(deleteMovie({ id }));
    this.closeModal();
  }

  createRangeOfStars(number: string | undefined, isForEmptyStars?: boolean) {
    let items: number[] = [];
    let num: number;
    if (isForEmptyStars) {
      num = 10 - Number(number);
    } else {
      num = Number(number);
    }
    for (let i = 1; i <= num; i++) {
      items.push(i);
    }
    return new Array(num);
  }
  openModal(id: string, event: any) {
    this.currentId = id;
    this.modalOpened = true;
    event.stopPropagation();
  }
  closeModal() {
    if (this.modalOpened === true) {
      this.modalOpened = false;
    }
  }

  ngOnDestroy(): void {
    this.loadMoviesData().unsubscribe();
    this.searchByRouterParams().unsubscribe();
  }
}
