import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public route: Router, public activatedRoute: ActivatedRoute) {}
  putSearchValueInQueryParams(value: string) {
    return this.route.navigate([], {
      queryParams: { search: `${value}` },
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
  onSubmit(search: HTMLInputElement) {
    if (search.value.length >= 1) {
      this.putSearchValueInQueryParams(search.value);
    } else {
      this.cleanQueryParams();
    }
  }
  cleanSearch(search: HTMLInputElement) {
    search.value = '';
  }
}
