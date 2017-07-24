import React from 'react';
import logo from './logo.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';
require('env2')('.env');

// Add environmental vars to .env
// Find them at: https://airtable.com/api
// Base looks like appsDmF4srKVAXHqp
// The default view is Main%20View (unless renamed)

const config = {
  base: process.env.AIRTABLE_BASE,
  table: process.env.AIRTABLE_TABLE,
  view: process.env.AIRTABLE_VIEW,
  apiKey: process.env.AIRTABLE_API_KEY,
  maxRecords: process.env.AIRTABLE_MAX_RECORDS
}

const request = new Request(`https://api.airtable.com/v0/${config.base}/${config.table}?maxRecords=${config.maxRecords}&view=${config.view}`, {
  method: 'get',
  headers: new Headers({
    'Authorization': `Bearer ${config.apiKey}`
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
    this.fetchAirtable = this.fetchAirtable.bind(this);
  }

  async componentDidMount() {
    await this.fetchAirtable()
  }

  async fetchAirtable() {
    var resp = await fetch(request).catch(err => {console.log(err)})
    if(resp.status >= 200 && resp.status < 300) {
      var json = await resp.json()
      const {records} = json;
      this.setState({ records });
    }
  }

  render() {
    var {records} = this.state
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
    
        <div>
        {records && records.length > 0 ? records.map(record =>
          <p>{JSON.stringify(record)}</p>
        ) : <p>Double-check that you've added your API key to .env.</p>}
        </div>
      </div>
    );
  }
}

export default App;
