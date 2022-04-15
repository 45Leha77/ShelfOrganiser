import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchValue!: string;
  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public firebaseService: FirebaseService
  ) {}
  ngOnInit(): void {}
  onSubmit(search: HTMLInputElement) {
    if (search.value.length >= 1) {
      this.route.navigate([], {
        queryParams: { search: `${search.value}` },
      });
    } else {
      this.cleanQueryParams();
    }
  }
  cleanQueryParams() {
    this.route.navigate([], {
      queryParams: {
        search: null,
      },
      queryParamsHandling: 'merge',
    });
  }
  cleanSearch(search: HTMLInputElement) {
    search.value = '';
  }
}
