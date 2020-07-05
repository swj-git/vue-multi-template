import { ref, reactive, computed, watch } from '@vue/composition-api';
import { uniqBy } from 'lodash';

function convertPageSort(
  sort,
  {
    toElementTable = true,
    orderKey = {
      asc: 'asc',
      desc: 'desc'
    }
  } = {}
) {
  const elementOrderKey = {
    asc: 'ascending',
    desc: 'descending'
  };

  if (toElementTable) {
    return {
      prop: sort.orderBy,
      order:
        sort.order === orderKey['asc']
          ? elementOrderKey['asc']
          : elementOrderKey['desc']
    };
  } else {
    return {
      orderBy: sort.prop,
      order:
        sort.order === elementOrderKey['asc']
          ? orderKey['asc']
          : orderKey['desc']
    };
  }
}

function useTable(options = {}) {
  const {
    topPagerMinRows = 40,
    uniqueKey = 'id',
    orderKey = {
      asc: 'asc',
      desc: 'desc'
    }
  } = options;
  const updatingCount = ref(0);
  const state = reactive({
    initialPage: {},

    initialFilter: {},

    page: {},

    filter: {},

    list: {},

    selection: [],

    crossPageSelection: []
  });
  const showTopPager = computed(() => state.page.pageSize >= topPagerMinRows);
  const initialPageSort = computed(() => {
    return convertPageSort(state.initialPage, {
      orderKey
    });
  });

  const increaseUpdatingCount = function() {
    updatingCount.value++;
  };

  const setPage = function(page = {}, { merge = true } = {}) {
    if (merge) {
      state.page = Object.assign({}, state.page, page);
    } else {
      state.page = page;
    }
  };

  const setInitialPage = function(page = {}) {
    state.page = state.initialPage = page;
  };

  const setFilter = function(filter = {}, { merge = true } = {}) {
    if (merge) {
      state.filter = Object.assign({}, state.filter, filter);
    } else {
      state.filter = filter;
    }
  };

  const setInitialFilter = function(filter = {}) {
    state.filter = state.initialFilter = filter;
  };

  const setList = function(list = {}) {
    state.list = list;
  };

  const setPageSort = function(sort) {
    if (sort.prop && sort.order) {
      sort = convertPageSort(sort, {
        orderKey,
        toElementTable: false
      });
      setPage(sort);
    } else {
      setPage({
        order: state.initialPage.order,
        orderBy: state.initialPage.orderBy
      });
    }

    increaseUpdatingCount();
  };

  const setPageSize = function(pageSize) {
    if (state.page.pageSize !== pageSize) {
      setPage({
        pageSize
      });

      increaseUpdatingCount();
    }
  };

  const setPageNo = function(pageNo) {
    if (pageNo !== state.page.pageNo) {
      setPage({
        pageNo
      });

      increaseUpdatingCount();
    }
  };

  const setSelection = function(items = []) {
    state.selection = items;
  };

  const addCrossPageSelection = function(items = []) {
    const previousCount = state.crossPageSelection.length;
    const arr = state.crossPageSelection.concat(items);

    state.crossPageSelection = uniqBy(arr, uniqueKey);

    return state.crossPageSelection.length - previousCount;
  };

  const removeCrossPageSelection = function(items = []) {
    const previousCount = state.crossPageSelection.length;
    const leftSelection = [];

    state.crossPageSelection.forEach(sel => {
      const shouldRemove = !!items.find(
        item => item[uniqueKey] === sel[uniqueKey]
      );

      if (!shouldRemove) {
        leftSelection.push(sel);
      }
    });

    state.crossPageSelection = leftSelection;

    return previousCount - state.crossPageSelection.length;
  };

  const clearCrossPageSelection = function() {
    const previousCount = state.crossPageSelection.length;

    state.crossPageSelection = [];

    return previousCount;
  };

  const triggerUpdate = function() {
    increaseUpdatingCount();
  };

  const watchUpdate = function(task) {
    watch(updatingCount, () => {
      task();
    });
  };

  return {
    state,
    initialPageSort,
    showTopPager,

    setList,

    setPage,
    setInitialPage,

    setFilter,
    setInitialFilter,

    setPageSort,
    setPageSize,
    setPageNo,

    setSelection,
    addCrossPageSelection,
    removeCrossPageSelection,
    clearCrossPageSelection,

    triggerUpdate,
    watchUpdate
  };
}

export { useTable };
