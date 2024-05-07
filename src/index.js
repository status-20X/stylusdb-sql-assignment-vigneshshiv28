const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    try {
        const { fields, table, whereClauses } = parseQuery(query);
        const data = await readCSV(`${table}.csv`);

        // Apply WHERE clause filtering
        const filteredData = whereClauses.length > 0
            ? applyWhereClause(data, whereClauses)
            : data;

        // Select the specified fields
        return selectFields(filteredData, fields);
    } catch (error) {
        throw new Error(`Error executing SELECT query: ${error.message}`);
    }
}

function applyWhereClause(data, whereClauses) {
    return data.filter(row => whereClauses.every(clause => {
        return row[clause.field] === clause.value;
    }));
}

function selectFields(data, fields) {
    return data.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });
}

module.exports = executeSELECTQuery;
