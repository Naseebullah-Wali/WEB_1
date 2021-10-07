$(function() {
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function validateX() {
    if ($('.x-radio').is(':checked')) {
      $('.xbox-label').removeClass('box-error');
      return true;
    } else {
      $('.xbox-label').addClass('box-error');
      return false;
    }
  }
  
  function validateY() {
    const Y_MIN = -5;
    const Y_MAX = 3;
  
    let yField = $('#y-textinput');
    let numY = yField.val().replace(',', '.');
  
    if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX)
    {
      yField.removeClass('text-error');
      return true;
    } else {
      yField.addClass('text-error');
      return false;
    }
  }
  function validate_R(){
    if ($(".r-checkbox").is(":checked")){
      if (($("#r-checkbox1").is(":checked") && $("#r-checkbox2").is(":checked"))||
          ($("#r-checkbox1").is(":checked") && $("#r-checkbox3").is(":checked"))||
          ($("#r-checkbox1").is(":checked") && $("#r-checkbox4").is(":checked"))||
          ($("#r-checkbox1").is(":checked") && $("#r-checkbox5").is(":checked"))||
          ($("#r-checkbox2").is(":checked") && $("#r-checkbox3").is(":checked"))||
          ($("#r-checkbox2").is(":checked") && $("#r-checkbox4").is(":checked"))||
          ($("#r-checkbox2").is(":checked") && $("#r-checkbox5").is(":checked"))||
          ($("#r-checkbox3").is(":checked") && $("#r-checkbox4").is(":checked"))||
          ($("#r-checkbox3").is(":checked") && $("#r-checkbox5").is(":checked"))||
          ($("#r-checkbox4").is(":checked") && $("#r-checkbox5").is(":checked")))
      {
        $(".r-box-label").addClass("box-error");
        return false;
      }
      $(".r-box-label").removeClass("box-error");
      return true;
    }
    else{
      $(".r-box-label").addClass("box-error");
      return false;
    }
  // function validateR() {
  //   if ($('.r-checkbox').is(':checked')) {
  //     $('.rbox-label').removeClass('box-error');
  //     return true;
  //   } else {
  //     $('.rbox-label').addClass('box-error');
  //     return false;
  //   }


  }
  
  function validateForm() {
    return validateX() & validateY() & validate_R();
  }

  $('#input-form').on('submit', function(event) {
    event.preventDefault();
    alert("ok");
    if (!validateForm()) return;
    alert("ok1");
    $.ajax({
      url: 'main.php',
      method: 'POST',
      data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
      dataType: "json",
      beforeSend: function() {
        $('.button').attr('disabled', 'disabled');
      },
      success: function(data) {
        $('.button').attr('disabled', false);
        alert(data);
        let entries = JSON.parse(data);
        for (let entry of entries) {
          newRow = '<tr>';
          newRow += '<td>' + entry.xval + '</td>';
          newRow += '<td>' + entry.yval + '</td>';
          newRow += '<td>' + entry.rval + '</td>';
          newRow += '<td>' + entry.curtime + '</td>';
          newRow += '<td>' + entry.exectime + '</td>';
          newRow += '<td>' + entry.hitres + '</td>';
          newRow += '</tr>';
          $('#result-table').append(newRow);
        }
        /*if (data.validate) {
          newRow = '<tr>';
          newRow += '<td>' + data.xval + '</td>';
          newRow += '<td>' + data.yval + '</td>';
          newRow += '<td>' + data.rval + '</td>';
          newRow += '<td>' + data.curtime + '</td>';
          newRow += '<td>' + data.exectime + '</td>';
          newRow += '<td>' + data.hitres + '</td>';
          $('#result-table').append(newRow);
        }*/
      }
    });
  });
});
