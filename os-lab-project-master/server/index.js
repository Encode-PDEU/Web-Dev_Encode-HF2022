const app = require("./app");
const port = process.env.PORT || 3301;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});