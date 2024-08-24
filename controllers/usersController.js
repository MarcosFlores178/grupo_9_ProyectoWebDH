const {validationResult} = require('express-validator');
const { countries } = require('countries-list');


const usersController = {
    showLogin: (req, res) => {
        res.render('users/login');
    },

    showRegister(req, res){
        // res.render('users/register');
       
            const countryList = Object.values(countries).map(country => country.name);
            res.render('users/register', { countries: countryList });
    },
    storeUser(req,res){

    }
};

module.exports = usersController;
