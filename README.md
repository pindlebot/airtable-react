# airtable-react
How to use Airtable as a minimum viable database for your ReactJs project.

## Quick Start

**Clone the repo**:

```
git clone https://github.com/focuswish/airtable-react.git
```

**Install dependencies**:

```
cd airtable-react && npm install
```

**Add Airtable API key**:

```
echo 'export const key = "YOUR API KEY HERE";' > src/Key.js
```

**Edit src/App.js**:

Change the url to point to your Airtable.

```
const request = new Request('YOUR AIRTABLE URL', { ... });

```
Also change the field that's referenced in the map() function in render:

```
<td key={index}>{airtable.fields.YOUR_AIRTABLE_FIELD_HERE}</td>
```

**Start the server**:

```
npm run start
```