# Tech News Search

## Application info
Tech News Search allows users to search for articles from the popular website HackerNews using the same's Search API. The user types in their keywords, and returned is a list of the 40 most popular articles indexed by HackerNews. If the user wants, they may fetch more results, in increments set by the user in the search interface. The results are cached client side, so that when a user re-searches for a previously searched keyword, the results are pulled from local memory and a call to the API is not necessary. The user is able to sort the results by title, author, comment count and points amount in either ascending or descending order.

## Development info
I created this project as a code sandbox to practice and learn React. The idea for this project is from 'The Road to Learn React' by Robin Wieruch, and follows closely with the teaching concepts used in that book. It currently is my main project for implementing basic through advanced React concepts, and I will further build out its functionality as I build a better foundation in React.

This app utilizes Enzyme for unit tests, and Lodash for sorting utility.

Information about the HackerNews Search API can be found at: https://github.com/HackerNews/API

This application is hosted for public use on Heroku, and is available at https://technewssearch.herokuapp.com/
