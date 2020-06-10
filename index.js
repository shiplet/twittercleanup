const Twitter = require("twitter-lite");

const CUTOFF_POINT = "2019-12-09";
const REFERENCE_DATE = Date.parse(CUTOFF_POINT);

const ACCESS_TOKEN_KEY = "";
const ACCESS_TOKEN_SECRET = "";
const CONSUMER_KEY = "";
const CONSUMER_SECRET = "";

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buildTweets() {
  let tweets;
  try {
    tweets = require("./tweet.json");
  } catch (e) {
    console.error("\n--- No tweet.json file found ---\n");
    process.exit(1);
  }

  var ids = tweets
    .sort(
      (a, b) => Date.parse(a.tweet.created_at) - Date.parse(b.tweet.created_at)
    )
    .filter((v) => Date.parse(v.tweet.created_at) <= REFERENCE_DATE)
    .reduce((acc, v) => {
      acc.push(v.tweet.id);
      return acc;
    }, []);

  var idsBatched = [];

  for (var i = 0; i < ids.length; i += 10) {
    idsBatched.push(ids.slice(i, i + 10));
  }

  return idsBatched;
}

const DeleteTweets = async () => {
  const idsBatched = buildTweets();
  const client = new Twitter({
    subdomain: "api",
    version: "1.1",
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET,
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  });

  try {
    await client.get("account/verify_credentials");
    console.log("credentials verified");
  } catch (e) {
    console.error("failed to verify creds", e);
  }

  console.log("beginning deletion");
  let counter = 0;
  let successes = 0;
  let errors = 0;

  for (var i = 0; i < idsBatched.length; i++) {
    let v = idsBatched[i];
    v.forEach(async (id, index) => {
      try {
        let deleteRes = await client.post("statuses/destroy", { id });
        successes++;
      } catch (e) {
        errors++;
      }
      counter++;
      let progress = Math.round((counter / ids.length) * 100);
      process.stdout.write(
        `\r[${"=".repeat(progress)}>${" ".repeat(100 - progress)}] ${counter} / ${ids.length} | successes: ${successes} | errors: ${errors}`
      );
    });
    await sleep(1000);
  }
};

module.exports = {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_SECRET,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  DeleteTweets
};
