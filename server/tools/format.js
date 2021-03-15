function formatValidation(type, data) {
    if(!Array.isArray(type) && typeof(type) != 'object') {
        return false;
    }
    for(let i in data) {
        if(type[i] === undefined) {
            return false;
        }
        else {
            if(type[i] === Array) {
                if(!Array.isArray(data[i])) {
                    return false;
                }
            }
            else if(type[i] === Number) {
                if(typeof(data[i]) != 'number') {
                    return false;
                }
            }
            else if (type[i] === String) {
                if (typeof(data[i]) != 'string') {
                    return false;
                }
            }
            else if(type[i] === Object) {
                if (typeof(data[i]) != 'object') {
                    return false;
                }
            }
            else if(type[i] === Boolean) {
                if (typeof(data[i]) != 'boolean') {
                    return false;
                }
            }
        }
    }
    return true;
}

module.exports = formatValidation;
