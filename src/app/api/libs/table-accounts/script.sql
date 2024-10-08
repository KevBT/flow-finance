// TABLA DE CUENTAS
CREATE TABLE accounts (Id serial PRIMARY KEY, Username varchar(100), Name varchar(50), Value NUMERIC(15, 2), Type varchar(20));

ALTER TABLE accounts
ALTER COLUMN Value TYPE NUMERIC(15, 2);

// TABLA DE CATEGORIAS
CREATE TABLE categories (Id serial PRIMARY KEY, Name varchar(50));

// TABLA DE GASTOS
CREATE TABLE expenses (Id SERIAL PRIMARY KEY, AccountId INT REFERENCES accounts(Id), CategoryId INT REFERENCES categories(Id), Username VARCHAR(100), DateRegister DATE DEFAULT CURRENT_DATE, Description VARCHAR(100), Value NUMERIC(15, 2));

// TABLA DE DEUDAS
CREATE TABLE debts (Id SERIAL PRIMARY KEY, Username varchar(100), Fee INT, Description VARCHAR(50), Paid INT DEFAULT 0, TotalDue INT, Payday INT, FeeValue INT);

// TABLA DE PAGOS
CREATE TABLE payments (Id SERIAL PRIMARY KEY, DebtsId INT REFERENCES debts(Id), PaymentType VARCHAR(50), PayValue INT,  Payday DATE DEFAULT CURRENT_DATE)

// TABLA DE INGRESOS
CREATE TABLE incomes (Id SERIAL PRIMARY KEY, Username varchar(100), TypeIncome varchar(50), AccountId INT REFERENCES accounts(Id),  Value NUMERIC(15, 2), date varchar(20));

// TABLA DE EXCHANGE
CREATE TABLE exchanges (Id SERIAL PRIMARY KEY, FromAccountId INTEGER REFERENCES accounts(Id),ToAccountId INTEGER REFERENCES accounts(Id),Username VARCHAR(100), Value INT,Date DATE DEFAULT CURRENT_DATE);

// TABLE OF SAVING GOALS
CREATE TABLE saving_goals (Id serial primary key, moneySaved NUMERIC(15,2), goal NUMERIC(15,2), nameGoal VARCHAR(50), username varchar(50));

// TABLE REGISTER OF SAVING GOALS
CREATE TABLE saving_goals_register (
    Id SERIAL PRIMARY KEY,
    SavingGoalId INT REFERENCES saving_goals(Id),
    AccountId INT REFERENCES accounts(Id),
    Amount NUMERIC(15,2),
    DateRegister DATE DEFAULT CURRENT_DATE
);
