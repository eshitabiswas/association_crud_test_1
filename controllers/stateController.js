const stateModel = require('../models/state');
const cityModel = require('../models/city');
const { Op } = require('sequelize');
const Joi = require('joi');



const stateSaveSchema = Joi.object({
    state_name: Joi.string().required(),
    country_id: Joi.number().integer().required()
});

const savestate = async (req, h) => {
    try {
        const validationResult = stateSaveSchema.validate(req.payload);

        if (validationResult.error) {
            return h.response({ error: validationResult.error.details[0].message }).code(400);
        }

        const { state_name, country_id } = req.payload;
        const state = await stateModel.findOne({
            where: {
                state_name,
                country_id
            },
            attributes: ['id'],
            raw: true
        });

        if (state) {
            return h.response({ error: 'State name already exists' }).code(400);
        }

        const newstate = await stateModel.create({ state_name, country_id });

        if (newstate) {
            return h.response(newstate).code(200);
        } else {
            return h.response({ error: 'State cannot be added' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);
    }
};

const allStateList = async (req, h) => {
    try {
        const stateList = await stateModel.findAll({ order: [['state_name', 'ASC']] })
        if (stateList.length > 0) {
            return h.response(stateList).code(200);
        } else {
            return h.response({ error: 'State list not found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const stateListByCountry = async (req, h) => {
    try {
        const country_id = parseInt(req.params.country_id);
        const stateList = await stateModel.findAll({
            where: {
                country_id: country_id,
            },
            order: [['state_name', 'ASC']],
            raw: true

        });
        if (stateList.length > 0) {
            return h.response(stateList).code(200);
        } else {
            return h.response({ error: 'State list no found' }).code(400);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


const updateState = async (req, h) => {
    try {

        const stateIdToUpdate = parseInt(req.params.id);
  
        const newData = {
            state_name: req.payload.state_name,
            country_id: req.payload.country_id
        };

        const countryData = await stateModel.findOne({
            where: {
                state_name: req.payload.state_name,
                country_id: req.payload.country_id,
                id: {
                    [Op.ne]: stateIdToUpdate
                },
            },
            attributes: ['id'],
            raw: true
        })

        if (countryData) {
            return h.response({ error: 'State name already exist' }).code(400);
        }

        const updatedCountry = await stateModel.update(newData, {
            where: {
                id: stateIdToUpdate,
            },
        })

        if (updatedCountry) {
            return h.response({ message: "State has been updated successfully" }).code(200);
        } else {
            return h.response({ error: 'State can not updated' }).code(400);
        }

    } catch (error) {
        return h.response(error.message).code(500);

    }
};

const deleteState = async (req, h) => {
    try {
        const stateIdToDelete = parseInt(req.params.id);
        const cityContainingState = await cityModel.findOne({
            where: {
                state_id: stateIdToDelete
            },
            attributes: ['id'],
            raw: true
        });
        if (cityContainingState) {
            return h.response({ message: "Can not delete, city is assigned under this state" }).code(200);
        } else {
            const deleteCountry = await stateModel.destroy({
                where: {
                    id: stateIdToDelete
                }
            })
            return h.response({ message: "State has been deleted successfully" }).code(200);
        }
    } catch (error) {
        return h.response(error.message).code(500);

    }
};


module.exports = {
    savestate,
    stateListByCountry,
    allStateList,
    updateState,
    deleteState
};
