const countryModel = require('../models/country');
const stateModel = require('../models/state');
const { Op } = require('sequelize');
const Joi = require('joi');


const countrySchema = Joi.object({
    country_name: Joi.string().required()
});

const saveCountry = async (req, h) => {
    try {
        const validationResult = countrySchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { country_name } = req.payload;
        const country = await countryModel.findOne({
            where: {
                country_name
            },
            attributes: ['id'],
            raw: true
        });

        if (country) {
            return h.response({ error: 'Country name already exists' }).code(400);
        }

        const newCountry = await countryModel.create({ country_name });

        if (newCountry) {
            return h.response(newCountry).code(200);
        } else {
            return h.response({ error: 'Country cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const allCountryList = async (req, h) => {
    try {
        const countryList = await countryModel.findAll({ order: [['country_name', 'ASC']] });
        if (countryList.length > 0) {
            return h.response(countryList).code(200);
        } else {
            return h.response({ error: 'Country list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


const updateCountry = async (req, h) => {
    try {

        const countryIdToUpdate = parseInt(req.params.id);

        const newData = {
            country_name: req.payload.country_name
        };

        const countryData = await countryModel.findOne({
            where: {
                country_name: req.payload.country_name,
                id: {
                    [Op.ne]: countryIdToUpdate
                },
            },
            attributes: ['id'],
            raw: true
        })

        if (countryData) {
            return h.response({ error: 'Country name already exist' }).code(400);
        }

        const updatedCountry = await countryModel.update(newData, {
            where: {
                id: countryIdToUpdate,
            },
        })

        if (updatedCountry) {
            return h.response({ message: "Country has been updated successfully" }).code(200);
        } else {
            return h.response({ error: 'Country can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const deleteCountry = async (req, h) => {
    try {
        const countryIdToDelete = parseInt(req.params.id);
        const stateContainingCountry = await stateModel.findOne({
            where: {
                country_id: countryIdToDelete
            },
            attributes: ['id'],
            raw: true
        });
        if (stateContainingCountry) {
            return h.response({ message: "Can not delete, state is assigned under this country" }).code(200);
        } else {
            const deleteCountry = await countryModel.destroy({
                where: {
                    id: countryIdToDelete
                }
            })
            return h.response({ message: "Country has been deleted successfully" }).code(200);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


module.exports = {
    saveCountry,
    allCountryList,
    deleteCountry,
    updateCountry
};
