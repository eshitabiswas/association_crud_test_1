const countryController = require('../controllers/countryController');
const stateController = require('../controllers/stateController');
const cityController = require('../controllers/cityController');
const Joi = require('joi');

const routes = [
    {
        method: 'POST',
        path: '/api/country/add',
        handler: countryController.saveCountry,
        config: {
            description: 'Save a country',
            tags: ['api', 'country-add'],
            validate: {
                payload: Joi.object({
                    country_name: Joi.string().required()
                })
            },
        },
    },
    {
        method: 'GET',
        path: '/api/country/list',
        handler: countryController.allCountryList,
        config: {
            description: 'Get a list of all countries',
            tags: ['api', 'country-list'],
        }
    },
    {
        method: 'POST',
        path: '/api/state/add',
        handler: stateController.savestate,
        config: {
            description: 'Save a state',
            tags: ['api', 'state-add'],
            validate: {
                payload: Joi.object({
                    state_name: Joi.string().required(),
                    country_id: Joi.number().integer().required(),
                })
            },
        },
    },
    {
        method: 'GET',
        path: '/api/state/list',
        handler: stateController.allStateList,
        config: {
            description: 'Get a list of all states',
            tags: ['api', 'state-list']
        }
    },
    {
        method: 'GET',
        path: '/api/state/list/by/country/{country_id}',
        handler: stateController.stateListByCountry,
        config: {
            description: 'Get a list of all states by country',
            tags: ['api', 'state-list-by-country'],
            validate: {
                params: Joi.object({
                    country_id: Joi.string().required().description('Country Id is required')
                })
            },
        }
    },
    {
        method: 'POST',
        path: '/api/city/add',
        handler: cityController.saveCity,
        config: {
            description: 'Save a city',
            tags: ['api', 'city-add'],
            validate: {
                payload: Joi.object({
                    city_name: Joi.string().required(),
                    country_id: Joi.number().integer().required(),
                    state_id: Joi.number().integer().required()
                })
            },
        }
    },
    {
        method: 'GET',
        path: '/api/city/list',
        handler: cityController.allCityList,
        config: {
            description: 'Get a list of all city',
            tags: ['api', 'city-list']
        }
    },
    {
        method: 'GET',
        path: '/api/city/list/by/state/{state_id}',
        handler: cityController.cityListByState,
        config: {
            description: 'Get a list of all city by state',
            tags: ['api', 'city-list-by-state'],
            validate: {
                params: Joi.object({
                    state_id: Joi.string().required().description('State Id is required')
                })
            },

        }
    },
    {
        method: 'PUT',
        path: '/api/country/update/{id}',
        handler: countryController.updateCountry,
        config: {
            description: 'Update a country',
            tags: ['api', 'country-update'],
            validate: {
                payload: Joi.object({
                    country_name: Joi.string().required()
                }),
                params: Joi.object({
                    id: Joi.string().required().description('Country Id is required')
                })
            },
        },
    },
    {
        method: 'DELETE',
        path: '/api/country/delete/{id}',
        handler: countryController.deleteCountry,
        config: {
            description: 'Delete country',
            tags: ['api', 'country-delete'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('Country Id is required')
                })
            },
        }
    },
    {
        method: 'PUT',
        path: '/api/state/update/{id}',
        handler: stateController.updateState,
        config: {
            description: 'Update a state',
            tags: ['api', 'state-update'],
            validate: {
                payload: Joi.object({
                    state_name: Joi.string().required(),
                    country_id: Joi.number().integer().required(),
                }),
                params: Joi.object({
                    id: Joi.string().required().description('State Id is required')
                })
            },
        },
    },
    {
        method: 'DELETE',
        path: '/api/state/delete/{id}',
        handler: stateController.deleteState,
        config: {
            description: 'Delete state',
            tags: ['api', 'state-delete'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('State Id is required')
                })
            },
        }
    },
    {
        method: 'PUT',
        path: '/api/city/update/{id}',
        handler: cityController.updateCity,
        config: {
            description: 'Update a city',
            tags: ['api', 'city-update'],
            validate: {
                payload: Joi.object({
                    city_name: Joi.string().required(),
                    country_id: Joi.number().integer().required(),
                    state_id: Joi.number().integer().required()
                }),
                params: Joi.object({
                    id: Joi.string().required().description('City Id is required')
                })
            },
        }
    },
    {
        method: 'DELETE',
        path: '/api/city/delete/{id}',
        handler: cityController.deleteCity,
        config: {
            description: 'Delete city',
            tags: ['api', 'city-delete'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().description('City Id is required')
                })
            },
        }
    },
];

module.exports = routes;




