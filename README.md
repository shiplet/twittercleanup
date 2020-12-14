# `twittercleanup`

A lightly configurable script to delete your old tweets.

Current configuration deletes all tweets sent before a certain date.

## Usage

You'll need to fill out the variables labeled `ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET` with values generated in your Twitter developers' dashboard.

You'll also need to determine a `CUTOFF_DATE` and populate that variable as well.

These variables live in `index.js`.

To get your `tweets.json`, you'll need to download all of your Twitter data via their archive tools, and then convert the `tweets.js` into JSON format.

To run:

```bash
$ yarn twittercleanup
```

## Note

There are pre-commit hooks in place to ensure you don't commit your secrets 👍
