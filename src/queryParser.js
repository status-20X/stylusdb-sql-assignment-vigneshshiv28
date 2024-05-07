function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (!match) {
        throw new Error('Invalid query format');
    }

    const [, fields, table, whereString] = match;
    const whereClauses = whereString ? parseWhereClause(whereString) : [];

    return {
        fields: fields.split(',').map(field => field.trim()),
        table: table.trim(),
        whereClauses
    };
}

function parseWhereClause(whereString) {
    try {
        const conditions = whereString.split(/ AND | OR /i);
        return conditions.map(condition => {
            const [field, operator, value] = condition.split(/\s+/);
            return { field, operator, value };
        });
    } catch (error) {
        throw new Error('Error parsing WHERE clause: ' + error.message);
    }
}

module.exports = parseQuery;

