import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../enviroments/enviroments'
import { newsParams } from 'src/app/models/news.model';

@Injectable({
  providedIn: 'root'
})

// todo: change any
export class HomeService {
  private sessionApiURL = "http://localhost:3000/session"
  private logoutApiURL = "http://localhost:3000/logout"
  private topNewsApiURL = "https://newsapi.org/v2/top-headlines/"
  private geoApiURL = 'https://api.opencagedata.com/geocode/v1/json'
  // private everyNewsApiURL = "https://newsapi.org/v2/everything/"

  constructor(private http: HttpClient) { }

  getSession(): Observable<any> {
    return this.http.get<any>(this.sessionApiURL)
  }

  logOut(): Observable<any> {
    return this.http.get<any>(this.logoutApiURL)
  }

  getTopNews(params: newsParams): Observable<any> {
    return this.http.get<any>(this.topNewsApiURL, {
      params: {
        apiKey: environment.api_key,
        country: params?.country ?? "MX"
      }
    })
  }

  getLocation(latitude: number, longitude: number) {
    return this.http.get(this.geoApiURL, {
      params: {
        key: environment.geo_key,
        q: encodeURIComponent(`${latitude},${longitude}`),
        pretty: 1,
        no_annotations: 1,
      }
    })
  }
}
