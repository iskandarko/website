$(function() {
  handleFormIn("en");
  handleFormIn("ru");
});


function handleFormIn(formLang) {
  let formName = "#contactForm_" + formLang;
  let inputName = "input#name_" + formLang;
  let inputEmail = "input#email_" + formLang;
  let inputPhone = "input#phone_" + formLang;
  let textareaMessage = "textarea#message_" + formLang;
  let alertMessage = "#success_" + formLang;
  let alertSending = formLang === "en" ? "<strong>Sending... </strong>" : "<strong>Отправляется... </strong>";
  let alertSent = formLang === "en" ? "<strong>Your message has been sent. </strong>" : "<strong>Ваше сообщение отправлено. </strong>";

  let alertErrorSending = function(senderName) {
    if (formLang === "en") {
      return "Sorry " + senderName + ", it seems that my mail server is not responding. Please try again later!"
    } else {
      return "Простите, " + senderName + ", мой почтовый сервер сейчас недоступен. Пожалуйста, попробуйте еще раз позже!"
    }
  }

  $(formName + " " + inputName  + " , " + formName + " " + inputEmail + ", " + formName + " " + textareaMessage).jqBootstrapValidation({
    emailNotValidMessage: formLang === "en" ? "Not a valid email address" : "Недействительный адрес email",
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      let person = new Object();
      person.name = $(inputName).val();
      person.email = $(inputEmail).val();
      person.phone = $(inputPhone).val();
      person.message = $(textareaMessage).val();
      let firstName = person.name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton_" + formLang);
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://formspree.io/xjvpkble",
        crossDomain: true,
        dataType: 'json',
        type: "POST",
        data: person,
        cache: false,
        beforeSend: function() {
          $(alertMessage).html("<div class='alert alert-success'>");
          $(alertMessage + ' > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $(alertMessage + ' > .alert-success')
            .append(alertSending);
          $(alertMessage + ' > .alert-success')
            .append('</div>');
        },
        success: function() {
          // Success message
          $(alertMessage).html("<div class='alert alert-success'>");
          $(alertMessage + ' > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $(alertMessage + ' > .alert-success')
            .append(alertSent);
          $(alertMessage + ' > .alert-success')
            .append('</div>');
          //clear all fields
          $(formName).trigger("reset");
        },
        error: function() {
          // Fail message
          $(alertMessage).html("<div class='alert alert-danger'>");
          $(alertMessage + ' > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $(alertMessage + ' > .alert-danger')
            .append($("<strong>").text(alertErrorSending(firstName)));
          $(alertMessage + ' > .alert-danger').append('</div>');
          //clear all fields
          $(formName).trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
}


/*When clicking on Full hide fail/success boxes */
// $("input#name").focus(function() {
//   $("#success").html('');
// });

