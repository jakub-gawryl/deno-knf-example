# KNF Data retriver

This is my first example application that runs in [deno runtime](https://deno.land). It is written just for learning purposes.

Application retive CSV formatted data from [Short Selling Register provided by KNF](https://rss.knf.gov.pl/RssOuterView/faces/start2OuterView.xhtml) and displays on frontend page.

Tech:
- Plain HTML / CSS / JavaScript for front-end stuff
- [Deno Opine framework](https://deno.land/x/opine@2.3.3) (as replacement for `express` - web application framework known from node environment)

# How to use

To run CRON task: `deno run -A cron/index.ts` or `deno task cron`

To run tasks in background mode (with save logs)
`deno run -A cron/index.ts > cron.log &`
to terminate process, see [this post on stackexchange](https://unix.stackexchange.com/questions/104821/how-to-terminate-a-background-process)

To run website with API and results preview type: `deno run -A index.ts` or `deno task start`.

# API
- See recently fetched data: `/api/short/list/:name?/:value?`
  - you can filter by `'name', 'paper' or 'date'` eg. `/api/short/list/paper/CDPROJEKT`
- Fetch and see latest data: `/api/latest/:saveKey?`
  - save key - private key, which allow to save recently fetched data to DB

# Demo

Simple demo available on: https://knf-example.deno.dev/