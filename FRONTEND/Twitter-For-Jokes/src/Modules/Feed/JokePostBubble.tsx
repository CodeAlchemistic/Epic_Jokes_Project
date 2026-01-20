import React, {useState} from 'react'


function JokePostBubble() {

    const [jokeContent, setJokeContent] = useState('');

    const postJoke = (e: React.FormEvent) => {
        e.preventDefault()

        const jokeToPost = {
            userId: 1, //Temp user id, registratoron reqired after probably global varialbe
            jokeContent: jokeContent,
            reting: 5
        }

        fetch('http://localhost:65451/api/Jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeToPost),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response, "vše Ok")
                    setJokeContent('');
                } else{
                    console.log(response, "nic není ok")
                }
            })
        .catch(error => console.log(error));
    }

    return (
        <form onSubmit={postJoke}>
            <textarea value={jokeContent} onChange={e => setJokeContent(e.target.value)}></textarea>
            <button type="submit">Post</button>
        </form>
    )
}

export default JokePostBubble;