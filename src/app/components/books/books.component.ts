import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { faClose, faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  constructor(
    private firebase: FirebaseService,
    private notifierService: NotifierService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  faClose = faClose;
  faStar = faStar;
  faPlus = faPlus;
  allBooks: Book[] = [];
  books: Book[] = [];
  notifier = this.notifierService;
  modalOpened = false;
  currentId!: string;

  loadBooksData() {
    this.firebase.getData('books').then((books: Book[]) => {
      this.books = books;
      return (this.allBooks = books);
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
        this.books = this.allBooks;
      } else {
        this.books = [];
        this.allBooks.forEach((book: Book) => {
          if (
            book.title.toLowerCase().match(`${params['search'].toLowerCase()}`)
          ) {
            this.books.push(book);
          }
        });
      }
    });
    this.loadBooksData();
  }
  deleteBook(id: string) {
    this.allBooks.find((book: Book) => {
      if (book.id === id) {
        this.notifier.notify('warning', `The '${book.title}' book was deleted`);
      }
    });
    this.firebase.deleteData('books', id);
    this.closeModal();
    return this.loadBooksData();
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
}