var juego =
{
	filas: [ [] , [] , [] ],
	espacioVacio: 
	{
		fila: 2,
		columna: 2
	},
	iniciar: function (x) 
	{
		this.instalarPiezas( x );
		this.mezclarFichas(200);
		this.capturarTeclas();
	},
	crearPieza: function (idImagen, fi, co) 
	{
		var $ficha = $("<div>");
		$ficha.addClass("pieza");
		$ficha.css(
		{
			top: fi * 200,
			left: co * 200,
			backgroundImage: 'url(piezas/' + idImagen + '.jpeg)'
		});
		return {
			filaInicial: fi,
			columnaInicial: co,
			$ficha: $ficha
		};
	},
	instalarPiezas: function (tablero) 
	{
		var contador = 0;
		for (var fi = 0; fi < 3; fi++) {
			for (var co = 0; co < 3; co++) 
			{
				if (this.espacioVacio.columna === co
					&& this.espacioVacio.fila === fi) 
				{
					this.filas[fi][co] = null;
				}
				else
				{
					contador = contador + 1;
					var pieza = this.crearPieza(contador, fi, co);
					this.filas[fi][co] = pieza;
					tablero.append(pieza.$ficha);
				}
			}
		}
	},
	moverHaciaAbajo: function () {
		var filaOrigen = this.espacioVacio.fila-1;
		var columnaOrigen = this.espacioVacio.columna;
		this.intercambiarPosicionConEspacioVacio (filaOrigen, columnaOrigen);
	},
	moverHaciaArriba: function () {
		var filaOrigen = this.espacioVacio.fila+1;
		var columnaOrigen = this.espacioVacio.columna;
		this.intercambiarPosicionConEspacioVacio (filaOrigen, columnaOrigen);
	},
	moverHaciaLaDerecha: function () {
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna-1;
		this.intercambiarPosicionConEspacioVacio (filaOrigen, columnaOrigen);
	},
	moverHaciaLaIzquierda: function () {
		var filaOrigen = this.espacioVacio.fila;
		var columnaOrigen = this.espacioVacio.columna+1;
		this.intercambiarPosicionConEspacioVacio (filaOrigen, columnaOrigen);
	},
	capturarTeclas: function () {
		var that = this;
		$(document).keydown( function(evento) {
			switch(evento.which)
			{
				case 37:
					that.moverHaciaLaIzquierda();
					that.chequearVictoria();
				break;

				case 38:
					that.moverHaciaArriba();
					that.chequearVictoria();
				break;

				case 39:
					that.moverHaciaLaDerecha();
					that.chequearVictoria();
				break;

				case 40:
					that.moverHaciaAbajo();
					that.chequearVictoria();
				break;

				default: return;
			}
			evento.preventDefault();
		});
	},
	moverFichaFilaColumna: function ($ficha, f, c) {
		$ficha.css({
			top: f * 200,
			left: c * 200,
		})
	},
	guardarEspacioVacio: function (f, c) {
		this.espacioVacio.fila = f;
		this.espacioVacio.columna = c;
		this.filas[f][c] = null;
	},
	intercambiarPosicionConEspacioVacio: function (f,c) {
		var ficha = this.filas[f] && this.filas[f][c];
		if(ficha !== undefined)
		{
			this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
			this.moverFichaFilaColumna(ficha.$ficha, this.espacioVacio.fila, this.espacioVacio.columna)
			this.guardarEspacioVacio(f,c);
		}
	},
	mezclarFichas: function (veces) {
		var that = this;
		var espera = 20;
		for (var i = 0; i < veces; i++) 
		{
			var numeroAleatorio = Math.random();
			if (numeroAleatorio > 0.75) 
			{
				setTimeout(function(){that.moverHaciaArriba(); }, i * espera);
				
			}
			else if (numeroAleatorio > 0.5) 
			{
				setTimeout(function(){that.moverHaciaAbajo(); }, i * espera);
			}
			else if (numeroAleatorio > 0.25)
			{
				setTimeout(function(){that.moverHaciaLaIzquierda(); }, i * espera);
			}
			else 
			{
				setTimeout(function(){that.moverHaciaLaDerecha(); }, i * espera);
			}
		}
	},
	chequearVictoria: function() {
		for (var co = 0; co < 3; co++) 
		{
			for (var fi = 0; fi < 3; fi++) 
			{
				if (this.espacioVacio.columna !== co
					|| this.espacioVacio.fila !== fi)
				{
					var pieza = this.filas[fi][co];
					if (co !== pieza.columnaInicial
						|| fi !== pieza.filaInicial) 
					{
						return false;
					}
				}
			}
		}
		setTimeout(function(){alert("Ganaste!");}, 500);
		return true;
	}
};
$(document).ready(function () {
	juego.iniciar( $("#juego") );
});









