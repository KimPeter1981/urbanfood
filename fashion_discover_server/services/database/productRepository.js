const fs = require('fs');

let products = fs.readFileSync('./services/database/products_aggregate.json');
products = JSON.parse(products);

// const keywordsTest = ['Shirts','Damen','kurzarm'];

const checkAggregates = (keywords) => {
    let filtered = products;
    for (i=0;i<keywords.length;i++) {
        filtered = filtered.filter(product => product.category.aggregate.includes(keywords[i]) === true);
    }
    filtered.push({numberOfElements: filtered.length});
    return filtered;
}

// checkAggregates(keywordsTest);

module.exports = {checkAggregates};