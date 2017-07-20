$(document).ready(function() {
  var turnoPersona = false;
  var patron = [];
  var patronUsuario = [];
  var strictMode = false;
  var count = 0;
  var jugadasJug = 0; 
  var startApretado = false;
  $("#count").html("Count:" + count);

  function lightup(num1) {
    switch (num1) {
      case 0:
        $("#rojo").addClass("rojoactive");
        document.getElementById('rojoaudio').play();
        break;
      case 1:
        $("#verde").addClass("verdeactive");
        document.getElementById('verdeaudio').play();
        break;
      case 2:
        $("#azul").addClass("azulactive");
        document.getElementById('azulaudio').play();
        break;
      case 3:
        $("#amarillo").addClass("amarilloactive");
        document.getElementById('amarilloaudio').play();
        break;
    }
  }

  function apagar(num2) {
    switch (num2) {
      case 0:
        $("#rojo").removeClass();
        break;
      case 1:
        $("#verde").removeClass();
        break;
      case 2:
        $("#azul").removeClass();
        break;
      case 3:
        $("#amarillo").removeClass();
        break;
    }
  }

  function animate(secuencia) {
    var i = 0;
    var interval = setInterval(function() {
      if (i > 0) {
        apagar(secuencia[i - 1]);
      }
      lightup(secuencia[i]);
      i = i + 1;
      if (i > secuencia.length) {
        clearInterval(interval);
      }
    }, 1000);
  }

  function newRound() {
    count++;
    jugadasJug = 0;
    if (count == 21) {
        count = 0;
        patronUsuario.length = 0;
        patron.length = 0;
        newRound();
    } else {
      $("#count").html("Count:" + count);
      var num = Math.floor(Math.random() * 4);
      patron.push(num);
      setTimeout(animate(patron), 5000);
      turnoPersona = true;
    }
  }

  function volverACero() {
    count = 0;
    $("#count").html("Count:" + count);
    patronUsuario = [];
    patron = [];
    newRound();
  }

  /*function checkearRes(idElegido) {
    var patronLength = patron.length;
    
  }*/

  $("td").click(function() {
    if (turnoPersona === true) {
      var patLength = patron.length;
      var idTocado = this.id;
      if (jugadasJug < patLength) {
        if (idTocado == "rojo") {
          document.getElementById('rojoaudio').play();
          patronUsuario.push(0);
        }
        if (idTocado == "verde") {
          document.getElementById('verdeaudio').play();
          patronUsuario.push(1);
        }
        if (idTocado == "azul") {
          document.getElementById('azulaudio').play();
          patronUsuario.push(2);
        }
        if (idTocado == "amarillo") {
          document.getElementById('amarilloaudio').play();
          patronUsuario.push(3);
        }
        if (patronUsuario[jugadasJug] != patron[jugadasJug]) {
            console.log(patronUsuario + " and " + patron + "and" + jugadasJug);
            console.log(patronUsuario[jugadasJug]);
            console.log(patron[jugadasJug]);
            jugadasJug = 0;
            if (strictMode === true) {
              volverACero();
            } else {
              patronUsuario.length = 0;
              animate(patron);
              // turnoPersona = true;
            }
        } else {
            jugadasJug++;
        }       
      }
      if (jugadasJug >= patLength) {
        if (patronUsuario[jugadasJug-1] == patron[jugadasJug-1]) {
          console.log("entre con jugadasJug en " + jugadasJug);
          jugadasJug = 0;
          turnoPersona = false;
          patronUsuario.length = 0;
          newRound();
        }
      }
    }
  });

  $("#start").click(function() {
    console.log(startApretado);
    if (startApretado == false) {
      $("#start").html("<i class='fa fa-refresh'></i> Restart");
      startApretado = true;
      newRound();
    } else {
      // startApretado = false;
      volverACero();
    }
  });

  $("#strict").click(function() {
    if (strictMode === false) {
      strictMode = true;
      $(".activation").html("Yes");
    } else {
      strictMode = false;
      $(".activation").html("No");
    }
  });

});