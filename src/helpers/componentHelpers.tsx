import {useTranslation} from 'react-i18next';
import {Column, GridReadyEvent} from 'ag-grid-community';

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */
/**
 * @param {string} label required params
 *  @param {string} lang required params
 * @return {string} language
 */
export function GetLanguage(label: string, lang?: string) {
  const {t, i18n} = useTranslation();
  t(label);
  lang ? i18n.changeLanguage(lang) : i18n.changeLanguage('eng');
  return t(label);
}
/**
 * @param {string} props required params
 * @return {any} props
 */
export function saveFilter(props: any) {
  return props;
}

/**
 * @param {Array<object>} rowData required params
 * @param {GridReadyEvent} gridEvent required params
 * @return {Array} a new row
 */
export function addRow(rowData: any, gridEvent: GridReadyEvent) {
  const columnList: Column[] | null = gridEvent.columnApi.getAllColumns();
  // console.log(columnList);
  const elements: any = {};
  columnList &&
    columnList.map((obj: Column) => {
      if (obj['colId'] === 'status') {
        elements[obj['colId']] = true;
      } else {
        elements[obj['colId']] = '';
      }
    });
  rowData.unshift(elements);
  setTimeout(() => {
    gridEvent.api.startEditingCell({
      rowIndex: 0,
      colKey: 'name',
    });
  }, 10);
  return rowData;
}
