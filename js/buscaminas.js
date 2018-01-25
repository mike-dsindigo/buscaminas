$(function() {
    //Inicializar variables
    let columnas = $("#columnas").val();
    let filas = $("#filas").val();
    /**
     * Acción detonada al cambiar el número de columnas
     */
    $("#columnas").change(function () {
        columnas = $(this).val();
        drawMinas(filas, columnas);
    });
    /**
     * Acción detonada al cambiar el número de filas
     */
    $("#filas").change(function () {
        filas = $(this).val();
        drawMinas(filas, columnas);
    });
});

/**
 * Función que traza los tableros dependiendo del número de filas y columnas que se envíen
 * @param filas
 * @param columnas
 */
let drawMinas = function(filas, columnas) {
    if(filas < 1 || columnas < 1){ //Matriz no válida
        $("#table_minas").hide();
        $("#table_result").hide('fast');
        return
    }

    //Las tablas se crearán con el código html que se genere
    let html_minas = "";
    let html_result = "";
    for(let i=0; i<filas; i++){
        html_minas += "<tr>";
        html_result += "<tr>";
        for(let j=0; j<columnas; j++){
            let id_btn = "'" + i + "_" + j + "'";
            html_minas += "<td>"+
                "<button class='btn btn-block btn_mina' onclick=changeMina(" + id_btn + ") " +
                " x='" + i + "' y='" + j + "' status='off' id=" + id_btn + ">" +
                "<i class='far fa-circle'></i>" +
                "</button>"+
                "</td>";
            html_result += "<td id='td_" + i + "_" + j + "'><span id='res_" + i + "_" + j + "' class='text_0'>0</span></td>";
        }
        html_minas += "</tr>";
        html_result += "</tr>";
    }

    $("#table_minas").html(html_minas).show();
    $("#table_result").html(html_result).show();

    return html_minas;
}

/**
 * Función que cambia el status del botón
 * @param btn_id
 */
let changeMina = function(btn_id) {
    let element = $("#" + btn_id);
    let result = $("#res_" + btn_id);
    let td = $("#td_" + btn_id);
    td.attr('class', '');

    //Getting data
    let x = element.attr('x');
    let y = element.attr('y');
    let status = element.attr('status');

    //Switch status
    if(status == 'off') {
        element.addClass('btn-danger').html("<i class='fas fa-asterisk'></i>").attr('status', 'on');
        result.html("<i class='fas fa-asterisk'></i>").attr('class','').addClass('text_white');
        td.addClass('bg-danger');
        setMina(x, y, 'add');
    }else {
        element.removeClass('btn-danger').html("<i class='far fa-circle'></i>").attr('status', 'off');
        setMina(x, y, 'remove');
    }
};

/**
 * Función que actualiza el status, valor y estilo de uno o varios elementos en el tablero de resultados dependiendo de
 * la acción a realizar
 * @param x
 * @param y
 * @param action
 */
let setMina = function(x, y, action) {
    x = parseInt(x);
    y = parseInt(y);
    let count = 0;
    for(let i = (x - 1); i <= (x + 1); i++){
        for(let j = (y - 1); j <= (y + 1); j++){
            let item = $("#res_" + i + "_" + j);
            switch (action){
                case 'add':
                    if((i + "_" + j) != (x + "_" + y)) {
                        if(parseInt(item.text())>=0){
                            let value = parseInt(item.text()) + 1;
                            item.html(value).attr('class','').addClass('text_' + value);
                        }
                    }
                    break;
                case 'remove':
                    if(parseInt(item.text())>=0){
                        let value = parseInt(item.text()) - 1;
                        item.html(value).attr('class','').addClass('text_' + value);
                    }
                    break;
                case 'check':
                    if ((i + "_" + j) != (x + "_" + y)) {
                        if (!(parseInt(item.text()) >= 0) && item[0])
                            count++;
                    }
                    break;
            }
        }
    }
    if(action=='remove')
        setMina(x, y, 'check');
    if(action=='check')
        $("#res_" + x + "_" + y).html(count).attr('class','').addClass('text_' + count);

    return $("#table_result").html();
};



