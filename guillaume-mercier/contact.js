/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/
"use strict";

let promises = [];

promises.push(new Promise(function (resolve, reject) {
    $.get("header.html", function (data) {
        manageHeader(data);
        resolve();
    });
}))

promises.push(new Promise(function (resolve, reject) {
    $.get("footer.html", function (data) {
        $("#footer-container").append(data);

        resolve();
    });
}));

promises.push(new Promise(function (resolve, reject) {
    $(document).ready(function () {

        emailjs.init("user_VSM3AeK2lk1H2vARunueI");

        $("#contact-form").submit(function (event) {
            event.preventDefault();

            M.toast({ html: "Envoi en cours ...", classes: "info-toastr" });

            emailjs.sendForm('gmail', 'template_ciR8ayRa', '#contact-form')
                .then(function (response) {
                    M.toast({ html: "Message envoyé !", classes: "success-toastr" });
                    // Then we clean the form
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    M.toast({ html: "Une erreur est survenue. Contactez-moi directement sur mon adresse mail.", classes: "error-toastr" });
                    console.log('FAILED...', error);
                });
        });

        resolve();
    });
}));

Promise.all(promises).then(initAndDisplayContent);

