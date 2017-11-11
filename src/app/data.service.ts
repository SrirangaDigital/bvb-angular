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
}
