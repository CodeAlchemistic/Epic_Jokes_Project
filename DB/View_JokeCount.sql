USE USRACT_TwitterForJokesDB
GO


CREATE VIEW UserJokeCount AS
SELECT COUNT(j.joke_id) AS JokeCount
FROM Jokes j
LEFT JOIN Users u ON j.usr_id=u.usr_id
GROUP BY u.usr_id, u.username;


/*
CREATE VIEW UserWithJokeCount AS
SELECT u.usr_id,
       u.username,
       COUNT(j.Id) AS JokeCount
FROM Users u
LEFT JOIN Jokes j ON j.usr_id = u.usr_id
GROUP BY u.usr_id, u.Username;
*/