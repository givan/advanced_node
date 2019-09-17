const dns = require('dns');

dns.lookup("pluralsight.com", (err, res) => {
  console.log(`dns.lookup: ${res}`);
});

dns.resolve4("pluralsight.com", (err, res) => {
  console.log(`dns.resolve4: ${res}`);
});

dns.resolve("pluralsight.com", "MX", (err, res) => {
  console.log(`dns.resolve with (MX): ${JSON.stringify(res)}`);
});

dns.resolveMx("pluralsight.com", (err, res) => {
  console.log(`dns.resolveMx: ${JSON.stringify(res)}`);
});

dns.reverse("54.214.104.183", (err, res) => {
  console.log(`dns.reverse: ${res}`);
});

dns.resolveTxt("pluralsight.com", (err, res) => {
  console.log(`dns.resolveText: ${res}`);
});