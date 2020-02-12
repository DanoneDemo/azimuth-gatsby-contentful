const path = require('path');
const contentfulImport = require('contentful-import');

const options = {
    contentFile: path.join(__dirname, 'contentful-export-52sie3aajp6k-master-2020-02-13T16-03-41.json'),
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
};

contentfulImport(options).then(() => {
    console.log('Data imported successfully');
}).catch((err) => {
    console.log('Oh no! Some errors occurred!', err);
});
