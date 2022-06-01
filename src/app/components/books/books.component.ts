import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Book } from 'src/app/models';
import { faClose, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteBook, loadBooks } from './state/books.actions';
import { getBooks } from './state/books.selector';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class BooksComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}
  faClose = faClose;
  faStar = faStar;
  faPlus = faPlus;

  allBooks: Book[] = [];
  books: Book[] = [];

  modalOpened = false;
  currentId!: string;

  filterForm!: FormGroup;

  loadBooksData() {
    return this.store.select(getBooks).subscribe((books) => {
      this.books = books;
      this.allBooks = books;
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
      this.books = this.allBooks.filter((book: Book) => {
        return searchValue
          ? book.title.toLowerCase().match(`${searchValue.toLowerCase()}`)
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
      this.books = this.allBooks.filter((book: Book) => {
        return status == 'all' ? true : book.status === status;
      });
    });
  }

  ngOnInit(): void {
    this.cleanQueryParams();
    this.searchByRouterParams();
    this.store.dispatch(loadBooks());
    this.loadBooksData();
    this.createFilterForm();
    this.onFilterFormStatusChange();
  }

  deleteBook(id: string) {
    this.store.dispatch(deleteBook({ id }));
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
    this.loadBooksData().unsubscribe();
    this.searchByRouterParams().unsubscribe();
  }
}
