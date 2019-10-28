const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card"; // make several of this for each section on the page

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        //console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        res.render('home', { people: result }); //data is a generic key
    
    })
})

//secondary route that targets each person like localhost:3000/anything
router.get('/:id', (req,res) => {
    console.log('hit a dynamic route!');
    console.log(req.params.id);

        let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`; // params will give you either 1, 2, or 3
    
        sql.query(query, (err, result) => {
            if (err) { throw err; console.log(err); }
    
            console.log(result); // should see objects wrapped in an array


            //turn our social porperty into an array - its just text in the db which isnt really anything we can work with.
            result[0].social = result[0].social.split(",").map(function(item) {
                item = item.trim(); // remove the etxra saces from each word

                return item;
            }); //chopping the words

           // console.log('after split: ', result[0]);
            // render the home view with dynamic data
          res.json(result); //data is a generic key; send the db query back to the browser
        
    })
}) // name id anything you want

module.exports = router;