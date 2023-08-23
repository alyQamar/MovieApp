class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pop(modelName) {
    if (modelName === "Movie") {
      this.mongooseQuery = this.mongooseQuery
        .find({})
        .populate({ path: "category", select: "name -_id" });
    }

    return this;
  }

  // [x] Filtration
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];

    excludeFields.forEach((field) => {
      delete queryStringObj[field];
    });

    // Apply filtration using [gte,gt,lte,lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  // [x] Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  // [x] Fields limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  // [x] Search
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "Movie") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  // [x] pagination
  paginate(countDocuments) {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 50;
    const skip = (page - 1) * limit; // Skip: in page NO.5 [(5-1)*5] so we skip 20 items which are in the last 4 pages
    const endIndex = page * limit; // EndIndex: if current page is 3 and limit of each page is 5 ---> 5*3 = 15

    // Pagination Result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit); // Number of pages: if 50 product ---> 50/5 ---> 10 pages

    if (endIndex < countDocuments) {
      // if current page last product number (end index) < number of all products
      // Next page: current page number + 1
      pagination.next = page + 1;
    }

    if (skip > 0) {
      // if number of last pages products number (skip) > 0 (which means there is at least one page left)
      // Next page: current page number - 1
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
