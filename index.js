require('dotenv').config();
require('subheaven-tools');

(async() => {
    let params_needed = [];

    const checkIfEnvIsConfigured = async() => {
        let params_list = JSON.parse(JSON.stringify(params_needed));
        await Object.keys(process.env).forEachAsync(async key => {
            await params_list.forEachAsync(async(item, index) => {
                if (item.name === key && process.env[key] !== '') {
                    params_list.splice(index, 1);
                }
            });
        });
        return params_list.length === 0;
    }

    const checkConfig = async() => {
        if (await checkIfEnvIsConfigured()) {
            return true
        } else {
            console.log("");
            console.log('Environment params not found! Please, edit or create a .env file in your project folder with the following params:');
            await params_needed.forEachAsync(async item => {
                console.log(`    ${item.name} = ${item.description}`);
            });
            console.log("");
            console.log('Example:');
            await params_needed.forEachAsync(async item => {
                console.log(`${item.name}=${item.sample}`);
            });
            process.exit(1);
        }
    }

    exports.addParam = async(param) => {
        params_needed.push(param);
    };
    exports.addParams = async(params) => {
        if (Array.isArray(params)) {
            params_needed = [...params_needed, ...params];
        } else {
            throw new Error("addParams(params) param need to be an array! You can try and use addParam(param) instead.");
        }
    };
    exports.config = async() => {
        return await checkConfig();
    };
})();