import './index.css'
import { useState } from 'react'
import { processor } from '../../../apis/gemine.js'

export default function Chatbox() {
    const [dbResponse, setDbResponse] = useState(null)
    const [chatResponse, setChatResponse] = useState('Welcome! I can help you with car information and general inquiries. Try asking about our cars or just say hello!')
    const [isLoading, setIsLoading] = useState(false)

    const EmptyTable = () => (
        <div className="empty-state">
            <div className="query-display">
                Try these example queries:
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Query Type</th>
                        <th>Example</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Car Search</td>
                        <td>"Show me all Mercedes cars under 50 lakhs"</td>
                    </tr>
                    <tr>
                        <td>Customer Info</td>
                        <td>"List all customers from Delhi"</td>
                    </tr>
                    <tr>
                        <td>Employee Data</td>
                        <td>"Show sales executives with grade A"</td>
                    </tr>
                    <tr>
                        <td>BMW Models</td>
                        <td>"Find BMW SUVs with top speed above 250"</td>
                    </tr>
                    <tr>
                        <td>Sales Analysis</td>
                        <td>"Show employees with more than 3 sales this month"</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const formatDataToTable = (data) => {
        try {
            const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
            if (!parsedData.results || !parsedData.results.length) {
                return (
                    <div className="no-results">
                        <div className="query-display">
                            {parsedData.query}
                        </div>
                        <p>No results found for this query</p>
                    </div>
                );
            }

            const headers = Object.keys(parsedData.results[0]);
            
            return (
                <div>
                    <div className="query-display">
                        {parsedData.query}
                    </div>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {headers.map(header => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {parsedData.results.map((row, i) => (
                                    <tr key={i}>
                                        {headers.map(header => (
                                            <td key={`${i}-${header}`}>{row[header]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } catch (error) {
            console.error('Error formatting data:', error);
            return <div className="error-state">Error displaying results</div>;
        }
    }

    const send = async (event) => {
        if (event.key === 'Enter') {
            try {
                const prompt = event.target.value
                setIsLoading(true)
                const result = await processor(prompt)
                
                if (result.type === 'database') {
                    setDbResponse(result.data);
                    setChatResponse('Here are the database results for your query.');
                } else if (result.type === 'chat') {
                    setChatResponse(result.data);
                    setDbResponse(null);
                } else {
                    setChatResponse('Sorry, there was an error processing your request.');
                    setDbResponse(null);
                }
                
                event.target.value = ''
            } catch (error) {
                console.error('Error:', error);
                setChatResponse('Sorry, there was an error processing your request.');
                setDbResponse(null);
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="chatbox-container">
            <div className="top-section">
                <div className="input-section">
                    <div className="welcome-message">
                        Vehicle Vault Assistant
                    </div>
                    <div className="input-wrapper">
                        <input 
                            placeholder="Ask about our cars or just chat with me..." 
                            onKeyDown={send}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="chat-response">
                    {isLoading ? 'Thinking...' : chatResponse}
                </div>
            </div>
            <div className="results-section">
                {dbResponse ? formatDataToTable(dbResponse) : <EmptyTable />}
            </div>
        </div>
    )
}