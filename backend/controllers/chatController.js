const asyncHandler = require("express-async-handler");

const test = asyncHandler(async (req, res) => {
  const {} = req.body;
  console.log("test");
});
