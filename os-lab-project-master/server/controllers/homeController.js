// Home page route
// Just returns a JSON with a message

exports.index = (req, res) => {
    res.json({
        "message": "This is the home page"
    });
}