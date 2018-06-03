# Api 

## Get

### get one resource by resource id
- /api/{resource}/{resource_id}

### get resources by page
- /api/{resource}s/
    - query
        - page {object} optional
            - index {number} page index
            - count {number} get resource count
        - where {object} optional
            - ...[key:string]:string|number
            - aon {string} AND、OR、NOT
        - desc {string} optional
    - result
        - list {array} resources list
        - total {number} resource total count