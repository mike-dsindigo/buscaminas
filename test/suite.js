const { test } = QUnit;

test("Prueba de dimensión 12x12", t => {
    t.equal(test_dimension(12,12), "12,12");
});

test("Prueba de dimensión 23x9", t => {
    t.equal(test_dimension(23,9), "23,9");
});

/**
 * Prueba de dimensiones de la tabla de buscaminas con botones
 * @param row
 * @param col
 * @returns {string}
 */
let test_dimension = function(row, col) {
  let row_test = 0;
  let col_test = 0;
  let html = $.parseHTML(drawMinas(row,col));
  $.each(html, function (i, item) {
    row_test = item.nodeName == 'TR' ? parseInt(row_test) + 1 : row_test;
      $.each(item.childNodes, function (idx, el) {
          col_test = el.nodeName == 'TD' && i == 0 ? parseInt(col_test) + 1 : col_test;
      });
  });
  return row_test + "," + col_test;
};
