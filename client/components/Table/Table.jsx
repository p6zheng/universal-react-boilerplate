import makeSortable from './Sortable';
import makeSelectable from './Selectable';
import makePageable from './Pageable';
import TableContainer from './TableContainer';
import makeFilterable from './Filterable';

export default [
    makePageable,
    makeSelectable,
    makeSortable,
    makeFilterable,
].reduce((memo, cur) => cur(memo), TableContainer);
