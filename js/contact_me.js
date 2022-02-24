initForm()

function initForm() {
  let formName = '#contactForm'
  let inputName = 'input#name'
  let inputEmail = 'input#email'
  let inputPhone = 'input#phone'
  let textareaMessage = 'textarea#message'
  let alertMessage = '#success'
  let alertSending = '<strong>Sending... </strong>'
  let alertSent = '<strong>Your message has been sent. </strong>'

  let alertErrorSending = function (senderName) {
    return (
      'Sorry ' +
      senderName +
      ', it seems that my mail server is not responding. Please try again later!'
    )
  }

  $(
    formName +
      ' ' +
      inputName +
      ' , ' +
      formName +
      ' ' +
      inputEmail +
      ', ' +
      formName +
      ' ' +
      textareaMessage
  ).jqBootstrapValidation({
    emailNotValidMessage: 'Not a valid email address',
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault() // prevent default submit behaviour
      // get values from FORM
      let person = new Object()
      person.name = $(inputName).val()
      person.email = $(inputEmail).val()
      person.phone = $(inputPhone).val()
      person.message = $(textareaMessage).val()
      let firstName = person.name // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ')
      }
      $this = $('#sendMessageButton')
      $this.prop('disabled', true) // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: 'https://formspree.io/xjvpkble',
        crossDomain: true,
        dataType: 'json',
        type: 'POST',
        data: person,
        cache: false,
        beforeSend: function () {
          $(alertMessage).html("<div class='alert alert-success'>")
          $(alertMessage + ' > .alert-success')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append('</button>')
          $(alertMessage + ' > .alert-success').append(alertSending)
          $(alertMessage + ' > .alert-success').append('</div>')
        },
        success: function () {
          // Success message
          $(alertMessage).html("<div class='alert alert-success'>")
          $(alertMessage + ' > .alert-success')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append('</button>')
          $(alertMessage + ' > .alert-success').append(alertSent)
          $(alertMessage + ' > .alert-success').append('</div>')
          //clear all fields
          $(formName).trigger('reset')
        },
        error: function () {
          // Fail message
          $(alertMessage).html("<div class='alert alert-danger'>")
          $(alertMessage + ' > .alert-danger')
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append('</button>')
          $(alertMessage + ' > .alert-danger').append(
            $('<strong>').text(alertErrorSending(firstName))
          )
          $(alertMessage + ' > .alert-danger').append('</div>')
          //clear all fields
          $(formName).trigger('reset')
        },
        complete: function () {
          setTimeout(function () {
            $this.prop('disabled', false) // Re-enable submit button when AJAX call is complete
          }, 1000)
        },
      })
    },
    filter: function () {
      return $(this).is(':visible')
    },
  })

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })
}
