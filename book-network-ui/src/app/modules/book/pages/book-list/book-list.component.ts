import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../../services/services/book.service';
import {Router} from '@angular/router';
import {PageResponseBookResponse} from '../../../../services/models/page-response-book-response';
import {BookResponse} from '../../../../services/models/book-response';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{
  bookResponse: PageResponseBookResponse = {};
  page = 0;
  size = 2;
  message = '';
  level: 'success' |'error' = 'success';



  constructor(
      private bookService: BookService,
      private router: Router
  ) {
    }

  ngOnInit(): void {
      this.findAllBooks();
    }

  private findAllBooks() {
      this.bookService.findAllBooks({
        page: this.page,
        size: this.size
      })
        .subscribe({
          next: (books) => {
            this.bookResponse = books;

          }
        });
    }

  gotToPage(page: number) {
    this.page = page;
        this.findAllBooks();
    }

    goToFirstPage() {
      this.page = 0;
      this.findAllBooks();

    }

    goToPreviousPage() {

      this.page --;
          this.findAllBooks();

    }

    goToLastPage() {
      this.page = this.bookResponse.totalPages as number - 1;
      this.findAllBooks();
    }

    goToNextPage() {
      this.page++;
      this.findAllBooks();
    }

    get isLastPage() {
      return this.page === this.bookResponse.totalPages as number - 1;

    }

  borrowBook(book: BookResponse) {
      this.message = '';
      this.level = 'success';
      this.bookService.borrowBook({
        'book-id': book.id as number
      }).subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book successfully added to your list';
        },
        error: (err) => {
          console.log(err);
          this.level = 'error';
          this.message = err.error.error;
        }
      });
    }






}
