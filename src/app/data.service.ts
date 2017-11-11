import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result:any;
	constructor(private _http: Http) { }

	getIssueArticles() {
	
		return this._http.get("http://localhost:3000/api/articles/001/01")
			.map(result => this.result = result.json());
	}
}
