import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './slant.css';
import 'whatwg-fetch';
import {key} from './Key';

const request = new Request('https://api.airtable.com/v0/appsDmF4srKVAXHqp/nootacademy?maxRecords=3&view=Main%20View', {
  method: 'get',
  headers: new Headers({
    'Authorization': `Bearer ${key}`
  })
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airtable: [],
    };
    this.fetchAirtable = this.fetchAirtable.bind(this);

  }

  fetchAirtable() {
    fetch(request).then(resp => resp.json())
      .then(resp => {
        const records = resp.records;
        this.setState({ airtable: records });
      });
  }

  render() {
    const airtable = this.state.airtable;
    const entry = airtable.map((airtable, index) =>
      <tr>
      <td key={index}>{airtable.fields.href}</td>
      </tr>
    );
    return (

      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <button className="bttn-primary bttn-slant bttn-md" 
        onClick={this.fetchAirtable}>Fetch</button>
  
        <table>
        <tbody>{entry ? entry : ''}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
