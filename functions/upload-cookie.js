const fs = require("fs");
const path = require("path");

const VALID_TOKENS = [
  "O5GZF-HMDGI-6N32S-18VGK-H6CWI-CPPB6",
];

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Solo se permite POST" }) };
  }

  try {
    const { lista, token, cookie } = JSON.parse(event.body || "{}");

    if (!VALID_TOKENS.includes(token)) {
      return { statusCode: 403, body: JSON.stringify({ error: "Token inválido" }) };
    }

    if (!lista || !cookie) {
      return { statusCode: 400, body: JSON.stringify({ error: "Faltan datos requeridos" }) };
    }

    const jsonParsed = JSON.parse(cookie);
    const filePath = path.resolve(__dirname, "../data", `${lista}.json`);
    fs.writeFileSync(filePath, JSON.stringify(jsonParsed, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true, message: `Cookie guardada como ${lista}.json` }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error al guardar cookie" }) };
  }
};
