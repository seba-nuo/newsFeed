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
  articles: Article[] = [
    { "source": { "id": "google-news", "name": "Google News" }, "author": "ESPN", "title": "Liga MX Femenil: América domina y rompe el invicto de Chivas - ESPN", "description": null, "url": "https://news.google.com/rss/articles/CBMidGh0dHBzOi8vd3d3LmVzcG4uY29tLm14L2Z1dGJvbC9tZXhpY28vbm90YS9fL2lkLzExODA2MTIzL2xpZ2EtbXgtZmVtZW5pbC1hbWVyaWNhLWRvbWluYS15LXJvbXBlLWVsLWludmljdG8tZGUtY2hpdmFz0gGBAWh0dHBzOi8vd3d3LmVzcG4uY29tLm14L2Z1dGJvbC9tZXhpY28vbm90YS9fL2lkLzExODA2MTIzL2xpZ2EtbXgtZmVtZW5pbC1hbWVyaWNhLWRvbWluYS15LXJvbXBlLWVsLWludmljdG8tZGUtY2hpdmFzP3BsYXRmb3JtPWFtcA?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T03:06:59Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "FoxSports", "title": "VIDEO: El primer gol de Alejandro Zendejas con Estados Unidos en la victoria sobre Granada - FoxSports", "description": null, "url": "https://news.google.com/rss/articles/CBMiggFodHRwczovL3d3dy5mb3hzcG9ydHMuY29tLm14LzIwMjMvMDMvMjQvdmlkZW8tZWwtcHJpbWVyLWdvbC1kZS1hbGVqYW5kcm8temVuZGVqYXMtY29uLWVzdGFkb3MtdW5pZG9zLWVuLWxhLXZpY3RvcmlhLXNvYnJlLWdyYW5hZGEv0gEA?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T02:21:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Mundo Sano", "title": "Joven sufre una hemorragia cerebral durante vacaciones en Cabo San Lucas y le encuentran un tumor - Mundo Sano", "description": null, "url": "https://news.google.com/rss/articles/CBMimwFodHRwczovL3d3dy5tdW5kb3Nhbm8uY29tL2VuZmVybWVkYWRlcy9Kb3Zlbi1zdWZyZS11bmEtaGVtb3JyYWdpYS1jZXJlYnJhbC1kdXJhbnRlLXZhY2FjaW9uZXMtZW4tQ2Fiby1TYW4tTHVjYXMteS1sZS1lbmN1ZW50cmFuLXVuLXR1bW9yLTIwMjMwMzI0LTAwMTYuaHRtbNIBmwFodHRwczovL3d3dy5tdW5kb3Nhbm8uY29tL2VuZmVybWVkYWRlcy9Kb3Zlbi1zdWZyZS11bmEtaGVtb3JyYWdpYS1jZXJlYnJhbC1kdXJhbnRlLXZhY2FjaW9uZXMtZW4tQ2Fiby1TYW4tTHVjYXMteS1sZS1lbmN1ZW50cmFuLXVuLXR1bW9yLTIwMjMwMzI0LTAwMTYuaHRtbA?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T01:51:35Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Universal", "title": "“No tenía donde esconderme”: hombre queda en medio de balacera entre policía y ladrón en la GAM - El Universal", "description": null, "url": "https://news.google.com/rss/articles/CBMihgFodHRwczovL3d3dy5lbHVuaXZlcnNhbC5jb20ubXgvbWV0cm9wb2xpL25vLXRlbmlhLWRvbmRlLWVzY29uZGVybWUtaG9tYnJlLXF1ZWRhLWVuLW1lZGlvLWRlLWJhbGFjZXJhLWVudHJlLXBvbGljaWEteS1sYWRyb24tZW4tbGEtZ2FtL9IBlQFodHRwczovL3d3dy5lbHVuaXZlcnNhbC5jb20ubXgvbWV0cm9wb2xpL25vLXRlbmlhLWRvbmRlLWVzY29uZGVybWUtaG9tYnJlLXF1ZWRhLWVuLW1lZGlvLWRlLWJhbGFjZXJhLWVudHJlLXBvbGljaWEteS1sYWRyb24tZW4tbGEtZ2FtLz9vdXRwdXRUeXBlPWFtcA?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T01:39:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Revista Semana", "title": "Los síntomas más comunes que advierten que se padece de hígado graso - Revista Semana", "description": null, "url": "https://news.google.com/rss/articles/CBMieWh0dHBzOi8vd3d3LnNlbWFuYS5jb20vdmlkYS1tb2Rlcm5hL2FydGljdWxvL2xvcy1zaW50b21hcy1tYXMtY29tdW5lcy1xdWUtYWR2aWVydGVuLXF1ZS1zZS1wYWRlY2UtZGUtaGlnYWRvLWdyYXNvLzIwMjMxOC_SAX1odHRwczovL3d3dy5zZW1hbmEuY29tL2FtcC92aWRhLW1vZGVybmEvYXJ0aWN1bG8vbG9zLXNpbnRvbWFzLW1hcy1jb211bmVzLXF1ZS1hZHZpZXJ0ZW4tcXVlLXNlLXBhZGVjZS1kZS1oaWdhZG8tZ3Jhc28vMjAyMzE4Lw?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T01:24:11Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "DW Español", "title": "Deutsche Bank desata el pánico financiero - DW Español", "description": null, "url": "https://news.google.com/rss/articles/CCAiC3FseDBBdG1udFRNmAEB?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T01:15:02Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Uno TV Noticias", "title": "Desaparecen tres hermanas menores de edad en Guerrero - Uno TV Noticias", "description": null, "url": "https://news.google.com/rss/articles/CBMia2h0dHBzOi8vd3d3LnVub3R2LmNvbS9lc3RhZG9zL2d1ZXJyZXJvL2Rlc2FwYXJlY2VuLXRyZXMtaGVybWFuYXMtbWVub3Jlcy1lbi1ndWVycmVyby1tYXJpc2VsYS1rYXJlbi1hbmdlbGEv0gEA?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T01:07:59Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "LatinUs", "title": "INE abre investigación contra Morena por posible comercialización de “delfinitas” y “amlitos” - LatinUs", "description": null, "url": "https://news.google.com/rss/articles/CBMiaGh0dHBzOi8vbGF0aW51cy51cy8yMDIzLzAzLzI0L2luZS1hYnJlLWludmVzdGlnYWNpb24tbW9yZW5hLXBvc2libGUtY29tZXJjaWFsaXphY2lvbi1kZWxmaW5pdGFzLWFtbGl0b3Mv0gFsaHR0cHM6Ly9sYXRpbnVzLnVzLzIwMjMvMDMvMjQvaW5lLWFicmUtaW52ZXN0aWdhY2lvbi1tb3JlbmEtcG9zaWJsZS1jb21lcmNpYWxpemFjaW9uLWRlbGZpbml0YXMtYW1saXRvcy9hbXAv?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T00:37:21Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Financiero", "title": "‘Frenan’ todo el Plan B del INE: Corte otorga suspensión vs. reforma de AMLO - El Financiero", "description": null, "url": "https://news.google.com/rss/articles/CBMiZWh0dHBzOi8vd3d3LmVsZmluYW5jaWVyby5jb20ubXgvbmFjaW9uYWwvMjAyMy8wMy8yNC9wbGFuLWItcmVmb3JtYS1lbGVjdG9yYWwtY29ydGUtb3RvcmdhLXN1c3BlbnNpb24v0gFlaHR0cHM6Ly93d3cuZWxmaW5hbmNpZXJvLmNvbS5teC9uYWNpb25hbC8yMDIzLzAzLzI0L3BsYW4tYi1yZWZvcm1hLWVsZWN0b3JhbC1jb3J0ZS1vdG9yZ2Etc3VzcGVuc2lvbi8?oc=5", "urlToImage": null, "publishedAt": "2023-03-25T00:34:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "SensaCine México", "title": "Novia de Daniel Radcliffe estaría embarazada y fans de Harry Potter mueren de amor - SensaCine México", "description": null, "url": "https://news.google.com/rss/articles/CBMiOWh0dHBzOi8vd3d3LnNlbnNhY2luZS5jb20ubXgvbm90aWNpYXMvbm90aWNpYS0xMDAwMDE3ODcyL9IBPWh0dHBzOi8vd3d3LnNlbnNhY2luZS5jb20ubXgvYW1wL25vdGljaWFzL25vdGljaWEtMTAwMDAxNzg3Mi8?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T23:31:35Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Universal", "title": "Evangelina Hernández Duarte confirma que una mujer será quien presida el INE - El Universal", "description": null, "url": "https://news.google.com/rss/articles/CBMic2h0dHBzOi8vd3d3LmVsdW5pdmVyc2FsLmNvbS5teC9uYWNpb24vZXZhbmdlbGluYS1oZXJuYW5kZXotZHVhcnRlLWNvbmZpcm1hLXF1ZS11bmEtbXVqZXItc2VyYS1xdWllbi1wcmVzaWRhLWVsLWluZS_SAYIBaHR0cHM6Ly93d3cuZWx1bml2ZXJzYWwuY29tLm14L25hY2lvbi9ldmFuZ2VsaW5hLWhlcm5hbmRlei1kdWFydGUtY29uZmlybWEtcXVlLXVuYS1tdWplci1zZXJhLXF1aWVuLXByZXNpZGEtZWwtaW5lLz9vdXRwdXRUeXBlPWFtcA?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T23:21:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Universal", "title": "Las preguntas al CEO de TikTok durante juicio en EU que se viralizaron en internet - El Universal", "description": null, "url": "https://news.google.com/rss/articles/CBMifWh0dHBzOi8vd3d3LmVsdW5pdmVyc2FsLmNvbS5teC90ZW5kZW5jaWFzL2xhcy1wcmVndW50YXMtYWwtY2VvLWRlLXRpa3Rvay1kdXJhbnRlLWp1aWNpby1lbi1ldS1xdWUtc2UtdmlyYWxpemFyb24tZW4taW50ZXJuZXQv0gGMAWh0dHBzOi8vd3d3LmVsdW5pdmVyc2FsLmNvbS5teC90ZW5kZW5jaWFzL2xhcy1wcmVndW50YXMtYWwtY2VvLWRlLXRpa3Rvay1kdXJhbnRlLWp1aWNpby1lbi1ldS1xdWUtc2UtdmlyYWxpemFyb24tZW4taW50ZXJuZXQvP291dHB1dFR5cGU9YW1w?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T23:13:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "ESPN Deportes", "title": "BARCELONA. UEFA abre una investigación al club por el caso Negreira ¿habrá sanciones? | Exclusivos - ESPN Deportes", "description": null, "url": "https://news.google.com/rss/articles/CCAiC3JfU3RhV3dzRWE0mAEB?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T23:00:21Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Quién", "title": "René Strickler y se despide de su ‘esposa’ Rebecca Jones - Quién", "description": null, "url": "https://news.google.com/rss/articles/CBMiW2h0dHBzOi8vd3d3LnF1aWVuLmNvbS9lc3BlY3RhY3Vsb3MvMjAyMy8wMy8yNC9yZW5lLXN0cmlja2xlci1kZXNwZWRpZGEtZXNwb3NhLXJlYmVjY2Etam9uZXPSAWVodHRwczovL3d3dy5xdWllbi5jb20vZXNwZWN0YWN1bG9zLzIwMjMvMDMvMjQvcmVuZS1zdHJpY2tsZXItZGVzcGVkaWRhLWVzcG9zYS1yZWJlY2NhLWpvbmVzP19hbXA9dHJ1ZQ?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T22:17:48Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "EL PAÍS", "title": "Estados Unidos y Canadá cierran un acuerdo migratorio - EL PAÍS", "description": null, "url": "https://news.google.com/rss/articles/CBMiZmh0dHBzOi8vZWxwYWlzLmNvbS9pbnRlcm5hY2lvbmFsLzIwMjMtMDMtMjQvZXN0YWRvcy11bmlkb3MteS1jYW5hZGEtY2llcnJhbi11bi1hY3VlcmRvLW1pZ3JhdG9yaW8uaHRtbNIBdWh0dHBzOi8vZWxwYWlzLmNvbS9pbnRlcm5hY2lvbmFsLzIwMjMtMDMtMjQvZXN0YWRvcy11bmlkb3MteS1jYW5hZGEtY2llcnJhbi11bi1hY3VlcmRvLW1pZ3JhdG9yaW8uaHRtbD9vdXRwdXRUeXBlPWFtcA?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T22:08:22Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Revista Semana", "title": "Jugo detox para purificar el hígado y depurar el colon de manera natural - Revista Semana", "description": null, "url": "https://news.google.com/rss/articles/CBMifWh0dHBzOi8vd3d3LnNlbWFuYS5jb20vdmlkYS1tb2Rlcm5hL2FydGljdWxvL2p1Z28tZGV0b3gtcGFyYS1wdXJpZmljYXItZWwtaGlnYWRvLXktZGVwdXJhci1lbC1jb2xvbi1kZS1tYW5lcmEtbmF0dXJhbC8yMDIzNTYv0gGBAWh0dHBzOi8vd3d3LnNlbWFuYS5jb20vYW1wL3ZpZGEtbW9kZXJuYS9hcnRpY3Vsby9qdWdvLWRldG94LXBhcmEtcHVyaWZpY2FyLWVsLWhpZ2Fkby15LWRlcHVyYXItZWwtY29sb24tZGUtbWFuZXJhLW5hdHVyYWwvMjAyMzU2Lw?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T22:02:21Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Financiero", "title": "Si México y EU pelean, delincuentes se reirán de nosotros: Rosa Icela Rodríguez - El Financiero", "description": null, "url": "https://news.google.com/rss/articles/CBMiggFodHRwczovL3d3dy5lbGZpbmFuY2llcm8uY29tLm14L25hY2lvbmFsLzIwMjMvMDMvMjQvc2ktbWV4aWNvLXktZXUtcGVsZWFuLWRlbGluY3VlbnRlcy1zZS1yZWlyYW4tZGUtbm9zb3Ryb3Mtcm9zYS1pY2VsYS1yb2RyaWd1ZXov0gGCAWh0dHBzOi8vd3d3LmVsZmluYW5jaWVyby5jb20ubXgvbmFjaW9uYWwvMjAyMy8wMy8yNC9zaS1tZXhpY28teS1ldS1wZWxlYW4tZGVsaW5jdWVudGVzLXNlLXJlaXJhbi1kZS1ub3NvdHJvcy1yb3NhLWljZWxhLXJvZHJpZ3Vlei8?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T21:51:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Financiero", "title": "Tormenta geomagnética: ¿Cómo afectará a las telecomunicaciones? - El Financiero", "description": null, "url": "https://news.google.com/rss/articles/CBMicGh0dHBzOi8vd3d3LmVsZmluYW5jaWVyby5jb20ubXgvY2llbmNpYS8yMDIzLzAzLzI0L3Rvcm1lbnRhLWdlb21hZ25ldGljYS1jb21vLWFmZWN0YXJhLWEtbGFzLXRlbGVjb211bmljYWNpb25lcy_SAXBodHRwczovL3d3dy5lbGZpbmFuY2llcm8uY29tLm14L2NpZW5jaWEvMjAyMy8wMy8yNC90b3JtZW50YS1nZW9tYWduZXRpY2EtY29tby1hZmVjdGFyYS1hLWxhcy10ZWxlY29tdW5pY2FjaW9uZXMv?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T21:42:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "El Heraldo de México", "title": "Shakira: bajo la lluvia y con vestido transparente, se filtran imágenes del video de \"Copa Vacía\" con Manuel Turizo - El Heraldo de México", "description": null, "url": "https://news.google.com/rss/articles/CBMirwFodHRwczovL2hlcmFsZG9kZW1leGljby5jb20ubXgvZXNwZWN0YWN1bG9zLzIwMjMvMy8yNC9zaGFraXJhLWJham8tbGEtbGx1dmlhLWNvbi12ZXN0aWRvLXRyYW5zcGFyZW50ZS1zZS1maWx0cmFuLWltYWdlbmVzLWRlbC12aWRlby1kZS1jb3BhLXZhY2lhLWNvbi1tYW51ZWwtdHVyaXpvLTQ5MjA1MC5odG1s0gGvAWh0dHBzOi8vaGVyYWxkb2RlbWV4aWNvLmNvbS5teC9lc3BlY3RhY3Vsb3MvMjAyMy8zLzI0L3NoYWtpcmEtYmFqby1sYS1sbHV2aWEtY29uLXZlc3RpZG8tdHJhbnNwYXJlbnRlLXNlLWZpbHRyYW4taW1hZ2VuZXMtZGVsLXZpZGVvLWRlLWNvcGEtdmFjaWEtY29uLW1hbnVlbC10dXJpem8tNDkyMDUwLmh0bWw?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T20:59:00Z", "content": null }, { "source": { "id": "google-news", "name": "Google News" }, "author": "Mediotiempo", "title": "¿A qué hora juega Mazatlán vs León? Dónde VER el partido de Liga MX HOY - Mediotiempo", "description": null, "url": "https://news.google.com/rss/articles/CBMicWh0dHBzOi8vd3d3Lm1lZGlvdGllbXBvLmNvbS9mdXRib2wvbGlnYS1teC9kb25kZS12ZXItbWF6YXRsYW4tdnMtbGVvbi1lbi12aXZvLXRyYW5zbWlzaW9uLWhveS1ncmF0aXMtbGlnYS1teC0yMDIz0gFxaHR0cHM6Ly9hbXAubWVkaW90aWVtcG8uY29tL2Z1dGJvbC9saWdhLW14L2RvbmRlLXZlci1tYXphdGxhbi12cy1sZW9uLWVuLXZpdm8tdHJhbnNtaXNpb24taG95LWdyYXRpcy1saWdhLW14LTIwMjM?oc=5", "urlToImage": null, "publishedAt": "2023-03-24T20:06:31Z", "content": null }
  ]
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
