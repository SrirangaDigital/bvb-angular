import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe, DecimalPipe]
})
export class ArticlesComponent implements OnInit {

  // Define a articles property to hold our article data
  articles: Array<any>;
  pageTitle: String;
  urlParams: ParamMap;
  articleListType: String;

  // Create an instance of the DataService through dependency injection
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private datePipe: DatePipe, private decimalPipe: DecimalPipe ) { }

  ngOnInit() {
    
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.articleListType = params.get('articleListType');
    });

    this.route.queryParamMap
      .switchMap((params: ParamMap) => {
        
        this.urlParams = params;
        return this._dataService.getArticles(this.urlParams);
      })
      .subscribe(res => {
        this.articles = res;
        this.getPageTitle(this.articleListType);
    });
  }

  getPageTitle(type) {

    switch (type) {

      case 'toc' :
        this.pageTitle = this.datePipe.transform(new Date(this.articles[0].date), 'd MMMM y') + ' (Volume ' + this.decimalPipe.transform(this.articles[0].volume) + ', Issue ' + this.articles[0].part + ')';
        break;
      case 'author' :
        this.pageTitle = 'Author > ' + this.urlParams.get('authornames');
        break;
      case 'feature' :
        this.pageTitle = 'Feature > ' + this.urlParams.get('feature');
        break;
      case 'series' :
        this.pageTitle = 'Series > ' + this.urlParams.get('series');
        break;
      case 'articlesLetterWise' :
        this.pageTitle = 'Titles';
        break;
    }
  }
}
