class Features {
    constructor(query,queryString){
        this.queryString =queryString;
        this.query= query;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields =['page','sort','limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]);
        let queryStr =JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`);
        this.query =this.query.find(JSON.parse(queryStr))
        return this.query
    }
    
}

module.exports =Features;