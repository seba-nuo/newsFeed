import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../enviroments/enviroments'
import { getNewsParams } from 'src/app/models/news.model';

@Injectable({
  providedIn: 'root'
})

// todo: change any
export class HomeService {
  private sessionApiURL = "http://localhost:3000/session"
  private logoutApiURL = "http://localhost:3000/logout"
  private topNewsApiURL = "https://newsapi.org/v2/top-headlines/"
  private geoApiURL = 'https://api.opencagedata.com/geocode/v1/json'
  private everyNewsApiURL = "https://newsapi.org/v2/everything"

  constructor(private http: HttpClient) { }

  getSession(): Observable<any> {
    return this.http.get<any>(this.sessionApiURL)
  }

  logOut(): Observable<any> {
    return this.http.get<any>(this.logoutApiURL)
  }

  getTopNews(params: getNewsParams): Observable<any> {
    return this.http.get<any>(this.topNewsApiURL, {
      params: {
        apiKey: environment.api_key,
        country: params?.country ?? "MX"
      }
    })
  }

  getNewsFromDate(from: string, to: string) {
    return this.http.get<any>(this.everyNewsApiURL, {
      params: {
        apiKey: environment.api_key,
        from,
        to
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
