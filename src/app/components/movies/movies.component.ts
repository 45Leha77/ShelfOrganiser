import { Component, OnInit } from '@angular/core';
import { faClose, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { Movie } from 'src/app/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(
    private firebase: FirebaseService,
    private notifierService: NotifierService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  faClose = faClose;
  faStar = faStar;
  faPlus = faPlus;
  movies: Movie[] = [];
  allMovies: Movie[] = [];
  notifier = this.notifierService;
  modalOpened = false;
  currentId!: string;

  loadMoviesData() {
    this.firebase.getData('films').then((movies: Movie[]) => {
      this.movies = movies;
      return (this.allMovies = movies);
    });
  }
  cleanQueryParams() {
    this.route.navigate([], {
      queryParams: {
        search: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.cleanQueryParams();
    this.activatedRoute.queryParams.subscribe((params) => {
      if (!params['search']) {
        this.movies = this.allMovies;
      } else {
        this.movies = [];
        this.allMovies.forEach((movie: Movie) => {
          if (
            movie.title.toLowerCase().match(`${params['search'].toLowerCase()}`)
          ) {
            this.movies.push(movie);
          }
        });
      }
    });
    this.loadMoviesData();
  }

  deleteMovie(id: string) {
    this.allMovies.find((book: Movie) => {
      if (book.id === id) {
        this.notifier.notify('warning', `The '${book.title}' movie was deleted`);
      }
    });
    this.firebase.deleteData('films', id);
    this.closeModal();
    return this.loadMoviesData();
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
    this.currentId = '';
    this.currentId = id;
    this.modalOpened = true;
    event.stopPropagation();
  }
  closeModal() {
    if (this.modalOpened === true) {
      this.modalOpened = false;
    }
  }
}
