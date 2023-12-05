const cityModel = require('../models/city');
const States = require('../models/state');
const { Op } = require('sequelize');
const Joi = require('joi');


const citySaveSchema = Joi.object({
    city_name: Joi.string().required(),
    country_id: Joi.number().integer().required(),
    state_id: Joi.number().integer().required()
});

const saveCity = async (req, h) => {
    try {
        const validationResult = citySaveSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { city_name, country_id, state_id } = req.payload;
        const city = await cityModel.findOne({
            where: {
                city_name,
                country_id,
                state_id
            },
            attributes: ['id'],
            raw: true
        });

        if (city) {
            return h.response({ error: 'City name already exists' }).code(400);
        }

        const newCity = await cityModel.create({ city_name, country_id, state_id });

        if (newCity) {
            return h.response(newCity).code(200);
        } else {
            return h.response({ error: 'City cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const allCityList = async (req, h) => {
    try {
        const cityList = await cityModel.findAll({ order: [['city_name', 'ASC']] })
        if (cityList.length > 0) {
            return h.response(cityList).code(200);
        } else {
            return h.response({ error: 'City list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const cityListByState = async (req, h) => {
    try {
        const state_id = parseInt(req.params.state_id);
        const cityList = await cityModel.findAll({
            where: {
                state_id: state_id,
            },
            order: [['city_name', 'ASC']],
            raw: true

        });
        const cityWithState = await cityModel.findAll({
            include: {
                model: States
            },
            raw: true

        });
        // console.log(cityWithState, "cityWithState");
        if (cityList.length > 0) {
            return h.response(cityList).code(200);
        } else {
            return h.response({ error: 'City list no found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const updateCity = async (req, h) => {
    try {

        const cityIdToUpdate = parseInt(req.params.id);

        const newData = {
            city_name: req.payload.city_name,
            country_id: req.payload.country_id,
            state_id: req.payload.state_id,
        };

        const countryData = await cityModel.findOne({
            where: {
                city_name: req.payload.city_name,
                country_id: req.payload.country_id,
                state_id: req.payload.state_id,
                id: {
                    [Op.ne]: cityIdToUpdate
                },
            },
            attributes: ['id'],
            raw: true
        })

        if (countryData) {
            return h.response({ error: 'City name already exist' }).code(400);
        }

        const updatedCountry = await cityModel.update(newData, {
            where: {
                id: cityIdToUpdate,
            },
        })

        if (updatedCountry) {
            return h.response({ message: "City has been updated successfully" }).code(200);
        } else {
            return h.response({ error: 'City can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const deleteCity = async (req, h) => {
    try {
        const cityIdToDelete = parseInt(req.params.id);
        const deleteCity = await cityModel.destroy({
            where: {
                id: cityIdToDelete
            }
        })
        return h.response({ message: "City has been deleted successfully" }).code(200);
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


module.exports = {
    saveCity,
    cityListByState,
    allCityList,
    updateCity,
    deleteCity
};
