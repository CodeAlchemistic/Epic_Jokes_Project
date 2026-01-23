import React, {useState} from 'react'


function JokePostBubble() {

    const [jokeContent, setJokeContent] = useState('');
    const [rating, setRating] = useState('');

    const postJoke = (e: React.FormEvent) => {
        e.preventDefault()

        const jokeToPost = {
            usrId: 1, //Temp user id, registratoron reqired after probably global varialbe
            jokeContent: jokeContent,
            rating: rating
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
                    console.log(response, "nic není ok")
                    setJokeContent('');
                } else{
                    console.log(response, "Vše OK")
                }
            })
        .catch(error => console.log(error));


    }

    return (
        <form onSubmit={postJoke}>
            <textarea value={jokeContent} onChange={e => setJokeContent(e.target.value)}></textarea>
            <label htmlFor="numbericImput">rating</label>
            <input type="number" name="numbericImput" id="numbericImput" min="1" max="10" onChange={e => setRating(e.target.value)}/>
            <button type="submit">Post</button>
        </form>
    )
}

export default JokePostBubble;