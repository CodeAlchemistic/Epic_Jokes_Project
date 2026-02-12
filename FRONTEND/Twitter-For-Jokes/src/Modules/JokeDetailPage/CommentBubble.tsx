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

const CommentBubble = ({ data }: CommentBubbleProps) => {
    return (
        <>
            {data.map((comment: Comment) => (
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