const { test } = QUnit;

test("Prueba de dimensión 12x12", t => {
    t.equal(testDimension(12,12), "12,12");
});

test("Prueba de dimensión 23x9", t => {
    t.equal(testDimension(23,9), "23,9");
});

test( "Prueba de establecimiento de mina en posición 5, 8 con un tablero de 10x10", t => {
    let response = minaOn(10,10,5,8);//(filas, columas, posición x de mina, posición y de mina)
    t.ok( response.status, response.message);
});

test( "Prueba de establecimiento de mina en posición 2, 1 con un tablero de 4x5", t => {
    let response = minaOn(4,5,2,1);//(filas, columas, posición x de mina, posición y de mina)
    t.ok( response.status, response.message);
});

/**
 * Prueba de dimensiones de la tabla de buscaminas con botones
 * @param row
 * @param col
 * @returns {string}
 */
let testDimension = function(row, col) {
  let row_test = 0;
  let col_test = 0;
  let html = $.parseHTML(drawMinas(row,col));
  $.each(html, function (i, item) {
    row_test = item.nodeName == 'TR' ? parseInt(row_test) + 1 : row_test; //Número de filas
      $.each(item.childNodes, function (idx, el) {
          col_test = el.nodeName == 'TD' && i == 0 ? parseInt(col_test) + 1 : col_test; //Número de columnas
      });
  });
  return row_test + "," + col_test;
};

/**
 *
 * @param row
 * @param col
 * @param x
 * @param y
 * @returns {{status: boolean, message: string}}
 */
let minaOn = function(row, col, x, y) {
  let response = {status:false, message:''};
  drawMinas(row,col); //Se dibuja la tabla de acuerdo a las dimensiones
  setMina(x, y, 'add') //Se define la posición de la mina
  $("#res_" + x + "_" + y).text("*");//Se establece el caracter "*" como mina
  let html = $.parseHTML($("#table_result").html());

  $.each(html, function (i, item) {
      $.each(item.childNodes, function (idx, el) {
        let text = el.childNodes[0].textContent;
        response.message += text + " ";
        if(i == x && idx == y)
          response.status = text == "*";
      });
      response.message += "\r\n, ";
  });

  response.message = response.message.slice(0,-2);

  return response;
};
