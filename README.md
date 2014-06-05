# Bookie


Link to the screencast:
http://vimeo.com/97442333
https://www.youtube.com/watch?v=ZymmAkvZ8Tg


## Functional specification
> *Describe your project concretely. The project proposal should describe what core functionality your project web application intends to deliver. Don't mention every little detail and don't consider this a contract - this is for us to help you define a suitable scope in the course. Also note that this is not a contract that you should fulfil. You will be examined only on the end result.*

This project is going to be a web-based accounting software that follows the (Swedish) rules regarding book-keeping. The application will contain the main functions such as:

 *  Accounts
 *  Dashboard (current status / graphs)
 *  Reports
  *  Balance
  *    Key numbers
  *  Ledger
  ** Result
  ** Tax report
 * Vouchers
 * Years

An example of a Swedish account software (web-based) is [Fortnox](http://www.fortnox.se).

## Technical specification
> *Describe the technology basis of your project with (1) server framework, (2) client framework. Also, describe how (3) persistence with data storage and ORM or other solutions for NoSQL-type persistence and how (4) authentication will be handled (framework authentication, oAuth/openID and so forth). If you intend to implement (5) multiple clients with different functionality and if you intend to use a (6) testing framework like Selenium is very relevant and beneficial to the project grade but considered extra.*  
> *You don't need arguments for picking a framework (as long as you meet all the technical requirements in the course). Taste and desire to learn a technology is a good argument as any. Bear in mind, however, that generally frameworks are good at different things. Making intelligent framework choices is part of the course and you'll have to live with your choices.*

### 1. Server framework
Ruby on Rails 
### 2. Client framework
AngularJS
### 3. Persistance
Since the data I'm going to store works perfectly nice with a RDBMS (MySQL) I'm not going to try a NoSQL (eventhough that could be fun I feel like NoSQL is not a great choice for this app)
### 4. Authentication
The application will target companies and will have the authentication in the framework and provide LinkedIn / Facebook / Google as an alternative.
### 5. Multiple clients with different functionality and if you intend to use a 
There will be only one type of client: "Accountant" who enters vouchers and requests reports.
### 6. Testing framework like Selenium is very relevant and beneficial to the project grade but considered extra.
Testing will be done with RSpec / Karma / Jasmine (_not decided_)
