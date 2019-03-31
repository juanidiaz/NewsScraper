# News Scraper
![Logo](./images/logo.png)

> **Cretaed by:**     Juan I Diaz (jdi@idiaz.ca)

> **Date:**           March/April 2019

## DESCRIPTION
This **FULL STACK** project is a news scraper that will extract 20 of the latest "top sptories" in [CBC News](https://www.cbc.ca) (Canadian Broadcast Corporation) [RSS feed](https://www.cbc.ca/cmlink/rss-topstories) using node.js and other packages and frameworks. The result of the scraping will be saved in a non sequencial database (MongoDB). Once displayed, the articles can be saved and the user can add comments. These comments are kept in the database and can be read by other users.

## INSTRUCTIONS
- This project has been deployed to Heroku, please enter to access https://idiaz-scraper.herokuapp.com/ to see the project.
1. If the site doesnt show any stories click on the (red) `"GET NEW ARTICLES!!!"` button to get the latest 20 top stories.
2. Once the stories have been extracted, will be presented in the landing page showing their category, thumbnail image, title and author.
3. Along with the information mentioned above, there will be a link to `GO TO ARTICLE` (to read the actual article) and to `SAVE ARTICLE`. This last, will allow the user to `SEE COMMENTS ` posted on this story.
4. When an articlo is saved and the `SEE COMMENTS` is clicked, a second window (a modal) will display any old comments for this story as well as the option to add a new comment. In this window the user can delete any of the past comments.

- There is a direct API link to receive *(in JSON format)* all the news stories in the system. If needed just add `/all` to the end of the URL. 

## SCREENSHOTS
`Home page with news`
![Survey](./images/withNews.png)

`Home page with no news`
![Home page](./images/noNews.png)

`Saving an article`
![Home page](./images/saveArticle.png)

`Comments modal`
![Survey](./images/modal.png)

`JSON output for all articles`
![Meet your match](./images/JSON.png)

## BUILDING TOOLS
- FRONT END
    - HTML, CSS
    - Javascript and jQuery
    - Bootstrap
- BACK END
    - node.js
    - Express
    - Handlebars
    - Mongoose
    - Axios
    - Cheerio
    - DotEnv
    - NodeMon
- Deployment
    - Mongo DB (mLab MongoDB)
    - Heroku

## QUESTIONS OR COMMENTS
- Feel free to contact the developer @ <jdi@idiaz.ca>!
- See the project [live](https://idiaz-scraper.herokuapp.com/).