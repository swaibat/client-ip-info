const React = require('react')

class HelloMessage extends React.Component {
  
  render() {
    console.log(this.props.data)
    return <div>{this.props.data && this.props.data.country_name}</div>
  }
}

module.exports = HelloMessage
