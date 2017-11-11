import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {

  // Define a articles property to hold our article data
  articles: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getarticles() method we defined
    this._dataService.getIssueArticles('001', '01')
        .subscribe(res => this.articles = res);
  }

  ngOnInit() {
  }

}
