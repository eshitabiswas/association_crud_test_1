const Hapi = require('@hapi/hapi');
const sequelize = require('./config/sequelize');
const routes = require('./routes/router');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
// const Joi = require('joi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: '1.0',
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(routes);

    async function initializeSequelize() {
        try {
            await sequelize.authenticate();
            console.log('Connection to the database has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    initializeSequelize();
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

