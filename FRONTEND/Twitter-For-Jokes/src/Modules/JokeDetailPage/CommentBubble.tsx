import "./CommentBubble.css"
import usr_icon from "../../assets/usr_icon.png";

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
    console.log("CommentBubble render", { data });
    return (
        <>
            <h1 id="comment-header">All comments:</h1>
            {data.map((comment: Comment) => (
                <div className="bubble-div" key={comment.commentId}>
                    <div>
                        <img src={usr_icon} alt=""/>
                        <p>{comment.authorName}</p>
                    </div>
                   <p>{comment.commentContent}</p>
                </div>
            ))
            }
        </>
    )
}

export default CommentBubble