import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

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
  letter: String;

  // Create an instance of the DataService through dependency injection
  constructor( private route: ActivatedRoute, private router: Router, private _dataService: DataService ) { }

  ngOnInit() {
    
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this._dataService.getArticlesLetterWise(params.get('letter')))
      .subscribe(res => {
        this.articles = res;
        this.letter = this.letter;
    });
  }

}
