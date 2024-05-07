function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (!match) {
        throw new Error('Invalid query format');
    }

    const [, fields, table, whereClause] = match;
    const parsedQuery = {
        fields: fields.split(',').map(field => field.trim()),
        table: table.trim(),
        whereClause: whereClause ? whereClause.trim() : null
    };

    return parsedQuery;
}

module.exports = parseQuery;
