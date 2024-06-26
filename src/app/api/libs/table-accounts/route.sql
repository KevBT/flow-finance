// TABLA DE CUENTAS
CREATE TABLE accounts (Id serial PRIMARY KEY, Username varchar(100), Name varchar(50), Value int, Type varchar(20));

// TABLA DE CATEGORIAS
CREATE TABLE categories (Id serial PRIMARY KEY, Name varchar(50));

// TABLA DE GASTOS
CREATE TABLE expenses (Id SERIAL PRIMARY KEY, AccountId INT REFERENCES accounts(Id), CategoryId INT REFERENCES categories(Id), Username VARCHAR(100), DateRegister DATE DEFAULT CURRENT_DATE, Description VARCHAR(100), Value INT);
