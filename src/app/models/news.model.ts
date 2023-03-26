export interface Root {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  source: Source
  author: string
  title: string
  description: any
  url: string
  urlToImage: any
  publishedAt: string
  content: any
}

export interface Source {
  id: string
  name: string
}

export interface getNewsParams {
  country?: string,
}
export interface getDateNewsParams {
  from?: string,
  to?: string
}