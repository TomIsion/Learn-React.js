import { EventEmitter } from 'events'
import AppDispatcher from '../dispatcher/AppDispatcher'
import CommentConstants from '../constants/CommentConstants'

// store 中保存的数据
let comment = []

// @to-delete
// 定义修改数据的逻辑
// 数据修改的逻辑都在 dispatcher 中
// function loadComment(newComment) {
//   comment = newComment
// }

// function addComment(singleComment) {
//   comment.push(singleComment)
// }

// 给 store 带来监听、发布的能力
const CommentStore = Object.assign({}, EventEmitter.prototype, {
  getComment() {
    return comment
  },

  // 触发每次数据变化之后的事件监听
  emitChange() {
    this.emit('change')
  },

  /**
   * 绑定每次数据变化之后的事件监听
   * @param {function} callback 
   */
  addChangeListener(callback) {
    this.on('change', callback)
  },

  removeChangeListener(callback) {
    this.removeListener(callback)
  },
})

// 调用 dispatcher 的 register 方法给 store 注册一个监听器
AppDispatcher.register(action => {
  switch (action.type) {
    case CommentConstants.LOAD_COMMENT_SUCCESS:
      comment = action.payload.comment
      CommentStore.emitChange()
      break
    case CommentConstants.ADD_COMMENT_SUCCESS:
      // @todos: 提示提交成功
      break
    default:
      console.log(action)
  }
})

export default CommentStore
