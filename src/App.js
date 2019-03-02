import React from 'react'
import 'whatwg-fetch'
import { render } from 'react-dom'

class App extends React.Component {
  state = {
    records: []
  }

  async componentDidMount() {
    const resp = await fetch('/api', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    const { records } = await resp.json()
    this.setState({ records })
  }

  render() {
    let { records } = this.state
    return (
      <div className="App">
        <div>
        {records.length
          ? records.map(record =>
              <p>{JSON.stringify(record)}</p>
            )
          : <p>Double-check that you have added your API key to .env.</p>
        }
        </div>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('root')
)