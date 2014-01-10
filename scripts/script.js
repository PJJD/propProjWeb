$( document ).ready( function() {
  $( "#postcode" ).focusout(function () {
    haalAdresGegevensOp();
  });

  $( "#huisnr" ).focusout(function () {
    haalAdresGegevensOp();
  });

  function haalAdresGegevensOp() {
    if ($( "#postcode" ).val() && $( "#huisnr" ).val()) {
      var postcode = $( "#postcode" ).val();
      var huisnr = $( "#huisnr" ).val();
      $.getJSON('http://www.ntwpracticumnet.ou.nl:8080/registratie/PostcodeServlet', {"postcode":postcode, "huisnr":huisnr}).done( function (adres) {
        $( "#plaats" ).val(adres.plaats);
        $( "#straat" ).val(adres.straat);
      });
    }
  };


  $( "#formulier" ).submit(function( event ) {
    var ok = true;
    var regpostcode = /^[0-9]{4}[A-z]{2}$/;
    var regtelnr = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;
    var regemail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    function voegFoutToe(fout) {
      $( "#fouten" ).append("<p>"+fout+"</p>");
      $( "#fouten" ).css('visibility', 'visible');
    }

    $( "#fouten" ).empty();
    $( "#fouten" ).css('visibility', 'hidden');

    if(!$( "#naam" ).val()) {
      ok = false;
      voegFoutToe("Naam is verplicht");
    };
    if(!regpostcode.test($( "#postcode" ).val())) {
      ok = false;
      voegFoutToe("Postcode is verplicht en moet bestaan uit 4 cijfers gevolgd door 2 letters");
    };
    if(!$( "#huisnr" ).val()) {
      ok = false;
      voegFoutToe("Huisnr is verplicht");
    };
    if(!$( "#plaats" ).val()) {
      ok = false;
      voegFoutToe("Plaats is verplicht");
    };
    if(!$( "#straat" ).val()) {
      ok = false;
      voegFoutToe("Straatnaam is verplicht");
    };
    if($( "#telefoon" ).val()) {
      if (!regtelnr.test($( "#telefoon" ).val().trim())) {
        ok = false;
        voegFoutToe("Wanneer een telefoonnummer is ingevuld moet dit een geldig telefoonnummer zijn (geen spaties!)");
      };
    };
    if($( "#mobiel" ).val()) {
      if (!regtelnr.test($( "#mobiel" ).val().trim())) {
        ok = false;
        voegFoutToe("Wanneer een mobiel nummer is ingevuld, moet dit een geldig mobiel nummer zijn (geen spaties!)");
      };
    };
    if(!regemail.test($( "#email" ).val().trim())) {
      ok = false;
      voegFoutToe("E-mailadres is verplicht en moet van het juiste formaat zijn");
    };
    if(!$( "#gebruiker" ).val()) {
      ok = false;
      voegFoutToe("Gebruikersnaam is verplicht");
    };
    if(!$( "#wachtwoord" ).val()) {
      ok = false;
      voegFoutToe("Wachtwoord is verplicht");
    };
    
    if (!ok) {
      event.preventDefault();
      $( "#fouten" ).show();
    };

  });
});
