const { faker } = require("@faker-js/faker");

let fakerObject = []
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
for (let [k, v] of Object.entries(faker)) {
    fakerObject.push(k);
}

export let fakerRoot = fakerObject.filter(fo => !exclude.includes(fo));
// accept input of which key to go further into
// generate random once to child

//console.log(fakerObject)
//console.log(faker.address)
