import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result:any;
	constructor(private _http: Http) { }

	getIssueArticles(volume, issue) {
	
		return this._http.get("http://localhost:3000/api/articles/" + volume + "/" + issue)
			.map(result => this.result = result.json());
	}

	getArticlesLetterWise(letter) {
	
		return this._http.get("http://localhost:3000/api/articles/" + letter)
			.map(result => this.result = result.json());
	}
	
	getAuthorsLetterWise(letter) {
	
		return this._http.get("http://localhost:3000/api/authors/" + letter)
			.map(result => this.result = result.json());
	}

	getFeatures() {
	
		return this._http.get("http://localhost:3000/api/distinct/featid")
			.map(result => this.result = result.json());
	}
}
