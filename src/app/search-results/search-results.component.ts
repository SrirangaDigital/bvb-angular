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
  articles: Array<any>;
  urlParams: ParamMap;
  articleListType: String;
  basePdfUrl: String;

  // Create an instance of the DataService through dependency injection
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService, private datePipe: DatePipe, private decimalPipe: DecimalPipe ) { }

  ngOnInit() {

  	this.route.queryParamMap
  	  .switchMap((params: ParamMap) => {
  	    
  	    this.urlParams = params;
  	    return this._dataService.getSearchResults(this.urlParams);
  	  })
  	  .subscribe(res => {
  	    this.articles = res;
  	    this.basePdfUrl = 'http://localhost:3000/pdfjs/web/viewer.html?file=../../Volumes/';
  	});
  }

}
