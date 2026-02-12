import JokeBubble from "../Modules/Feed/JokeBubble.tsx";
import JokePostBubble from "../Modules/Feed/JokePostBubble.tsx";
import {useCallback, useEffect, useState} from "react";

interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}

function Feed() {
    const [jokes, setJokes] = useState<Joke[]>([]);

    const fetchJokes = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:65451/api/Jokes');
            const data: Joke[] = await response.json();
            setJokes(data);
        } catch (error) {
            console.error("Error while fatching your jokes", error);
        }
    }, []);

    useEffect(() => {
        fetchJokes();
    }, [fetchJokes]);
    return (
        <>
        <div>
           <JokePostBubble onJokePosted={fetchJokes} />
        </div>
        <div>
            <JokeBubble jokes={jokes} refreshJokes={fetchJokes}/>
        </div>
        </>
    );
}

export default Feed