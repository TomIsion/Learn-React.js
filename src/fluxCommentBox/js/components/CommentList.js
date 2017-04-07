import React, { Component } from 'react'

import CommentActions from '../actions/CommentActions'

class CommentList extends Component {
  componentDidMount() {
    CommentActions.loadComment()
  }

  render() {
    const { comment } = this.props

    return (
      <ul className={'comment-list'}>
        {
          comment.map(
            ele =>
              <li key={ele.id}>
                <p>{ ele.name }</p>
                <p>{ ele.content }</p>
                <p>{ ele.publishTime }</p>
              </li>,
          )
        }
      </ul>
    )
  }
}

export default CommentList
