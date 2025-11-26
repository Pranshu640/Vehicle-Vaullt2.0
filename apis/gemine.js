import { GoogleGenerativeAI } from "@google/generative-ai";

//Add Gemini API Key
const genAI = new GoogleGenerativeAI("");
//Add model name to be used
const model = genAI.getGenerativeModel({ model: "" });

const isDataQuery = async (prompt) => {
    try {
        const analysisPrompt = `
            Determine if this is a database query or a conversational message.
            Context: This is for a car dealership database system.
            
            If the message is asking about:
            - car details
            - prices
            - customer information
            - employee information
            - sales data
            Return exactly "DATABASE"
            
            If it's a general conversation like:
            - greetings
            - small talk
            - general questions not related to car data
            Return exactly "CHAT"
            
            Message: "${prompt}"
        `;

        const result = await model.generateContent(analysisPrompt);
        const response = await result.response;
        return response.text().trim() === "DATABASE";
    } catch (error) {
        console.error('Error in query analysis:', error);
        return false;
    }
};

export const processor = async (prompt) => {
    try {
        // First determine if this is a database query
        const shouldQueryDB = await isDataQuery(prompt);

        if (shouldQueryDB) {
            // Database query logic
            const dbPrompt = `
                You are an automobile sales database assistant. Convert the following request into a valid MySQL query.
                Available tables and their key columns are:
                - employees (empno, name, post, salary, sales_in_month, grade)
                - mercedes (SRno, model, body_type, fuel_type, class, price, output, acceleration)
                - BMW (SRno, Model, Bodytype, Fueltype, Price, Acceleration, topspeed)
                - customers (SRno, name, address, car, phone_number, age, car_company)

                Rules for query generation:
                1. Return ONLY the raw SQL query without any markdown formatting or backticks
                2. Use proper SQL syntax and quotes
                3. For price comparisons, use actual numbers (e.g., 5000000 for 50 lakhs)
                4. Join tables when needed to get complete information
                5. Use appropriate WHERE clauses for filtering
                
                Convert this customer request to SQL: ${prompt}
            `;

            const result = await model.generateContent(dbPrompt);
            const response = await result.response;
            let query = response.text()
                .replace(/```sql\n?/g, '')
                .replace(/```\n?/g, '')
                .replace(/^\s+|\s+$/g, '');

            try {
                const backendResponse = await fetch('http://localhost:3001/api/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query })
                });

                if (!backendResponse.ok) {
                    throw new Error(`HTTP error! status: ${backendResponse.status}`);
                }

                const data = await backendResponse.json();
                return {
                    type: 'database',
                    data: JSON.stringify(data, null, 2)
                };
            } catch (fetchError) {
                throw new Error(`Database Error: ${fetchError.message}`);
            }
        } else {
            // Conversational response logic
            const chatPrompt = `
                You are a helpful car dealership assistant. Respond to the following message in a friendly and professional manner.
                Keep responses concise and related to automotive topics when possible.
                Message: ${prompt}
            `;

            const result = await model.generateContent(chatPrompt);
            const response = await result.response;
            return {
                type: 'chat',
                data: response.text()
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            type: 'error',
            data: error.message
        };
    }
};



