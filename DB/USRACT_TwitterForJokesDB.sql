USE master
GO


IF EXISTS (SELECT * FROM sys.databases WHERE name = N'USRACT_TwitterForJokesDB')
BEGIN
	DROP DATABASE USRACT_TwitterForJokesDB;
END	

CREATE DATABASE USRACT_TwitterForJokesDB;

USE USRACT_TwitterForJokesDB
GO

CREATE TABLE Users (
	usr_id INT IDENTITY(1,1) PRIMARY KEY,		
	username NVARCHAR(30) NOT NULL,
	passwd NVARCHAR(30) NOT NULL,

	CONSTRAINT CHCK_Users_username CHECK (username >= 5),   -- username cannot be shorter than 5 characters
	CONSTRAINT CHCK_Users_passwd CHECK (passwd >= 8)			-- passwd cannot be shorter than 8 characters
);
GO

CREATE TABLE Jokes (
	joke_id INT IDENTITY(1,1) PRIMARY KEY,
	joke_content NVARCHAR(MAX),
	rating INT,

	usr_id INT,
	CONSTRAINT FK_Jokes_Users FOREIGN KEY (usr_id) REFERENCES Users(usr_id),

	CONSTRAINT CHCK_Jokes_rating CHECK (rating BETWEEN 1 AND 10)			--rating only between 1 - 10
);
GO


CREATE TABLE Comments (
	comment_id INT IDENTITY(1,1) PRIMARY KEY,
	comment_content NVARCHAR(300) NOT NULL,

	usr_id INT,
	CONSTRAINT FK_Comments_Users FOREIGN KEY (usr_id) REFERENCES Users(usr_id),

	joke_id INT,
	CONSTRAINT FK_Comments_Jokes FOREIGN KEY (joke_id) REFERENCES Jokes(joke_id)
);
GO