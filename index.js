const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");
const path = require("path");
const { prompt } = require("enquirer");
let { getBirds, getBirdNames, getBirdTypes } = require('./helpers/birds')
let dbPath = path.join(__dirname, "./data/db.json");
let testDBPath = path.join(__dirname, "./data/test-db.json");

let statuses = [
  {
    id: 1,
    name: "pending",
    description: "Pending",
  },
  {
    id: 2,
    name: "inactive",
    description: "Inactive",
  },
  {
    id: 3,
    name: "active",
    description: "Active",
  },
  {
    id: 4,
    name: "audit",
    description: "Audit",
  },
];
let len = 0
async function createRandomThing(name, description) {
  // requires node.latest 
  // install node.stable for work work
  // generate random GUID
  const { randomUUID } = await import("node:crypto");
  let randStatusId = Math.floor(Math.random() * 4) + 1;
  return {
    id: randomUUID(),
    name: name,
    description: description,
    status: statuses.find((s) => s.id == randStatusId),
  };
}

// prompt to find:
//    - the name of the entity
//    - columns that will be needed
//    - amount to create
prompt([
  {
    type: "input",
    name: "entity",
    message: "Name of Entity to create",
  },
  {
    type: "list",
    name: "types",
    message: "List of types separated by ,",
  },
  {
    type: "input",
    name: "amount",
    message: "how many to create?"
  }
]).then(async (res) => {
  // create output file
  var filename = res.entity
  var len = res.amount
  var things = []
  console.log(res);
  var types = res.types;

  // [ name, description, status]

  let start = "{ \"" + res.entity + "\" :"

  // { "entity": { "name": , "description": ,"status":}}
  await prompt([
    {
        type: "select",
        name: 'value',
        message: "choose the source for your values",
        choices: getBirds()
      }
  ]).then(async (response) => {
    // animal, internet, color
    console.log(response)
    let bird = response.value
    await prompt([
      {
          type: "select",
          name: 'value',
          message: "choose the source for your values",
          choices: getBirdTypes(response.value)
        }
    ]).then(async (response) => {
      let birdType = response.value
      console.log('this one:',bird, birdType)
      console.log(faker[bird[birdType]]())
      for (var i = 0; i < len; i++) {
        var thing = await createRandomThing(faker[bird[birdType]]())
        things.push(thing);
      }
    })

  })

  let end = "}"

  let output = start + JSON.stringify(things) + end
  // write file
  writeFile(testDBPath, output, (error) => {
    if (error) {
      console.error("Error while update domains.json.");
      throw error;
    } else {
      console.log("successfully wrote to file");
    }
  });
})


async function createFakerFile() {
  let dogs = await createFakers(50);
  // create string object
  let dbList = '{'
  let dogsList = '"dogs": ' + JSON.stringify(dogs);
  dbList += dogsList + ','
  let statusList = '"statuses": ' + JSON.stringify(statuses);
  dbList += statusList
  dbList += '}'
  // save to json file named db.json
  writeFile(dbPath, dbList, (error) => {
    if (error) {
      console.error("Error while update domains.json.");
      throw error;
    } else {
      console.log("successfully wrote to file");
    }
  });
}

