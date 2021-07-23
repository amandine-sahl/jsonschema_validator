# GitHub Action: validate JSON with multiple local schemas

This Action allows to validate JSON using multiple schemas stored locally and referenced by `$ref` in the main schema.
It uses [ajv](https://ajv.js.org/), a JS validator.

## Inputs
- `main_schema_path`: Path to the main schema, default is `'./schema.json'`
- `additional_schemas_path`: Path to the folder containing the referenced schemas, default is `'./additional_schemas/'`
- `data_path`: Path to the JSON file to validate, default is `'./data.json'`

## Output
- `validity`: Validity of the data according to the schema


## Example Workflow

An example `.github/workflows/validate.yml` workflow to run JSON validation on the repository: 

```yaml
name: Validate JSON

on:
  push:
    paths:
      - 'schema.json'
      - 'data.json'

jobs:
  validate_json:
    runs-on: ubuntu-latest
    steps:
      - name: build the schema and validate the data
        uses: idrissad/jsonschema_validator@v1.0
        id: validation
        with:
          main_schema_path: /path/to/schema.json
          additional_schemas_path: /path/to/additional/schemas/
          data_path: /path/to/data.json
      - name: print the results
        run: echo "${{ steps.validation.outputs.validity }}"