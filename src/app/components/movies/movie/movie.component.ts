import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie,Genre, Status } from 'src/app/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EditedContentValidatorService } from 'src/app/services/validation/edited-content-validator.service';
import { NotifierService } from 'angular-notifier';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { GenresService } from 'src/app/services/genres.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    public validator: EditedContentValidatorService,
    private notifierService: NotifierService,
    private genresService: GenresService,
    private router: Router
  ) {}
  id!: string;
  movie!: Movie;
  currentStatus!: Status;
  notifier = this.notifierService;
  faClose = faClose;
  modalOpened = false;
  currentId!: string;
  genres: Genre[] = this.genresService.genres;

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.loadMovie(this.id);
  }
  loadMovie(id: string) {
    this.firebase.getSingleDataItem('films', id).then((movie: Movie) => {
      this.movie = movie;
      this.currentStatus = this.movie.status;
    });
  }
  deleteMovie(id: string) {
    this.firebase.deleteData('films', id);
    this.closeModal();
    this.router.navigate(['/movies']);
  }
  editBlock(doc: string, id: string, block: HTMLElement) {
    this.firebase.updateData(doc, id, {
      [block.id]: block.innerText,
    });
    this.notifier.notify(
      'success',
      `${block.id[0].toUpperCase() + block.id.slice(1)} was succesfully edited`
    );
  }
  editInputBlock(doc: string, id: string, input: HTMLSelectElement) {
    this.firebase.updateData(doc, id, {
      [input.id]: input.value,
    });
    this.notifier.notify(
      'success',
      `${input.id[0].toUpperCase() + input.id.slice(1)} was succesfully edited`
    );
  }
  permitEdit(event: any) {
    event.target.contentEditable = 'true';
  }
  stopEditing(event: any, id: string, validation?: any) {
    if (validation === false) {
      location.reload();
      return;
    }
    this.editBlock('films', id, event.target);
    event.target.contentEditable = 'false';
    this.loadMovie(id);
  }
  updateMovieStatus(id: string) {
    this.firebase.updateData('films', id, {
      status: this.currentStatus,
      currentMin: 0,
    });
  }
  startReading() {
    this.currentStatus = 'inProgress';
    this.movie.currentMin = '0';
    this.updateMovieStatus(this.id);
    this.loadMovie(this.id);
    this.notifier.notify(
      'info',
      `You just started watching the '${this.movie.title}' movie. Keep it up!`
    );
  }
  finishReading() {
    this.currentStatus = 'finished';
    this.updateMovieStatus(this.id);
    this.loadMovie(this.id);
    this.notifier.notify(
      'success',
      `You finished watching the '${this.movie.title}' movie. Well done!`
    );
  }
  getStatusBlockColor(): string {
    if (this.currentStatus === 'wish') {
      return 'rgba(11, 182, 25, 0.779)';
    }
    if (this.currentStatus === 'finished') {
      return 'rgba(215, 17, 17, 0.811)';
    }
    if (this.currentStatus === 'inProgress') {
      return 'rgb(219, 144, 5)';
    } else {
      throw new Error('Wrong status');
    }
  }
  openModal(id: string, event: any) {
    this.currentId = '';
    this.currentId = id;
    this.modalOpened = true;
    event.stopPropagation();
  }
  closeModal() {
    this.modalOpened = false;
  }
  editGenre(id: string, input: HTMLSelectElement) {
    this.editInputBlock('films', id, input);
  }
}
