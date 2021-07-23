const core = require('@actions/core');

const schema_path = core.getInput('main_schema_path');
const schemas_path = core.getInput('additional_schemas_path');
const data = core.getInput('data_path');

const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({allErrors: true, strict: false});
addFormats(ajv);

let fs = require('fs');
let add_schemas = fs.readdirSync(schemas_path);

for (let add_schema of add_schemas) {
    path = schemas_path + add_schema
    ajv.addSchema(require(path), add_schema);
};

const schema = require(schema_path);
const validate = ajv.compile(schema);

test(require(data_path));

function test(data) {
  const valid = validate(data);
  if (valid) core.setOutput('validity', "Valid!")
    else core.setOutput('validity', "Invalid: " + ajv.errorsText(validate.errors))
};