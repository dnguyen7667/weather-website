const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {forecast} = require('../utils/forecast');



const app = express();

// set port = env value, for heroku
const port = process.env.PORT || 3000;

// set up handlebars engine and view location
const viewPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs'); // set up handle bar
app.set('views', viewPath);

// set up partials location
const partialPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialPath);


// set up static directory to serve
htmlPath = path.join(__dirname, '../public');
app.use(express.static(htmlPath)); // static will find index.html




app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name : 'Duong'

    });
});





// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Duong',
//         age: 30
//     });
// });


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'Please provide address.'});

    }
    else{
        forecast(req.query.address, (err, response) => {
            if (err) {
                return res.send({error: err});

            }

            else {
                return res.send({response});
            }
        })
        
    }
    
});


app.get('/about', (req, res) => {
    res.render("about", 
    {
        title: 'About Me',
        name: 'Duong'
    });
});


app.get('/help', (req, res) => {
    res.render("help", {})
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error: 404"
    })
})


app.listen(port, () => {
    console.log('Listening on: ' + port);
});

// jheeeeeeeeeeeookvoejvevevevvevevvev
const me = 12