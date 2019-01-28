import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState( {
      [name]: value
    } )
  }

  render() {
    const { description, url } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            name='description'
            onChange={this.handleChange}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            name='url'
            onChange={this.handleChange}
            type="text"
            placeholder="A URl for the link"
          />
          <Mutation
            mutation={POST_MUTATION}
            variables={{ description, url }}
            onCompleted={() => this.props.history.push('/')}
          >
            {postMutation => (
              <button onClick={postMutation} >
                Submit
              </button>
            )}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default CreateLink