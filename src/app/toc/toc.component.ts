import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TocComponent implements OnInit {

  // Define a articles property to hold our article data
  articles: Array<any>;
  volume: String;
  part: String;
  date: Date;

  // Create an instance of the DataService through dependency injection
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService ) { }

  ngOnInit() {
    
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getIssueArticles(params.get('volume'), params.get('part')))
      .subscribe(res => {
        this.articles = res;
        this.volume = this.articles[0].volume;
        this.part = this.articles[0].part;
        this.date = new Date(this.articles[0].date);
    });
  }

}
