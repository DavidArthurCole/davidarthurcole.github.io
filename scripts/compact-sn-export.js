// @ts-check
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'sys_update_xml', 'sys_update_xml.json');
const OUTPUT = path.join(__dirname, '..', 'src', 'data', 'sn-export-compact.json');

const KEEP_FIELDS = ['name', 'sys_class_name', 'scope', 'description', 'category'];

const USER_HINT = 'david';

if (!fs.existsSync(INPUT)) {
  console.error(`Input not found: ${INPUT}`);
  process.exit(1);
}

console.log('Reading export (this may take a moment for 71 MB)...');
const raw = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

const records = Array.isArray(raw)
  ? raw
  : Array.isArray(raw.records)
  ? raw.records
  : Array.isArray(raw.result)
  ? raw.result
  : [];

if (records.length === 0) {
  console.error(
    'Could not find a records array in the JSON. ' +
    'Top-level keys: ' + Object.keys(raw).join(', ')
  );
  process.exit(1);
}

console.log(`Total records: ${records.length}`);

const compacted = records
  .filter((r) => {
    const created = String(r.sys_created_by || '').toLowerCase();
    const updated = String(r.sys_updated_by || '').toLowerCase();
    return created.includes(USER_HINT) || updated.includes(USER_HINT);
  })
  .map((r) => {
    /** @type {Record<string, string>} */
    const out = {};
    for (const field of KEEP_FIELDS) {
      const val = r[field];
      if (val !== undefined && val !== null && val !== '') {
        out[field] = String(val);
      }
    }
    return out;
  })
  .filter((r) => r.name);

console.log(`Matched ${compacted.length} records for user hint "${USER_HINT}"`);
fs.writeFileSync(OUTPUT, JSON.stringify(compacted, null, 2), 'utf-8');
console.log(`Written to ${OUTPUT}`);
