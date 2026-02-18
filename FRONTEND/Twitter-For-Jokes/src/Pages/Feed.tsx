import JokeBubble from "../Modules/Feed/JokeBubble.tsx";
import JokePostBubble from "../Modules/Feed/JokePostBubble.tsx";
import {useCallback, useEffect, useState} from "react";
import Loading from "../Modules/Global/Loading.tsx";

interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}

function Feed() {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchJokes = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:65451/api/Jokes');
            const data: Joke[] = await response.json();
            setJokes(data);
            setIsLoading(false);
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
            {isLoading ? <Loading></Loading> :
                <JokeBubble jokes={jokes} refreshJokes={fetchJokes}/>
            }
        </div>
        </>
    );
}

export default Feed