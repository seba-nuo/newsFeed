import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Article } from '../../models/news.model'
import { HomeService } from './services/home.service'
import { catchError, tap } from 'rxjs';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userName!: string
  userEmail!: string
  // rate limited 💀
  articles: Article[] = []
  userSearch: Article[] = []
  userDate: Article[] = []
  buttonSelected = "local"
  userLocation!: string
  homeStatus: Status = "notTriggered"
  hideStatus = false
  searchInput = ""
  dateInput = ""
  maxDate = new Date()

  constructor(private router: Router, private titleService: Title, private homeService: HomeService) {
    this.titleService.setTitle("Home | News Feed")

    if (!this.router.getCurrentNavigation()) return

    const state = this.router.getCurrentNavigation()?.extras.state
    if (!state?.["user"]) {
      // homeService.getSession().pipe(tap(res => console.log(res))).subscribe()
      // retrive data from session?
      this.router.navigate(["/"])
      return
    }
    this.userName = state["user"].name
    this.userEmail = state["user"].email

    this.homeStatus = "checking..."
    this.homeService.getTopNews({ country: "us" })
      .pipe(
        tap(res => this.articles = res.articles),
        catchError((err) => {
          console.log(err)
          this.homeStatus = "error rateLimited";
          setTimeout(() => {
            this.hideStatus = true
          }, 2000)
          return this.homeStatus
        }))
      .subscribe(
        {
          complete: () => {
            if(this.homeStatus !== "error rateLimited") {
              this.homeStatus = "success"
            }
            setTimeout(() => {
              this.hideStatus = true
            }, 2000)
          }
        }
      )
  }

  logOut() {
    this.homeService.logOut().subscribe({
      complete: () => this.router.navigate(["/"])
    })
  }

  selected(button: string) {
    return button === this.buttonSelected ? "selected" : ""
  }

  updateSelected(button: string) {
    if (this.buttonSelected === button) return

    this.userSearch = []
    this.searchInput = ""
    this.dateInput = ""
    this.buttonSelected = button
    this.hideStatus = false
    this.homeStatus = "checking..."

    if (button === "location") {
      const success = (location: any) => {
        const { coords: { latitude, longitude } } = location
        this.homeService.getLocation(latitude, longitude).pipe(
          tap((res: any) => this.userLocation = res.results[0].components["ISO_3166-1_alpha-2"])
        ).subscribe({
          complete: () => this.getNews(this.userLocation)
        })
      }
      navigator.geolocation.getCurrentPosition(success, console.log)
    }

    if (button === "local") {
      this.getNews("mx")
    }

    if (button === "international") {
      this.getNews("us")
    }
  }

  onSearch(search: string) {
    if (search.length === 0) return
    this.userSearch = this.articles.filter(article => article.title.toLowerCase().includes(search.toLowerCase()))
  }

  getNews(country?: string) {
    this.homeService.getTopNews({ country }).pipe(
      tap(res => this.articles = res.articles), 
      catchError((err) => {
        console.log(err)
        this.homeStatus = "error rateLimited";
        setTimeout(() => {
          this.hideStatus = true
        }, 2000)
        return this.homeStatus
      }))
      .subscribe(
        {
          complete: () => {
            if(this.homeStatus !== "error rateLimited") {
              this.homeStatus = "success"
            }
            setTimeout(() => {
              this.hideStatus = true
            }, 2000)
          }
        }
      )
  }

  onInputDate(dateFromStr: string) {
    const date = new Date(dateFromStr)
    date.setDate(date.getDate() + 2)
    const dateToStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    // this.getNewsFromDate(dateFromStr, dateToStr) // I could't test it because I made too many request :(
  }

  getNewsFromDate(from: string, to: string) {
    this.hideStatus = false
    this.homeStatus = "checking..."

    this.homeService.getNewsFromDate(from, to).pipe(
      catchError(() => this.homeStatus = "error"),
      tap(res => this.dateInput = res.articles))
      .subscribe({
        complete: () => {
          setTimeout(() => {
            this.hideStatus = true
          }, 2000)
        }
      })
  }
}
