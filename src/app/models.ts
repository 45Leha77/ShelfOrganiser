export type Genre =
  | 'advanture'
  | 'horror'
  | 'action'
  | 'comedy'
  | 'drama'
  | 'fantasy'
  | 'mystery'
  | 'romance'
  | 'thriller'
  | 'western'
  | 'science'
  | 'history'
  | 'detective';

export type Status = 'wish' | 'inProgress' | 'finished';

export interface Book {
  id: string;
  title: string;
  released?: string;
  website?: string;
  description?: string;
  genre: Genre;
  rating?: string;
  status: Status;
  note?: string;
  currentPage?: string;
}

export interface Movie {
  id: string;
  title: string;
  released?: string;
  website?: string;
  description?: string;
  genre: Genre;
  rating?: string;
  trailer?: string;
  status: Status;
  note?: string;
  currentMin?: string;
}
