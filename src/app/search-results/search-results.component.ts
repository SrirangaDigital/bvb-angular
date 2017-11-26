import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe, DecimalPipe]
})
export class SearchResultsComponent implements OnInit {

  // Define a articles property to hold our article data
  articles: Array<any> = [];
  urlParams: ParamMap;
  articleListType: String;
  basePdfUrl: String;

  // Create an instance of the DataService through dependency injection
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private datePipe: DatePipe, private decimalPipe: DecimalPipe ) { }

  ngOnInit() {
  

    this.route.queryParamMap
      .subscribe((params: ParamMap) => {

        this.urlParams = params;
    });

    if (this.urlParams.has('fulltext')) {

      this.getResultsByVolume(1);
      this.getResultsByVolume(2);
    }
    else {

      this.getMetadataResults();
    }
  }

  getResultsByVolume(volume) {

    return this._dataService.getTextSearchResultsByVolume(this.urlParams, volume)
     .subscribe(res => {

        this.articles = this.articles.concat(res);
        this.basePdfUrl = 'http://localhost:3000/pdfjs/web/viewer.html?file=../../Volumes/';
      });
  }

  getMetadataResults() {

    return this._dataService.getSearchResults(this.urlParams)
      .subscribe(res => {

        this.articles = res;
        this.basePdfUrl = 'http://localhost:3000/pdfjs/web/viewer.html?file=../../Volumes/';
    });
  }
}
