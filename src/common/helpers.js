/**
 * @param {Array} dataSource
 * @returns объект колонки в формате AntTable
 */
export const getColumns = (dataSource) => {
  if (dataSource.length > 0) {
    const firstRow = dataSource[0];
    return columnsNames(firstRow).map((field) => {
      return {
        title: field,
        dataIndex: field,
      };
    });
  }
  return [];
};

/**
 * @param {Array} dataRow
 * @returns список полей без вложенний
 */
const columnsNames = (dataRow) => {
  return [...Object.keys(dataRow)].filter((prop) => {
    return typeof dataRow[prop] !== "object";
  });
};
