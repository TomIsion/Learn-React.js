import React, { Component, PropTypes } from 'react'
import 'whatwg-fetch'

import CommentsList from '../components/commentsList'
import CommentForm from '../components/commentForm'

class CommentsBoxContainer extends Component {
  state = {
    singleLoading: true,
    singleError: false,
    comments: [],
  }

  componentDidMount() {
    this.renderList()
  }

  publicHandleSubmit(text) {
    fetch('/data/submit.json', {
      method: 'POST',
      body: JSON.stringify({
        content: text,
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.status) {
        // 成功
        this.renderList()
      }
    })
  }

  renderList() {
    fetch('/data/comments.json', {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        singleLoading: false,
        comments: data.commentList,
      })
    })
    .catch(err => {
      console.log('获取点评异步报错', err)

      this.setState({
        singleLoading: false,
        singleError: true,
      })
    })
  }

  render() {
    const { singleLoading, singleError, comments } = this.state

    let domList = ''

    if (singleLoading) {
      domList = <div>Loading...</div>
    } else if (singleError) {
      domList = <div>Oh, Error...</div>
    } else {
      domList = <CommentsList list={comments} />
    }

    return (
      <div>
        {domList}
        <CommentForm
          handleSubmit={text => this.publicHandleSubmit(text)}
        />
      </div>
    )
  }
}

export default CommentsBoxContainer
