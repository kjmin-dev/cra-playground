const { alias, aliasJest, configPaths } = require('react-app-rewire-alias');

const aliasMap = configPaths('./tsconfig.paths.json');

function overrideConfig({ usePreact = false, useJest = false } = {}) {
    return (config, env) => {
        if (usePreact || env === 'production') {
            config.resolve.alias['react'] = 'preact/compat';
            config.resolve.alias['react-dom'] = 'preact/compat';
        }
        if (useJest) {
            return aliasJest(configPaths('./tsconfig.paths.json'))(config);
        }
        return alias(configPaths('./tsconfig.paths.json'))(config);
    }
};

module.exports = overrideConfig();
module.exports.jest = overrideConfig({ usePreact: false, useJest: true });