export function convertToObject(leanDocument){
    for(const key of Object.keys(leanDocument)){
        if(leanDocument[key].toJSON && leanDocument.toString){
            leanDocument[key] = leanDocument[key].toString()

        }
    }
    return leanDocument
}