<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Buscaminas</title>

    <!-- JQuery -->
    <script src="./js/jquery-3.2.1.slim.min.js"></script>
    <!-- Popper -->
    <script src="./js/popper.min.js"></script>
    <!-- Bootstrap-->
    <link rel="stylesheet" href="./css/bootstrap.css">
    <script src="./js/bootstrap.js"></script>

    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/buscaminas.js"></script>
</head>
<body>
    <header>
        <div class="row justify-content-md-center">
            <h1>Buscaminas</h1>
        </div>
    </header>
    <div class="container">
        <div class="row text-center justify-content-md-center">
            <div class="col">
                <label>1. Teclee el número de columnas y filas que tendrá el tablero</label>
                <div class="form-group col-6 offset-3">
                    <label for="columnas">Columnas</label>
                    <input type="number" class="form-control" id="columnas" placeholder="# columnas" min="0" step="1" value="0">
                </div>
                <div class="form-group col-6 offset-3">
                    <label for="filas">Filas</label>
                    <input type="number" class="form-control" id="filas" placeholder="# filas" min="0" step="1" value="0">
                </div>
            </div>
            <div class="col">
                <label>2. Seleccione la posición de la mina dando clic en algún botón del tablero</label>
                <div class="col">
                    <table class="table" id="table_minas" style="display: none;">
                    </table>
                </div>
            </div>
            <div class="col">
                <label>3. Resultado:</label>
                <div class="col">
                    <table class="table" id="table_result" style="display: none;">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <footer>
        By Mike Mtz
    </footer>
</body>
</html>