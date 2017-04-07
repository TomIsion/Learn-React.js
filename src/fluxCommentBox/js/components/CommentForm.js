import React, { Component } from 'react'

import CommentAction from '../actions/CommentActions'

class CommentForm extends Component {
  state = {
    text: '',
  }

  handleTextAreaChange(text) {
    this.setState({
      text,
    })
  }

  handleSubmit() {
    CommentAction.addComment(this.state.text)
  }

  render() {
    const { text } = this.state

    return (
      <div>
        <textarea
          value={text}
          onChange={e => this.handleTextAreaChange(e.target.value)}
          className={'comment-textarea'}
        />
        <button
          onClick={() => this.handleSubmit()}
        >
          确定
        </button>
      </div>
    )
  }
}

export default CommentForm
