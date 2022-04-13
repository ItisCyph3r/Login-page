const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const lodash = require('lodash')
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let passErrorMsg = '<i class="fa-solid fa-triangle-exclamation"></i> Wrong password.'
// Try again or click ‘Forgot password’ to reset it.
let errorIcon = '&nbsp <i class="fa-solid fa-triangle-exclamation"></i> That email is taken.'
async function main() {
    await mongoose.connect('mongodb://localhost:27017/userDB');
}

main().catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    // first_name: {
    //     type: String,
    //     required: true
    // },
    // last_name: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: Infinity,
        required: true
    }
})

const User = mongoose.model('User', userSchema);



app.get('/', (req, res) => {
    res.render('login', {
        'error': ''
    });
})

app.post('/', (req, res, next) => {
    User.find((error, data) => {
        if(error) {
            // console.log(error)
        } else {
            data.forEach(users => {
                if(users.email === req.body.email && users.password === req.body.password){
                    res.redirect('/signup')
                    console.log('gg')
                }
                // } else{
                //     console.log('ffs')
                // }
            })
            res.render('login', {'error': passErrorMsg})
        }
    })
    // res.redirect('/')
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        'error': '',
        'pass_error': ''
    });
})

app.post('/signup', (req, res) => {
    const details = new User({})

    function getData(email, password, password2){
        details.email = email.toLowerCase()

        if (password === password2) {
            details.password = password
        } else{
            res.render('signup', {
                'error': '',
                'pass_error': 'Password does not match'
            })
        }
    }

    getData(req.body.email, req.body.password, req.body.password2)
    
    console.log(details)

    User.find({email : req.body.email}, (err, docs) => {
        if (docs.length){
            res.render('signup', {
                'error': errorIcon,
                'pass_error': ''
            })
            console.log('user exists')
        }   else{  
            details.save((err) => {
                if(err)
                    return console.log(err)
                else
                    console.log('Successful') 
                    res.redirect('/')
                    
            });
        }
    });
})

app.get('/:postId', (req, res) => {
    let reqUrl = lodash.lowerCase(req.params.postId)
})

app.listen(process.env.YOUR_PORT || process.env.PORT || port, () => {
    console.log('Listening to server on port ' + port)
})