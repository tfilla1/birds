const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");
const path = require("path");
const { prompt } = require("enquirer");
let { getBirds, getBirdNames, getBirdTypes } = require("./helpers/birds");
let dbPath = path.join(__dirname, "./data/db.json");
let testDBPath = path.join(__dirname, "./data/addresses.json");

async function createRandomThings(len) {
  // requires node.latest
  // install node.stable for work work
  // generate random GUID
  const { randomUUID } = await import("node:crypto");
  let things = [];
  for (var i = 0; i < len; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    things.push({
      id: randomUUID(),
      name: faker.company.name(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      phone: faker.phone.number("###-###-####"),
      email: faker.internet.email(firstName, lastName),
    });
  }
  return things;
}

async function doStuff(entity) {
  let writePath = path.join(__dirname, "./data/" + entity + ".json");
  let start = '{ "' + entity + '" :';

  let end = "}";
  let things = await createRandomThings(50);
  console.log(things);
  let output = start + JSON.stringify(things) + end;

  writeFile(writePath, output, (error) => {
    if (error) {
      console.error("Error while update domains.json.");
      throw error;
    } else {
      console.log("successfully wrote to file");
    }
  });
}

doStuff("addresses").then(() => console.log("success"));
