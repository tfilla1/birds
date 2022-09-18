const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");
const path = require("path");
const { prompt } = require("enquirer");

const BIRDS = [];
let dbPath = path.join(__dirname, './db.json')




// https://github.com/enquirer/enquirer#select-prompt
async function createFakerFile() {
  let response = await prompt([
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
  ]);

  return response;

}

async function getValues(types) {
  let response = await prompt([
    {
      type: "select",
      name: "value",
      // todo: pull from faker web api
      choices: ["faker.animal.cat", "faker.company.catchPhraseDescriptor"],
    },
  ]);

  return response;
}

createFakerFile().then((res) => {

  let filename = res.entity
  let types = res.types

  console.log(res);
  console.log("hello world");

  function createRandomBird(id) {
    return {
      id,
      name: faker.animal.bird(),
      description: faker.company.catchPhraseDescriptor(),
    };
  }

  Array.from({ length: 10 }).forEach((item, index) => {
    console.log(index);
    BIRDS.push(createRandomBird(index));
  });

  // create string object 
  let birdsList = "{\"birds\": " + JSON.stringify(BIRDS) + "}"
  // save to json file named db.json
  writeFile(dbPath, birdsList, (error) => {
    if (error) {
      console.error("Error while update domains.json.");
      throw error;
    } else {
      console.log("successfully wrote to file");
    }
  });
});

