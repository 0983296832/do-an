module.exports = function (query, queryString) {
  this.query = query; //product.find()
  this.queryString = queryString; //req.queryString

  this.paginating = function () {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = limit * (page - 1);
    this.query = this.query.limit(limit).skip(skip);
    return this;
  }; //this.query = Products.find().limit(limit).skip(skip)

  this.sorting = () => {
    const sort = this.queryString.sort || "-created";
    this.query = this.query.sort(sort);
    return this;
    //localhost:3000/product/get-all?sort=created
  }; //this.query = Products.find().limit(limit).skip(skip).sort(sort)

  this.searching = () => {
    const search = this.queryString.search;
    if (search) {
      if (search === "searchName") {
        this.query = this.query.find({
          name: { $regex: search, $options: "i" },
        });
      } else {
        this.query = this.query.find({
          product_code: { $regex: search, $options: "i" },
          // $text: { $search: search},
          //localhost:3000/product/get-all?search=product_code
        });
      }
    } else {
      this.query = this.query.find();
    }
    return this;
  };
  //localhost:3000/product/get-all?search=%product_code%
  //localhost:3000/product/get-all?searchName=%name%
  //this.query = Products.find().find({
  //     $text: { $search: search }
  //  }).limit(limit).skip(skip).sort(sort)

  this.filtering = () => {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "search", "searchName"];
    excludedFields.forEach((el) => delete queryObj[el]);

    if (queryObj.detailsSize) {
      if (queryObj.detailsSize.elemMatch != "") {
        queryObj.details = {
          elemMatch: { size: queryObj.detailsSize.elemMatch },
        };
      } else {
        delete queryObj.detailsSize;
      }
    }
    if (queryObj.detailsColor) {
      if (queryObj.detailsColor.elemMatch != "") {
        queryObj.details = {
          elemMatch: { color: queryObj.detailsColor.elemMatch },
        };
      } else {
        delete queryObj.detailsColor;
      }
    }
    // let queryStr;
    // if (queryObj.price) {
    //   const regex = /\d+/g;
    //   let newQuery = { price: {} };
    //   queryObj.price.match(regex).forEach((item, index) => {
    //     if (index === 0) {
    //       newQuery.price.gte = item;
    //     } else {
    //       newQuery.price.lte = item;
    //     }
    //   });

    //   queryStr = JSON.stringify(newQuery);
    // } else {
    //   queryStr = JSON.stringify(queryObj);
    // }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex|elemMatch|eq|options)\b/g,
      (match) => "$" + match
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  };
  //localhost:3000/product/get-all?price[gte]=300&price[lte]=10000
  //localhost:3000/product/get-all?name[regex]=nike
  //this.query = Products.find().find({
  //     {"price":{"$gt":"56.99"}}
  //  }).limit(limit).skip(skip).sort(sort)
  this.counting = () => {
    this.query = this.query.count();
    return this;
  };
};
