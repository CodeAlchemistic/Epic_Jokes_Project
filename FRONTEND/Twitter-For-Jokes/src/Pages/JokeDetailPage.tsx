import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import JokeDisplayBubble from "../Modules/JokeDetailPage/JokeDisplayBubble.tsx";
import CommentPostBubble from "../Modules/JokeDetailPage/CommentPostBubble.tsx";
import CommentBubble from "../Modules/JokeDetailPage/CommentBubble.tsx";

export interface JokeOnDetailPage {
    jokeId: string;
    jokeContent: string;
    rating: number;
    authorName: string;
}


function JokeDetailPage() {
    const {id} = useParams<{id: string}>();
    const [joke, setJoke] = useState<JokeOnDetailPage | null>(null);

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

    return (
        <>
            {joke && <JokeDisplayBubble data={joke} />}

            {id && <CommentPostBubble jokeId={id} />}

            {id && <CommentBubble jokeId={id} />}
        </>

    )
}

export default JokeDetailPage;