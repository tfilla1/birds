const { faker } = require('@faker-js/faker');
const { writeFile } = require('fs')
const path = require('path')
const { prompt } = require('enquirer');
// https://github.com/enquirer/enquirer#select-prompt
async function createFakerFile() {
  let response = await prompt([{
    type: 'input',
    name: 'entity',
    message: 'Name of Entity to create'
  },
  {
    type: 'list',
    name: 'types',
    message: 'List of types separated by ,'
  },
  {
    type: 'select',
    name: 'value',
    choices: ['faker.animal.cat', 'faker.company.catchPhraseDescriptor']
  }
])

return response
}

createFakerFile().then((res) => {
  console.log(res)
  console.log('hello world')
})


// if (result) {
//   console.log(result.types);
//   console.log(result.entity)
//   let types = result.types.split(',')
//   console.log(types[0])
//   console.log(types[1])

//   return;
//   function createRandomEntity() {
//     return {
//       name: faker.animal.cat(),
//       description: faker.company.catchPhraseDescriptor()
//     };
//   }

//   Array.from({ length: 10 }).forEach(() => {
//     ENTITIES.push(createRandomEntity());
//   });
  
//   let domainsList = JSON.stringify(ENTITIES)
//   // export array to file
  
//   writeFile(
//     domainPath,
//     domainsList,
//     (error) => {
//       if (error) {
//         console.error('Error while update domains.json.')
//         throw error
//       } else {
//         console.log('successfully wrote to file')
//       }
//     }
//     )
//   }



//save to json file