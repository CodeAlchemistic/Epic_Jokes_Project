import type {JokeOnDetailPage} from "../../Pages/JokeDetailPage.tsx";

interface JokeDisplayBubbleProps {
    data: JokeOnDetailPage;
}

const JokeDisplayBubble = ({ data}: JokeDisplayBubbleProps) => {
    return (
        <div>
            <p>{data.authorName}</p>
            <p>{data.jokeContent}</p>
            <p>{data.rating}</p>
        </div>
    )
}

export default JokeDisplayBubble;