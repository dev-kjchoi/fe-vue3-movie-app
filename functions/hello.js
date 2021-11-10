exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: "KJCHOI",
      age: 85,
      email: "kjchoi@traderkj.com",
    }),
  };
};
