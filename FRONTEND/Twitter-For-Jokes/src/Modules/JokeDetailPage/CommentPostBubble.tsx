import {useState} from "react";

interface CommentPostBubbleProps {
    jokeId: string;
}



const CommentPostBubble = ({ jokeId }: CommentPostBubbleProps)=> {
    const [commentContent, setCommentContent] = useState<string>('');

    const commentToSend = {
        commentContent : commentContent,
        jokeId: jokeId
    }

    const postComment = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:65451/api/Comments', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(commentToSend)
        }).then(res => {
            if (res.ok) {
                console.log(res)
                console.log("Successfully sent");
            }else {
                console.log(res)
                console.log("Failed");
            }
        })

    }


    return (
        <>
            <form onSubmit={postComment}>
                <input type="text" onChange={(e) => setCommentContent(e.target.value)} value={commentContent} />
                <button type="submit">Post comment</button>
            </form>
        </>
    )

}

export default CommentPostBubble;