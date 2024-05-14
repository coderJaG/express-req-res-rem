// DO NOT EDIT - Initialize Express, handle JSON requests
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

/**
 *  Basic Phase 1 - Plain-text response
 *     Method: GET
 *     Route: /version
 *     Response (Text): "1.0.0"
 */
app.get('/version', (req, res) => {
    res.send('1.0.0');
});

/**
 *  Basic Phase 2 - Route param and JSON response
 *      Method: GET
 *      Route: /viewers
 *      Route Parameter: id
 *      Response (JSON): user object with id, first name, last name,
 *                birth date and list of favorite movies
 *          id - route parameter
 *          firstName - string
 *          lastName - string
 *          birthDate - date (format: MM/DD/YYYY)
 *          favoriteMovies - array of strings
 *
 *  Hint: Use your name, birth date and favorite movies (as strings in the code)
 *  combined with the id sent as a route parameter in the url
 */


app.get('/viewers/:id', (req, res) => {
    let viewerId = req.params.id
    const viewer = {
        'id': viewerId,
        'firstName': 'Jamie',
        'lastName' : 'Green',
        'birthDate' : '11/12/1314',
        'favoriteMovies': ['Die hard', 'Die hard 2']
    };
    res.json(viewer);
});

/** Basic Phase 3 - Query params in URL
 *      Method: GET
 *      Route: /info
 *      Request query parameters: message
 *      Response (Text): message query parameter reflected back to the user
 *      Error Handling: If "message" is missing from the query string,
 *                      then respond with the text "message required"
 *
 *      Sample routes:
 *          /info?message=Hello, world!
 *          /info?message=
 *          /info
 *      Sample responses, respectively (as seen in the browser):
 *          Hello, world!
 *          message required
 *          message required
 */
app.get('/info', (req, res) => {
    //req.query.message?res.send(req.query.message):res.send('message required');
    let message = req.query.message;
    if (message) res.send(message)
    else res.send('message required')

})

/**
 *  IMPORTANT: Scroll to the top for basic phases.
 *
 *  Do the basic phases first. You can return to the bonus phases later for
 *  extra practice during assessment preparation.
 */

/**
 *  Advanced Bonus Phase A - Respond with a JSON object using
 *                           values from the request object
 *      Method: POST
 *      Route: /movies
 *      Request (JSON): name, year, favorite
 *          name - string
 *          year - string of 4 digits
 *          favorite - string "on", or missing (if not favorite)
 *      Response (JSON):
 *          id - random integer
 *          name - string
 *          year - integer
 *          isFavorite - boolean
 *
 *      Sample request object:
 *          { "name": "Bash", "year": "2002", "favorite": "on" }
 *      Sample response object:
 *          { "id": 7884906, "name": "Bash", "year": 2002, "isFavorite": true }
 *
 *      Alternate request object:
 *          { "name": "Honey Sweet", "year": "1967" }
 *      Alternate response object:
 *          { "id": 98765432, "name": "Honey Sweet", "year": 1967, "isFavorite": false }
 */
app.post('/movies', (req, res) => {
    let randNum = Math.random() * (1000 - 1) + 1;
    let resBody = {
        'id': randNum,
        'name': req.body.name,
        'year': Number(req.body.year),
    }
    if(req.body.favorite) resBody.isFavorite = true
    else resBody.isFavorite = false
    res.json(resBody)
}) 

/**
 *  Advanced Bonus Phase B - Research how to return static
 *                           files in a public folder
 *
 *      Use your researching skills, to figure out how to return files from
 *      a folder in your Express server.
 *
 *      If you get stuck, skip this. You will study this in more detail
 *      in a future lesson. You can come back while studying for the
 *      assessment and complete this phase for additional practice.
 *
 *      Reference: https://expressjs.com/en/starter/static-files.html
 *
 *      Test route: /logo.png
 */
 

// DO NOT EDIT - Set port and listener
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}
