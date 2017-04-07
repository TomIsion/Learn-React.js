import React, { Component, PropTypes } from 'react'

class CommentsList extends Component {
  render() {
    const { list } = this.props

    return (
      <ul>
        {
          list.map(
            ele =>
              <li key={ele.id}>
                <p>{ ele.name }</p>
                <p>{ ele.content }</p>
                <p>{ ele.publishTime }</p>
              </li>)
        }
      </ul>
    )
  }
}

CommentsList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default CommentsList
