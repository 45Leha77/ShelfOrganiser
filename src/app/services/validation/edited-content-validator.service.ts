import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditedContentValidatorService {
  constructor() {}
  isValidTitle(event: any) {
    return event.target.innerText.length >= 1;
  }
  isValidYear(event: any) {
    return /^[12][0-9]{3}$/g.test(event.target.innerText);
  }
  isValidGenre(event: any) {
    return (
      event.target.innerText ===
      ('advanture' ||
        'horror' ||
        'action' ||
        'comedy' ||
        'drama' ||
        'fantasy' ||
        'mystery' ||
        'romance' ||
        'thriller' ||
        'western' ||
        'science' ||
        'history')
    );
  }
  isValidRating(event: any) {
    return (
      Number(event.target.innerText) >= 0 &&
      Number(event.target.innerText) <= 10
    );
  }
  isValidCurrentPage(event: any) {
    return Number(event.target.innerText) >= 0;
  }
  isValidWebsite(event: any) {
    return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(
      event.target.innerText
    );
  }
}
