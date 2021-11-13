# Secret Santafier - Server

This is the back-end code (along with the built React front-end) for [secretsantafier.com](https://secretsantafier.com). You can view the pre-build React code in a separate repository [here](https://github.com/eryanpatterson/secret-santafier).

The back end is a Node server that is accessed through Nginx serving as a reverse proxy. Initially I was using one location block to serve my React front-end directly through Nginx, but decided to add my front end code to my Node server instead.

The server connects to a MongoDb instance running on the same machine, and uses Mongoose for object modeling.

## Basic App Process
The basic functionality of the app is initiated when a user visits the site and creates a group. For each group member added to the database, a JSON Web Token is generated, signed, and appended to a url as a query string. That url is emailed to the group member using Nodemailer and a local smtp server set up with Postfix. The url takes the uses to /group, where useEffect in the front end code makes a fetch to verify-email. The user is served another token by the api, and it is used to add their address to the database via a POST to /api/address. Both types of tokens are added to a database collection upon creation (the tokens are checked against this collection whenever they are used through authentication middleware) and deleted at the end of the API call in which they are used. Thus both tokens are single use.

After all group members have confirmed and added their addresses, each is randomly assigned a giftee through a shuffle function. Nodemailer is then used again to send each member the name and address of their "giftee".