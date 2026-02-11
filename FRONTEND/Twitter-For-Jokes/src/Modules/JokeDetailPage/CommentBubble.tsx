import {useState} from "react";

interface CommentBubbleProps {
    jokeId: string;
}

interface Comment {
    commentId: number;
    authorName: string;
    commentContent: string;
}

const CommentBubble = ({ jokeId }: CommentBubbleProps) => {
    const [comments, setComments] = useState<Comment[]>([]);

    fetch(`http://localhost:65451/api/Comments/${jokeId}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then(data => setComments(data));

    return (
        <>
            {comments.map((comment: Comment) => (
                <div key={comment.commentId}>
                   <p>{comment.authorName}</p>
                   <p>{comment.commentContent}</p>
                </div>
            ))
            }
        </>
    )
}

export default CommentBubble