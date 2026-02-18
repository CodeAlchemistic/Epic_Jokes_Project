import {useState} from "react";
import "./CommentPostBubble.css"
import {useAuth} from "../Contexts/AuthContext.tsx";
import toast from "react-hot-toast";
import Loading from "../Global/Loading.tsx";

interface CommentPostBubbleProps {
    jokeId: string;
    fatchComments: () => void;
}



const CommentPostBubble = ({ jokeId, fatchComments }: CommentPostBubbleProps)=> {
    const [commentContent, setCommentContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const commentToSend = {
        commentContent : commentContent,
        jokeId: jokeId
    }

    const postComment = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        fetch('http://localhost:65451/api/Comments', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentToSend)
        }).then(res => {
            if (res.ok) {
                console.log(res)
                console.log("Successfully sent");
                setCommentContent("")
                toast.success("Comment successfully sent");
                setLoading(false);
                fatchComments()
            }else {
                console.log(res)
                console.log("Failed");
                setLoading(false);
                toast.error("there was an error while sending your comment");
            }
        })

    }

    const user = useAuth();

    if (user.user?.isAuthenticated === true) {
        return (
            <>
                <div className="whole-comment-post">
                    <h1>Comment this joke!</h1>
                    <form className="comment-post-form" onSubmit={postComment}>
                        <p>Your comment:</p>
                        <textarea className="post-comment-input" onChange={(e) => setCommentContent(e.target.value)} value={commentContent} />
                        <button type="submit">Post comment</button>
                    </form>
                </div>
                {loading && <Loading />}

            </>
        )
    }
    else {
        return (
           <>
              <div className="whole-comment-post">
                  <p id="nothing-to-comment-message">To comment this joke you need to log in.</p>
              </div>

           </>

        )
    }


}

export default CommentPostBubble;