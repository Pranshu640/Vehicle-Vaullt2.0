-- Create the database
CREATE DATABASE IF NOT EXISTS automobile_management;
USE automobile_management;

-- Create Mercedes table
CREATE TABLE IF NOT EXISTS mercedes (
    SRno INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(100) NOT NULL,
    body_type VARCHAR(50),
    fuel_type VARCHAR(50),
    class VARCHAR(50),
    price DECIMAL(10,2),
    output VARCHAR(50),
    acceleration FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create BMW table
CREATE TABLE IF NOT EXISTS BMW (
    SRno INT PRIMARY KEY AUTO_INCREMENT,
    Model VARCHAR(100) NOT NULL,
    Bodytype VARCHAR(50),
    Fueltype VARCHAR(50),
    Price DECIMAL(10,2),
    Acceleration FLOAT,
    topspeed INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    SRno INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    car VARCHAR(100),
    phone_number VARCHAR(15),
    age INT,
    car_company VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
    empno INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    post VARCHAR(50),
    salary DECIMAL(10,2),
    sales_in_month INT,
    grade VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for Mercedes
INSERT INTO mercedes (model, body_type, fuel_type, class, price, output, acceleration) VALUES
('C-Class', 'Sedan', 'Petrol', 'Luxury', 5500000.00, '255 HP', 5.9),
('E-Class', 'Sedan', 'Diesel', 'Executive', 7500000.00, '285 HP', 6.1),
('GLA', 'SUV', 'Petrol', 'Compact', 4800000.00, '220 HP', 6.7),
('GLC', 'SUV', 'Diesel', 'Mid-size', 6200000.00, '245 HP', 6.3);

-- Insert sample data for BMW
INSERT INTO BMW (Model, Bodytype, Fueltype, Price, Acceleration, topspeed) VALUES
('3 Series', 'Sedan', 'Petrol', 5200000.00, 5.8, 250),
('X3', 'SUV', 'Diesel', 6100000.00, 6.1, 230),
('5 Series', 'Sedan', 'Petrol', 7400000.00, 5.2, 250),
('X5', 'SUV', 'Diesel', 8500000.00, 5.9, 235);

-- Insert sample data for customers
INSERT INTO customers (name, address, car, phone_number, age, car_company) VALUES
('Rahul Sharma', 'Delhi', 'C-Class', '9876543210', 35, 'Mercedes'),
('Priya Patel', 'Mumbai', 'X3', '8765432109', 28, 'BMW'),
('Amit Singh', 'Bangalore', 'E-Class', '7654321098', 42, 'Mercedes'),
('Neha Gupta', 'Pune', '3 Series', '6543210987', 31, 'BMW');

-- Insert sample data for employees
INSERT INTO employees (name, post, salary, sales_in_month, grade) VALUES
('Rajesh Kumar', 'Sales Manager', 85000.00, 12, 'A'),
('Sneha Verma', 'Sales Executive', 45000.00, 8, 'B'),
('Vikram Malhotra', 'Service Manager', 75000.00, 15, 'A'),
('Anita Desai', 'Sales Executive', 48000.00, 10, 'B');

-- Add indexes for better query performance
CREATE INDEX idx_mercedes_price ON mercedes(price);
CREATE INDEX idx_bmw_price ON BMW(Price);
CREATE INDEX idx_customer_car ON customers(car);
CREATE INDEX idx_employee_sales ON employees(sales_in_month); 