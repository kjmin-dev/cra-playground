const { alias, aliasJest, configPaths } = require('react-app-rewire-alias');
const swcLoader = require('swc-loader');
const aliasMap = configPaths('./tsconfig.paths.json');

function addSwcLoader(config = {}) {
    config.module.rules.push({
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
            loader: require.resolve('swc-loader'),
            options: {
                parseMap: true,
                inputSourceMap: true,
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: true
                    }
                }
            }
        }
    });
    return config;
}

function overrideConfig({ usePreact = false, useJest = false } = {}) {
    return (config, env) => {
        addSwcLoader(config);

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