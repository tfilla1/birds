const {
  faker
} = require("@faker-js/faker");

const {
  writeFile
} = require("fs");

const path = require("path");

const {
  prompt
} = require("enquirer");

let {
  fakerRoot
} = require('./faker');

let dbPath = path.join(__dirname, "../lib/db.json");
console.log(fakerRoot);
let statuses = [{
  id: 1,
  name: "pending",
  description: "Pending"
}, {
  id: 2,
  name: "inactive",
  description: "Inactive"
}, {
  id: 3,
  name: "active",
  description: "Active"
}, {
  id: 4,
  name: "audit",
  description: "Audit"
}];

async function createRandomDog() {
  // requires node.latest 
  // install node.stable for work work
  // generate random GUID
  const {
    randomUUID
  } = await import("node:crypto");
  let randStatusId = Math.floor(Math.random() * 4) + 1;
  return {
    id: randomUUID(),
    name: faker.animal.dog(),
    description: faker.commerce.productDescription(),
    status: statuses.find(s => s.id == randStatusId)
  };
}

async function createInitialPrompt() {
  let response = await prompt([{
    type: "input",
    name: "entity",
    message: "Name of Entity to create"
  }, {
    type: "list",
    name: "types",
    message: "List of types separated by ,"
  }]);
  return response;
} // prompt([{
//   type: "select",
//   name: 'values',
//   message: "choose the source for your values",
//   choices: fakerRoot
// }
// ]).then((response) => {
//   prompt([{
//     type: "input",
//     name: 'name',
//     message: 'something'
//   }])
// })


createInitialPrompt().then(async res => {
  // create output file
  console.log(res);
  var types = res.types; // [ name, description, status]

  let output = "{ '" + res.entity + "'"; // { "entity": { "name": , "description": ,"status":}}

  let typesResponse = await prompt([{
    type: "select",
    name: 'values',
    message: "choose the source for your values",
    choices: fakerRoot
  }]).then(response => {
    console.log(response);
  });
  let end = "}";
});

async function createFakers(len) {
  let dogs = [];

  for (var i = 0; i < len; i++) {
    var dog = await createRandomDog();
    dogs.push(dog);
  }

  return dogs;
}

async function createFakerFile() {
  let dogs = await createFakers(50); // create string object

  let dbList = '{';
  let dogsList = '"dogs": ' + JSON.stringify(dogs);
  dbList += dogsList + ',';
  let statusList = '"statuses": ' + JSON.stringify(statuses);
  dbList += statusList;
  dbList += '}'; // save to json file named db.json

  writeFile(dbPath, dbList, error => {
    if (error) {
      console.error("Error while update domains.json.");
      throw error;
    } else {
      console.log("successfully wrote to file");
    }
  });
} //createFakerFile();
// createFakerPrompt().then((res) => {
//   let filename = res.entity;
//   let types = res.types;
// });