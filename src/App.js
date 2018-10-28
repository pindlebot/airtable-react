import React from 'react'
import 'whatwg-fetch'
import { render } from 'react-dom'

class App extends React.Component {
  state = {
    records: []
  }

  async componentDidMount() {
    let resp = await fetch('/api', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    let json = await resp.json()
    const { records } = json
    this.setState({ records })
  }

  render() {
    let { records } = this.state
    return (
      <div className="App">
        <div>
        {records && records.length > 0 ? records.map(record =>
          <p>{JSON.stringify(record)}</p>
        ) : <p>Double-check that you have added your API key to .env.</p>}
        </div>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)