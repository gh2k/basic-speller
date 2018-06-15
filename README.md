# BASIC spellchecker

[![Build Status](https://travis-ci.org/gh2k/basic-speller.svg?branch=master)](https://travis-ci.org/gh2k/basic-speller)

This is a toy project that provides a spellchecking API in node.js.

The included implementation uses the BASIC (British American Scientific 
International Commercial) dictionary as seen in 
[XKCD 1133](https://xkcd.com/1133) which limits the language used to 850 English
words, carefully selected so that they can be used to convey complex topics
with a limited vocabulary.

## API specification

Requests should be made via GET to `/spelling/[word]`, where `[word]` is the
word that you want to check. Responses will be in JSON format with the following
fields:

```json
{
  "word": "[word]",
  "valid": true
}
```
`word` will be the word that you specified, and `valid` specifies whether the
word is correctly spelled.

## Running the API

Dependencies are managed by `npm`. The project can be installed and run by the
commands:
```bash
npm install
npm start
```
This will start an API server on localhost, port 8080.

## Example implementation

In the root of the included server is an example HTML implementation that
allows you to type words and will query the API for the response. Once the
server is running, you can access this on 
[http://localhost:8080/](http://localhost:8080/).

## Docker

You can run this project as a container by using the supplied Dockerfile by
saying:
```bash
docker build -t basicspeller .
docker run -p 8080:8080 basicspeller
```

Or, run directly from Dockerhub:

```bash
docker run -p 8080:8080 gh2k/basic-speller
```

## Contributing

There are unit tests for all API methods. Please see the `tests` directory.
These can be run using `npm test`. It's the usual drill:

* Fork the repository
* Make some changes and write some tests
* Ensure tests pass
* Submit a pull request

### Gratuitous XKCD comic

![up goer five](https://imgs.xkcd.com/comics/up_goer_five.png)
