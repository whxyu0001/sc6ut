require("dotenv").config();

module.exports = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  ownerID: ["1033580960882626630"],
  mongourl: process.env.MONGO_URI,
  topggapi: "",
  embedColor: process.env.C0LOR,
  logs: process.env.LOGS,
  langs: process.env.LANGS,


  nodes: [
    {
      host: process.env.NODE_HOST,
      identifer: process.env.NODE_ID,
      port: parseInt(process.env.NODE_PORT),
      password: process.env.NODE_PASSWORD,
      secure: parseBoolean(process.env.NODE_SECURE),

    }
  ],


}

function parseBoolean(value) {
  if (typeof (value) === 'string') {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}
