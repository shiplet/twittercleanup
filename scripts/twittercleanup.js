const cleanup = require("../index");

cleanup
  .DeleteTweets()
  .then(() => {
    console.log("\nfinished");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
