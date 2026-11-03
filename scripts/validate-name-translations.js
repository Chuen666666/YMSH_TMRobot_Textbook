const fs = require('node:fs');
const path = require('node:path');
const Ajv2020 = require('ajv/dist/2020').default;

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'name-translations.json');
const schemaPath = path.join(root, 'schemas', 'name-translations.schema.json');

function readJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Unable to parse ${path.relative(root, filePath)}: ${error.message}`);
        process.exit(1);
    }
}

const registry = readJson(registryPath);
const schema = readJson(schemaPath);
const ajv = new Ajv2020({allErrors: true, strict: true});
const validate = ajv.compile(schema);

if (!validate(registry)) {
    console.error('name-translations.json does not match its JSON Schema:');
    for (const error of validate.errors) {
        console.error(`- ${error.instancePath || '/'} ${error.message}`);
    }
    process.exit(1);
}

const errors = [];
const seenNames = new Set();
const passportNamePattern = /^[A-Z][A-Z' -]*, [A-Z][A-Z' -]*$/;

for (const entry of registry.names) {
    const label = entry.traditionalChinese;

    if (seenNames.has(label)) {
        errors.push(`${label}: duplicate Traditional Chinese name`);
    }
    seenNames.add(label);

    if (entry.source.kind === 'project-provided-anonymous' && entry.english.award !== null) {
        if (entry.english.award !== entry.english.default) {
            errors.push(`${label}: an anonymous award name must exactly match its default display name`);
        }
    } else if (entry.english.award !== null && !passportNamePattern.test(entry.english.award)) {
        errors.push(`${label}: award display must use the ROC passport format SURNAME, GIVEN-NAME`);
    }

    for (const reference of entry.source.reference) {
        if (!reference.startsWith('docs/')) continue;

        const referencePath = path.join(root, reference);
        if (!fs.existsSync(referencePath)) {
            errors.push(`${label}: source reference does not exist: ${reference}`);
            continue;
        }

        const expectedDisplay = reference === 'docs/en/home/award.md' ? entry.english.award : entry.english.default;
        if (expectedDisplay === null) {
            errors.push(`${label}: ${reference} requires a non-null registered display value`);
            continue;
        }

        const content = fs.readFileSync(referencePath, 'utf8');
        if (!content.includes(expectedDisplay)) {
            errors.push(`${label}: ${reference} does not contain the registered value ${expectedDisplay}`);
        }
    }
}

if (errors.length > 0) {
    console.error('name-translations.json failed semantic validation:');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(`Validated ${registry.names.length} unique personal-name translations.`);
