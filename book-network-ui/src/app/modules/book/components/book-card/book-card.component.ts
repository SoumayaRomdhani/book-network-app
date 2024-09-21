import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _manage = false;
  private _bookCover: string | undefined;

  get bookCover(): string | undefined {
      if (this._book.cover) {
        return 'data:image/jpg;base64,' + this._book.cover
      }
      return 'https://bookcover4u.com/pro/Horror-full-book-cover-design-front-back-cover-and-spine-scary-dark-monster-werewolves-book-cover-forest-mysterious-dangerous-wolf-danger-horror-covers-illustration-moonlight-wild-beast-N1594710941B.jpg';
    }

  get book(): BookResponse {
      return this._book;
    }

    @Input()
    set book(value: BookResponse) {
      this._book = value;
    }

  get manage(): boolean {
      return this._manage;
    }

    @Input()
    set manage(value: boolean) {
      this._manage = value;
    }

    @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
    @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();


  onShowDetails(){
    this.details.emit(this._book);
    }
  onBorrow(){
    this.borrow.emit(this._book);
    }
  onAddToWaitingList(){
    }
  onEdit(){
    this.edit.emit(this._book);
    }
  onShare(){
    this.share.emit(this._book);
    }
  onArchive(){
    this.archive.emit(this._book);
    }

}
