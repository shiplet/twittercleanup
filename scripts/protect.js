const cleanup = require("../index");

if (
  cleanup.ACCESS_TOKEN_KEY !== "" ||
  cleanup.ACCESS_TOKEN_SECRET !== "" ||
  cleanup.CONSUMER_KEY !== "" ||
  cleanup.CONSUMER_SECRET !== ""
) {
  console.error("\n --- REFUSING TO COMMIT: SECRETS PRESENT --- \n");
  process.exit(1);
} else {
  process.exit(0);
}
