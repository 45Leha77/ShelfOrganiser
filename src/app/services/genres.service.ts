import { Injectable } from '@angular/core';
import { Genre } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor() {}

  genres: Genre[] = [
    'advanture',
    'horror',
    'action',
    'comedy',
    'drama',
    'fantasy',
    'mystery',
    'romance',
    'thriller',
    'western',
    'science',
    'history',
    'detective',
  ];
}
