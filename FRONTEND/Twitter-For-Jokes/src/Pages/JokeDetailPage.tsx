import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import JokeDisplayBubble from "../Modules/JokeDetailPage/JokeDisplayBubble.tsx";
import CommentPostBubble from "../Modules/JokeDetailPage/CommentPostBubble.tsx";
import CommentBubble from "../Modules/JokeDetailPage/CommentBubble.tsx";

export interface JokeOnDetailPage {
    jokeId: string;
    jokeContent: string;
    rating: number;
    authorName: string;
}

interface Comment {
    commentId: number;
    authorName: string;
    commentContent: string;
}


function JokeDetailPage() {
    const {id} = useParams<{id: string}>();
    const [joke, setJoke] = useState<JokeOnDetailPage | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

        useEffect(() => {

            window.scrollTo(0, 0);

            fetch(`http://localhost:65451/api/Jokes/${id}`,{
                method: 'GET',
                headers: {'Accept': 'application/json'}
            })
                .then(res => {
                    if (!res.ok) console.log(res);
                    return res.json();
                })
                .then((data: JokeOnDetailPage) => {
                    setJoke(data);
                })
        }, [id]);

        const fatchComments = useCallback(() => {
                   fetch(`http://localhost:65451/api/Comments/${id}`, {
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                }).then(response => response.json()).then(data => setComments(data));
            }, [id])

    useEffect(() => {
        fatchComments();
    }, [fatchComments]);

    return (
        <>
            {joke && <JokeDisplayBubble data={joke} />}

            {id && <CommentPostBubble jokeId={id} fatchComments={fatchComments} />}

            {id && <CommentBubble jokeId={id} data={comments} fatchComments={fatchComments} />}
        </>

    )
}

export default JokeDetailPage;