import "./CommentBubble.css"
import usr_icon from "../../assets/usr_icon.png";
import {useAuth} from "../Contexts/AuthContext.tsx";
import {useState} from "react";

interface CommentBubbleProps {
    jokeId: string;
    data: Comment[];
    fatchComments: () => void;
}

interface Comment {
    commentId: number;
    authorName: string;
    commentContent: string;
}

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}


const ConfirmModal = ({message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-box">
                    <p>{message}</p>

                    <div className="modal-buttons">
                        <button id="first-button" onClick={onCancel}>Cancel</button>
                        <button id="second-button" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const CommentBubble = ({ data, fatchComments }: CommentBubbleProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
    const user = useAuth();

    function deleteComment(commentId: number) {
        fetch(`http://localhost:65451/api/comments/${commentId}`, {
            method: "DELETE",
        }).then(res => {
            if (res.status === 204) {
                console.log(res);
                fatchComments()
            }
            else{
                console.log(res);

            }
        })
    }

    const confirmDelete = async () => {
        if (!selectedCommentId) return;

        await deleteComment(selectedCommentId);
        setIsConfirmOpen(false);
        setSelectedCommentId(null);
    };

    return (
        <>
            {isConfirmOpen &&
                <ConfirmModal
                    message={"Do you realy want to dellete this commment?"}
                    onConfirm={confirmDelete}
                    onCancel={() => setIsConfirmOpen(false)}
                />
            }
            <h1 id="comment-header">All comments:</h1>
            {data.map((comment: Comment) => (
                <div className="bubble-div" key={comment.commentId}>
                    <div>
                        <img src={usr_icon} alt=""/>
                        <p>{comment.authorName}</p>
                    </div>
                   <p>{comment.commentContent}</p>
                    { comment.authorName === user.user?.userName?
                    <button onClick={() => {
                        setIsConfirmOpen(true);
                        setSelectedCommentId(comment.commentId);
                    }}>Delete comment</button>
                        : null
                    }
                </div>
            ))
            }
        </>
    )
}

export default CommentBubble