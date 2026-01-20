import JokeBubble from "../Modules/Feed/JokeBubble.tsx";
import JokePostBubble from "../Modules/Feed/JokePostBubble.tsx";

function Feed() {
    return (
        <>
        <div>
           <JokePostBubble />
        </div>
        <div>
            <JokeBubble />
        </div>
        </>
    );
}

export default Feed