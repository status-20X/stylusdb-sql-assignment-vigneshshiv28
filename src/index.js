/*const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    try {
        // Parse the SQL query
        const { fields, table, whereClause } = parseQuery(query);
    
        // Read the CSV file
        const data = await readCSV(`${table}.csv`);

        // Selecting the specified fields
        const filteredData = whereClause
            ? data.filter(row => {
                const [field, value] = whereClause.split('=').map(s => s.trim());
                return row[field] === value;
            })
            : data;
        // Selecting the specified fields
        return filteredData.map(row => {
            const selectedRow = {};
            fields.forEach(field => {
                selectedRow[field] = row[field];
            });
            return selectedRow;
    });
    } catch (error) {
        if (error.message.startsWith('ENOENT')) {
            // CSV file not found
            throw new Error(`Table "${table}" does not exist`);
        } else {
            // Other errors
            throw new Error(error.message);
        }
    }
}

module.exports = executeSELECTQuery;*/