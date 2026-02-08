import {useState, useEffect} from 'react'
import './../Feed/JokePostBubble.tsx'


export function convertStringFromInput(value: string) {
    const n = Number( value );
    return n;
}


interface user {
    isAutenticated: boolean;
    userId: number;
    userName: string;
}
function useLoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState<user | null>(null);

    useEffect(() => {
        fetch('http://localhost:65451/api/Authentication/this', {
            method: 'GET',
            credentials: 'include',
            headers: {'content-type': 'application/json'}
        })
        .then(response => response.json())
        .then((resalt: user) => setIsLoggedIn(resalt));

    }, []);

    console.log(isLoggedIn);

    return isLoggedIn?.isAutenticated;
}

export {useLoginStatus};