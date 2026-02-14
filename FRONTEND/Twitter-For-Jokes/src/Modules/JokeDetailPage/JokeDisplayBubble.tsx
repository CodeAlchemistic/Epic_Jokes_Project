import type {JokeOnDetailPage} from "../../Pages/JokeDetailPage.tsx";
import "./JokeDisplayBubble.css";

interface JokeDisplayBubbleProps {
    data: JokeOnDetailPage;
}

const JokeDisplayBubble = ({ data}: JokeDisplayBubbleProps) => {
    return (
        <>
            <p id="head-front">Joke</p>
            <div className="joke-display-bubble">
                <p id="name">{data.authorName}</p>
                <p>{data.jokeContent}</p>
                <p id="rating">Rating: {data.rating}/10</p>
            </div>
        </>

    )
}

export default JokeDisplayBubble;