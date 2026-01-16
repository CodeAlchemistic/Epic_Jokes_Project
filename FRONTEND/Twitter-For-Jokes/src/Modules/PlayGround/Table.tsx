import React, { useState, useEffect } from 'react';


interface Item {
    usrId: number;
    userName: string;
    password: string;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        fetch('http://localhost:65451/api/Users')
            .then(response => response.json())
            .then((resalt: Item[]) => setData(resalt));
    }, []);

    console.table(data);
    return (
        <table border={1}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Název</th>
                <th>password</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.usrId}>
                    <td>{item.usrId}</td>
                    <td>{item.userName}</td>
                    <td>{item.password}</td>
                </tr>
            ))}
            </tbody>
        </table>

    );
};

export default DataTable;