import { Document, Model, FilterQuery } from 'mongoose'; // Import necessary types from mongoose


type MongooseModel<T extends Document> = Model<T>;


interface PaginationOptions {
    pageNumber?: number;
    pageSize?: number;
    sort?: any; 
}


interface PaginatedResult<T> {
    results: T[];
    totalCount: number;
    page: number;
    totalPages: number;
}


const paginate = async <T extends Document>(
    model: MongooseModel<T>,
    query: FilterQuery<T> = {},
    options: PaginationOptions = {}
): Promise<PaginatedResult<T>> => {
    try {
        const { pageNumber = 1, pageSize = 5, sort = {} } = options;

        const skips = pageSize * (pageNumber - 1);

       
        const cursor = model.find(query)
                            .sort(sort)
                            .skip(skips)
                            .limit(pageSize);

        
        const results = await cursor.exec();
        const totalCount = await model.countDocuments(query);

        return {
            results,
            totalCount,
            page: pageNumber,
            totalPages: Math.ceil(totalCount / pageSize)
        };
    } catch (error) {
        throw new Error(`Error paginating: ${error}`);
    }
};

export default paginate;
