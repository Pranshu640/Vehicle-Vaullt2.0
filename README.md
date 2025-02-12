Vehicle Vault Assistant 🚗

A smart automotive dealership management system that combines database management with AI-powered assistance using Google's Gemini AI. The system intelligently processes queries to either fetch database information or provide conversational responses about automotive topics.


🌟 Features:

AI-Powered Query Processing: Uses Google's Gemini AI to analyze and handle user queries.

Database Management: Stores and retrieves information about vehicles, customers, and employees.

Natural Language Processing: Differentiates between database queries and conversational requests.

Secure Configuration: Implements environment variables and API key protection.

Scalable Architecture: Modular code structure for easy expansion and maintenance.


🛠️ Core Components:

AI Integration (apis/gemine.js)

Smart query analysis to differentiate between database and conversational queries.

Generates SQL queries dynamically for database interactions.

Provides natural language responses for general inquiries.

Server Configuration (server/config.js)

Manages database connections and environment variables.

Ensures secure credential handling and API key management.

Database Structure

Stores and organizes information for:

Mercedes Vehicles: Model, body type, fuel type, class, price, output, acceleration.

BMW Vehicles: Model, body type, fuel type, price, acceleration, top speed.

Customer Records: Personal details, purchase history.

Employee Data: Performance metrics, roles, and responsibilities.

Server Implementation (server/index.js)

Initializes the Express server.

Configures middleware for request handling.

Connects to the database and loads API routes.

Starts the server on a specified port.


🔧 Technical Implementation:

Query Processing Workflow

Input Analysis: Determines if a query is database-related or conversational.

Database Queries:

Converts natural language to SQL.

Executes the query on relevant tables.

Returns structured results to the user.

Conversational Queries:

Generates context-aware responses.

Provides automotive knowledge and insights.

Security Features

Environment Variable Protection: Ensures sensitive data is stored securely.

Database Connection Security: Uses secure credentials for database access.

API Key Protection: Keeps API keys hidden and git-ignored.




🚀 Setup & Installation

Prerequisites

Node.js installed on your system

MySQL database configured and running

Google Gemini API credentials

Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pranshu640/Vehicle-Vault2.0.git
   cd Vehicle-Vault2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your credentials
   nano .env
   ```

4. **Start the application**
   ```bash
   # Start frontend
   npm run dev
   
   # Start backend (in a new terminal)
   node server/index.js
   ```


💡 Use Cases

Vehicle Inventory Management: Retrieve details about available cars.

Customer Lookup: Fetch customer records and purchase history.

Sales Data Analysis: Track and analyze sales trends.

Automotive Assistance: Get AI-powered responses for vehicle-related inquiries.

Price & Specification Queries: Ask about car models, pricing, and specifications.



🤝 Contributing

Feel free to contribute to this project! Fork the repository, make changes, and submit a pull request.



📜 License

This project is licensed under the MIT License.


🚀 Vehicle Vault 2.0 – Making automotive management smarter with AI!

## 💾 Database Schema

### Mercedes Table

```sql
CREATE TABLE mercedes (
    SRno INT PRIMARY KEY,
    model VARCHAR(100),
    body_type VARCHAR(50),
    fuel_type VARCHAR(50),
    class VARCHAR(50),
    price DECIMAL(10,2),
    output VARCHAR(50),
    acceleration FLOAT
);
```

### BMW Table
```sql
CREATE TABLE BMW (
    SRno INT PRIMARY KEY,
    Model VARCHAR(100),
    Bodytype VARCHAR(50),
    Fueltype VARCHAR(50),
    Price DECIMAL(10,2),
    Acceleration FLOAT,
    topspeed INT
);
```

🔍 Features In Detail

### AI Query Processing
- Natural language understanding
- Automatic query type detection
- Dynamic SQL generation
- Contextual response generation

### Database Management
- Vehicle inventory tracking
- Customer information management
- Employee performance metrics
- Sales data analysis

### Security Features
- Environment variable protection
- Secure credential management
- API key protection
- SQL injection prevention

📱 Usage Examples

```javascript
// Example: AI-powered query
const response = await processor("Show me all Mercedes cars under 50 lakhs");

// Example: Conversational query
const response = await processor("What's the best BMW for city driving?");
```

🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

📜 License

Distributed under the MIT License. See `LICENSE` for more information.



---
<div align="center">
Made with ❤️ by Pranshu Bansal
</div>

