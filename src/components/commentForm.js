import React, { Component, PropTypes } from 'react'

class CommentForm extends Component {
  state = {
    text: '',
  }

  handleTextAreaInput(e) {
    this.setState({
      text: e.target.value,
    })
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.text)

    this.setState({
      text: '',
    })
  }

  render() {
    const { text } = this.state

    return (
      <div>
        <textarea
          value={text}
          cols="30"
          rows="10"
          onChange={e => this.handleTextAreaInput(e)}
        />
        <button
          onClick={() => this.handleSubmit()}
        >
          提交
        </button>
      </div>
    )
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default CommentForm
