'use strict';


import _ from 'lodash';
import {
    DEFAULT_PAGE,
    DEFAULT_ITEMS_PER_PAGE_AMOUNT,
    DEFAULT_SORT_DIRECTION,
    DEFAULT_SORT_FIELDS
} from '@/core/constants';


class Pager {

  constructor(
      page :Number = DEFAULT_PAGE,
      itemsPerPage :Number = DEFAULT_ITEMS_PER_PAGE_AMOUNT,
      sortDirection :String = DEFAULT_SORT_DIRECTION,
      sortColumns :Array = DEFAULT_SORT_FIELDS
  ) :Pager {
    if (_.isObject(page) && (arguments.length == 1)) {
      return this._fromQueryObject(page);
    }

    this._page = page;
    this._itemsPerPage = itemsPerPage;
    this._sortDirection = sortDirection;
    this._sortColumns = !_.isArray(sortColumns) ? [sortColumns] : sortColumns;

    return this;
  }


  _fromQueryObject(options) :Pager {
    this._page = options.page;
    this._itemsPerPage = options.itemsPerPage;
    this._sortDirection = options.sortDirection;
    this._sortColumns = !_.isArray(options.sortColumns) ? [options.sortColumns] : options.sortColumns;

    return this;
  }


  static fromRequest(request) {
    return new Pager(request.query);
  }


  page() :Number {
    return this._page;
  }


  itemsPerPage() :Number {
    return this._itemsPerPage;
  }


  sortDirection() :String {
    return this._sortDirection;
  }


  sortColumns() :Array<String> {
    return this._sortColumns;
  }


  toQueryObject() :Number {
    return {
      page: this.page(),
      itemsPerPage: this.itemsPerPage(),
      sortDirection: this.sortDirection(),
      sortColumns: this.sortColumns()
    }
  }
}


export default Pager;
