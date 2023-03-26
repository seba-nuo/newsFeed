# NewsFeed

## Description
Frontend of NewsFeed
- login and signup users
- see news feed from [newsapi](https://newsapi.org/v2)

## Setup
```bash
git clone https://github.com/seba-nuo/newsFeed
cd newsFeed
npm i 
```
- create a enviroments.ts with the following apis
```
export const environment = {
  production: false,
  api_key: 'YOUR API KEY', // (news api) from https://newsapi.org/ 
  geo_key: 'YOUR API KEY', // (localization api) from https://opencagedata.com/users/sign_up
};
```
`npm start`

