import { useState } from 'react';

const Form = () => {
    // 1. Definice stavu pro obsah vtipu
    const [jokeContent, setJokeContent] = useState<string>('');

    const odeslatVtip = (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Příprava dat podle entity Joke.cs
        const novyVtip = {
            usrId: 1, // Předpokládáme ID přihlášeného uživatele
            jokeContent: jokeContent,
            rating: 5 // Výchozí hodnocení v povoleném rozsahu 1-10
        };

        // 3. Samotné volání API pomocí fetch
        fetch('https://localhost:XXXX/api/jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novyVtip),
        })
            .then(odpoved => {
                if (odpoved.ok) {
                    alert('Vtip byl úspěšně uložen do databáze!');
                    setJokeContent(''); // Vyčištění formuláře
                } else {
                    alert('Server vrátil chybu: ' + odpoved.status);
                }
            })
            .catch(error => {
                // Catch zde slouží pro chyby sítě (např. API neběží)
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