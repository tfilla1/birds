const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");
const path = require("path");
const { prompt } = require("enquirer");

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
      organizationName: faker.company.name(),
      employerActiveDate: faker.date.past(3),
      employerInActiveDate: null,
      ein: faker.random.numeric(9),
      locations: [],
      contacts: [],
      tags: [],
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

doStuff("organizations").then(() => console.log("success"));
