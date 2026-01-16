import { useState } from 'react';

const Form = () => {
    const [jokeContent, setJokeContent] = useState<string>('');

    const odeslatVtip = (e: React.FormEvent) => {
        e.preventDefault();

        const novyVtip = {
            usrId: 1,
            jokeContent: jokeContent,
            rating: 5
        };

        fetch('https://localhost:65451/api/Jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novyVtip),
        })
            .then(odpoved => {
                if (odpoved.ok) {
                    alert('Vtip byl úspěšně uložen do databáze!');
                    setJokeContent('');
                } else {
                    alert('Server vrátil chybu: ' + odpoved.status);
                }
            })
            .catch(error => {
                console.error('Chyba spojení:', error);
            });
    };

    return (
        <form onSubmit={odeslatVtip}>
            <label>Obsah vtipu:</label>
            <textarea
                value={jokeContent}
                onChange={(e) => setJokeContent(e.target.value)}
            />
            <button type="submit">Uložit vtip</button>
        </form>
    );
};

export default Form;