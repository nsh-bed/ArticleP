DROP DATABASE IF EXISTS `a1`;

CREATE DATABASE `a1`;

USE `a1`;

CREATE TABLE article (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    title CHAR(10) NOT NULL,
    `body` CHAR(10) NOT NULL,
    memberId INT(10) UNSIGNED NOT NULL,
    boardId INT(10) UNSIGNED NOT NULL,
    viewId INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO article
SET regDate = NOW(),
title = '제목1',
`body` = '내용1',
memberId = 1,
boardId = 1,
viewId = 1;

INSERT INTO article
SET regDate = NOW(),
title = '제목2',
`body` = '내용2',
memberId = 1,
boardId = 2,
viewId = 1;


CREATE TABLE `member` (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    loginId CHAR(10) NOT NULL,
    loginPw VARCHAR(60) NOT NULL,
    `name` CHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    authKey VARCHAR(60) NOT NULL,
    emailAuthStatus TINYINT(1) UNSIGNED NOT NULL,
    PRIMARY KEY(id)
);


INSERT INTO `member`
SET regDate = NOW(),
loginId = 'user1',
loginPw = 'user1',
`name` = '홍길동',
email = 'bed.nsh.web@gmail.com',
authKey = 'asdsavvxsfsafa',
emailAuthStatus = '1';



CREATE TABLE articleFile (
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    articleId INT(10) UNSIGNED NOT NULL,
    prefix CHAR(200) NOT NULL,
    originFileName CHAR(200) NOT NULL,
    `type` CHAR(200) NOT NULL,
    `type2` CHAR(200) NOT NULL,
    PRIMARY KEY(id)
);

