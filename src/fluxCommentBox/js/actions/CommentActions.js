import 'whatwg-fetch'

import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentConstants from '../constants/CommentConstants'

const CommentActions = {
  loadComment() {
    AppDispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT,
    })

    fetch('/data/comments.json')
    .then(res => res.json())
    .then(data => AppDispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT_SUCCESS,
      payload: {
        comment: data.commentList,
      },
    }))
    .catch(err => AppDispatcher.dispatch({
      type: CommentConstants.LOAD_COMMENT_ERROR,
      error: err,
    }))
  },
  addComment(text) {
    AppDispatcher.dispatch({
      type: CommentConstants.ADD_COMMENT,
    })

    fetch('data/addComment.json', {
      method: 'POST',
      body: `content=${text}`,
    })
    .then(res => res.json())
    .then(json => {
      if (json.status) {
        AppDispatcher.dispatch({
          type: CommentConstants.ADD_COMMENT_SUCCESS,
        })

        this.loadComment()
      }
    }).catch(err => AppDispatcher.dispatch({
      type: CommentConstants.ADD_COMMENT_ERROR,
      error: err,
    }))
  },
}

export default CommentActions
