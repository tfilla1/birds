const { faker } = require("@faker-js/faker");
let exclude = [
    'definitions',
    'fake',
    'unique',
    'mersenne',
    'random',
    'helpers',
    'datatype',
    'locales',
    '_locale',
    '_localeFallback',
]
// accept input of which key to go further into
// generate random once to child

//console.log(fakerObject)
//console.log(faker.address)
exports.getBirds = function() {
    var birds = []
    for (let [k, v] of Object.entries(faker)) {
        birds.push(k);
    }
    
    return birds.filter(fo => !exclude.includes(fo));

}
exports.getBirdTypes = function (value) {
    var birdTypes = [];
    for (let [k, v] of Object.entries(faker[value])) {
        birdTypes.push(k);
    }
    return birdTypes.filter(fo => !exclude.includes(fo));
}
exports.getBirdNames = function(type, value) {
    var birdNames = [];

    for (let [k, v] of Object.entries(faker[type[value]])) {
        birdNames.push(k);
    }
    return birdNames.filter(fo => !exclude.includes(fo));
}
// {
//     root: {
//         animal: {
//             dog: {

//             }
//         }
//     }
// }
