$(document).ready(function () {

    let options = {};

    $('.sidenav').sidenav(options);

    emailjs.init("user_VSM3AeK2lk1H2vARunueI");

    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.sendForm('gmail', 'template_ciR8ayRa', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
});