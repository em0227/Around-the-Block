// module.exports = {
//   mongoURI:
//     "mongodb+srv://dev:5KwfzudwABxeN5MB@dev.shfnl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   secretOrKey: "6KqCpOcPnX",
//   //Make sure this is your own unique string
// };
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
