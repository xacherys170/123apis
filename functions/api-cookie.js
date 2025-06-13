const fs = require("fs");
const path = require("path");

const VALID_TOKENS = [
  "O5GZF-HMDGI-6N32S-18VGK-H6CWI-CPPB6",
];

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;
  const action = params.action;
  const lista = params.lista;
  const token = params.api_token;

  if (!VALID_TOKENS.includes(token)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ status: false, error: "Token inválido" }),
    };
  }

  if (action !== "cookie") {
    return {
      statusCode: 400,
      body: JSON.stringify({ status: false, error: "Acción inválida" }),
    };
  }

  try {
    const filePath = path.resolve(__dirname, "../data", `${lista}.json`);
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ status: false, error: "Lista no encontrada" }),
      };
    }

    const data = fs.readFileSync(filePath, "utf-8");
    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: false, error: "Error interno" }),
    };
  }
};
