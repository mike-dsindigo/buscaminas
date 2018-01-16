'use strict';
$(function() {
    let columnas = $("#columnas").val();
    let filas = $("#filas").val();
    $("#columnas").change(function () {
        columnas = $(this).val();
        drawMinas(filas, columnas);
    });
    $("#filas").change(function () {
        filas = $(this).val();
        drawMinas(filas, columnas);
    });

    let drawMinas = function(filas, columnas) {
        if(filas < 1 || columnas < 1){
            $("#table_minas").hide();
            $("#table_result").hide('fast');
            return
        }

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
                html_result += "<td><span id='res_" + i + "_" + j + "'>0</span></td>";
            }
            html_minas += "</tr>";
            html_result += "</tr>";
        }

        $("#table_minas").html(html_minas).show();
        $("#table_result").html(html_result).show();
    }
});

let changeMina = function(btn_id) {
    let element = $("#" + btn_id);
    let result = $("#res_" + btn_id);

    let x = element.attr('x');
    let y = element.attr('y');
    let status = element.attr('status');

    if(status == 'off') {
        element.addClass('btn-danger').html("<i class='fas fa-flag'></i>").attr('status', 'on');
        result.html("<i class='fas fa-flag'></i>");
        addMina(x, y);
    }else {
        element.removeClass('btn-danger').html("<i class='far fa-circle'></i>").attr('status', 'off');
        removeMina(x, y);
    }
};

let addMina = function(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    for(let i = (x - 1); i <= (x + 1); i++){
        for(let j = (y - 1); j <= (y + 1); j++){
            if((i + "_" + j) != (x + "_" + y)) {
                let item = $("#res_" + i + "_" + j);
                if(parseInt(item.text())>=0){
                    let value = parseInt(item.text()) + 1;
                    item.html(value);
                }
            }
        }
    }
};

let removeMina = function(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    for(let i = (x - 1); i <= (x + 1); i++){
        for(let j = (y - 1); j <= (y + 1); j++){
            let item = $("#res_" + i + "_" + j);
            if(parseInt(item.text())>=0){
                let value = parseInt(item.text()) - 1;
                item.html(value);
            }
        }
    }
    checkItem(x, y);
};

let checkItem = function(x, y) {
    let item = $("#res_" + x + "_" + y);
    x = parseInt(x);
    y = parseInt(y);
    let count = 0;
    for(let i = (x - 1); i <= (x + 1); i++){
        if( i>=0) {
            for (let j = (y - 1); j <= (y + 1); j++) {
                if( j>=0 ) {
                    if ((i + "_" + j) != (x + "_" + y)) {
                        let item_check = $("#res_" + i + "_" + j);console.log();
                        if (!(parseInt(item_check.text()) >= 0) && item_check[0])
                            count++;
                    }
                }
            }
        }
    }
    item.html(count);
};



