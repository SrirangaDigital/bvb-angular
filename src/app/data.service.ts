import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result:any;
	constructor(private _http: Http) { }

	getIssueArticles(volume, part) {
	
		return this._http.get("http://localhost:3000/api/articles?volume=" + volume + "&part=" + part)
			.map(result => this.result = result.json());
	}

	getArticlesLetterWise(letter) {
	
		return this._http.get("http://localhost:3000/api/articles?title=@^" + letter)
			.map(result => this.result = result.json());
	}
	
	getAuthorsLetterWise(letter) {
	
		return this._http.get("http://localhost:3000/api/authors/" + letter)
			.map(result => this.result = result.json());
	}

	getFeaturesList() {
	
		return this._http.get("http://localhost:3000/api/distinct/featid")
			.map(result => this.result = result.json());
	}

	getSeriesList() {
	
		return this._http.get("http://localhost:3000/api/distinct/seriesid")
			.map(result => this.result = result.json());
	}
}
