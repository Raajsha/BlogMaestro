import {useState,useEffect} from  'react'
import { useAuth } from '../context/AuthContext.jsx'
import { commentsAPI } from '../services/api.js'
import { MessageCircle, Edit2, Trash2, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const CommentSection = ({postId}) => {
    const {user,isAuthenticated} = useAuth()
    const [comments,setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [editingComment, setEditingComment] = useState(null)
    const [editText, setEditText] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchComments()
    },[postId])

    const fetchComments = async () => {
        try {
            const response = await commentsAPI.getByPost(postId)
            setComments(response.data)
        } catch (error) {
            console.error('Error fetching comments: ',error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddComment = async (e) => {
            e.preventDefault()
            if(!newComment.trim()) return

            try {
                const response = await commentsAPI.create({
                    postId,
                    text: newComment
                })
                setComments([response.data,...comments])
                setNewComment('')
                toast.success("Comment added!")
                console.log(response.data)
            } catch (error) {
                toast.error('Failed to add comment')
                console.log(error)
            }
    }

    const handleEditComment = async (commentId) => {
        if(!editText.trim()) return

        try {
            const response = await commentsAPI.update(commentId,{text: editText})
            setComments(comments.map(comment => 
                comment._id === commentId ? response.data : comment
            ))
            setEditingComment(null)
            setEditText('')
            toast.success('Comment updated successfully')
        } catch (error) {
            toast.error('Failed to update comment')
        }
    }

    const handleDeleteComment = async (commentId) => {
        if(!window.confirm("Are you sure you want to delete this comment?")) return
        
        try {
            await commentsAPI.delete(commentId)
            setComments(comments.filter(comment => comment._id !== commentId))
            toast.success('Comment deleted!')
        } catch (error) {
            toast.error('Failed to delete comment')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US',
            {
                year : 'numeric',
                month : 'short',
                day : 'numeric',
            }
        )
    }

    if(loading){
        return(
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className='text-primary-600' size = {20} />
                <h3 className='text-lg font-semibold text-gray-900'>
                    Comments ({comments.length})
                </h3>
            </div>

            {isAuthenticated && (
                <form onSubmit={handleAddComment} className="mb-6">
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                rows="3"
                            />
                        </div>
                        <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="self-end bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                        >
                            <Send size={16} />
                            <span>Post</span>
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No comments yet. Be the first to comment
                    </p>
                ):(
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-50 rounded-lg border border-gray-300 p-4 animate-slide-up">
                            <div className="flex items-start justify-between mb-2">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">{comment.userId.username}</span>
                                    <span className="mx-2">•</span>
                                    <span>{formatDate(comment.createdAt)}</span>
                                </div>

                                {user && (user.user === (comment.userId._id || comment.userId) ) && (
                                    <div className="flex space-x-2">
                                        <button 
                                        onClick={() => {
                                            setEditingComment(comment._id)
                                            setEditText(comment.text)
                                        }}
                                        className="text-gray-500 hover:text-primary-600 transition-colors">
                                            <Edit2 size = {14} />
                                        </button>
                                        <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="text-gray-500 hover:text-red-600 transition-colors">
                                            <Trash2 size = {14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editingComment === comment._id ? (
                                <div className="space-y-2">
                                    <textarea
                                    value = {editText}
                                    onChange = { (e) => {setEditText(e.target.value)}}
                                    className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-transparent resize-none'
                                    rows= '2' />
                                    <div className="flex space-x-2">
                                        <button 
                                          onClick={() => handleEditComment(comment._id)}
                                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                                            Save
                                        </button>
                                        <button 
                                          onClick={() => {
                                            setEditingComment(null)
                                            setEditText('')
                                          }}
                                          className='bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 transition-colors'>
                                            Cancel
                                          </button>
                                    </div>
                                </div>
                            ): (
                                <p className="text-gray-800">{comment.text}</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CommentSection;