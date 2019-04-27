/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at gui.mercier1@gmail.com :)
 * Thanks !
 ******************************************************/
"use strict";

/****************
 * PROJECTS CARDS
 ****************/

function createProjectCard(project, displayOnSmallScreen) {

    // First we add the translations into the dictionary
    // And further we add the data attributes to translate it automatically
    let titleTranslationKey = "PROJECT_" + project.id + "_TITLE";
    dictionary["fr"][titleTranslationKey] = project.fr_title;
    dictionary["en"][titleTranslationKey] = project.en_title;

    let shortDescriptionKey = "PROJECT_" + project.id + "_SHORT_DESCRIPTION";
    dictionary["fr"][shortDescriptionKey] = project.fr_shortDescription;
    dictionary["en"][shortDescriptionKey] = project.en_shortDescription;

    let tagsHTML = '';

    if (project.tags != undefined) {
        tagsHTML = '<ul class="tags">';
        project.tags.forEach(function (tag) {
            tagsHTML += '<li><a href="#" class="tag">#<span data-translate="PROJECTS_TAGS_' + tag + '"><span></a></li>';
        });

        tagsHTML += "</ul>"
    }

    let displayClass = displayOnSmallScreen ? "" : "hide-on-small-only";

    let htmlContent =
        '<div class="col s12 m4 project-card-col ' + displayClass + '">'
        + '<div class="card project-card hoverable" data-needpopup-show="#' + project.id + '">'
        + '<div class="card-image">'
        + '<img src="img/' + project.imageSrc + '">'
        + '<div class="card-overlay" style="opacity:' + + project.opacity + '"></div>'
        + '</div>'
        + '<div class="card-content">'
        + '<span class="card-title" data-translate="' + titleTranslationKey + '"></span>'
        + '<p data-translate="' + shortDescriptionKey + '"></p>'
        + tagsHTML
        + '</div>'
        + '</div>'
        + '</div>';

    return htmlContent;
}

function createProjectPopup(project) {

    // First we add the translations into the dictionary
    // And further we add the data attributes to translate it automatically
    let titleTranslationKey = "PROJECT_" + project.id + "_TITLE";
    dictionary["fr"][titleTranslationKey] = project.fr_title;
    dictionary["en"][titleTranslationKey] = project.en_title;

    let shortDescriptionKey = "PROJECT_" + project.id + "_SHORT_DESCRIPTION";
    dictionary["fr"][shortDescriptionKey] = project.fr_shortDescription;
    dictionary["en"][shortDescriptionKey] = project.en_shortDescription;

    let longDescriptionKey = "PROJECT_" + project.id + "_LONG_DESCRIPTION";
    dictionary["fr"][longDescriptionKey] = project.fr_longDescription;
    dictionary["en"][longDescriptionKey] = project.en_longDescription;


    let taskBaseKey = "PROJECT_" + project.id + "_TASK_";
    let tasksHTML = "<ul class='tasks-list'>";

    project.tasks.forEach(function (task, index) {
        let taskKey = taskBaseKey + index;
        dictionary["fr"][taskKey] = task.fr;
        dictionary["en"][taskKey] = task.en;
        tasksHTML += "<li data-translate='" + taskKey + "'> " + task + "</li>";
    });

    tasksHTML += "</ul>";

    let htmlContent = '<div id="' + project.id + '" class="needpopup">'
        + '<div class="row popup-header">'
        + '<div class="col s12">'
        + '<h5 data-translate="' + titleTranslationKey + '"></h5>'
        + '</div>'
        + '</div>'
        // + '<div class="popup-img-container hide-on-small-only">'
        // + '<img src="img/' + project.imageSrc + '" />'
        // + '</div>'
        + '<div class="row">'
        + '<div class="col s12" data-translate="' + shortDescriptionKey + '"></div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s12" data-translate="' + longDescriptionKey + '"></div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s6">'
        + '<span class="popup-title"><span data-translate="PORTFOLIO_CUSTOMER"></span> : </span>' + project.customer
        + '</div>'
        + '<div class="col s6">'
        + '<span class="popup-title"><span data-translate="PORTFOLIO_COMPANY"></span> : </span>' + project.company
        + '</div>'
        + '</div>'
        + '<div class="row">'
        + '<div class="col s12 popup-title"><span data-translate="PORTFOLIO_CHALLENGES"></span> : </div>'
        + '<div class="col s12">' + tasksHTML + '</div>'
        + '</div>'
        + '</div>';

    return htmlContent;
}

/**********************
 * HEADER MANAGEMENT
 *********************/

function manageHeader(data) {

    return new Promise(function (resolve, reject) {

        $("#header-container").replaceWith(data);

        var options = {};
        options.edge = "right";
        $('.sidenav').sidenav(options);

        // We bind the lang switch button to the lib function
        $(".lang-switch-button").click(function (event) {
            event.preventDefault();

            let newLanguage = translator.lang == "en" ? "fr" : "en";

            translator.setLanguageRun(newLanguage);

            // We also update the URL in case of refresh
            updateLangInURL(newLanguage);
        });

        setTimeout(resolve);
    });
}

/**********************
 * TRANSLATION TOOLS
 *********************/

let defaultLang = 'en';
let dictionary = {
    'en': {
        "LANG_SWITCH": "EN > FR",
        "HEADER_HOME": "Home",
        "HEADER_PORTFOLIO": "Portfolio",
        "HEADER_RESUME": "Resume",
        "HEADER_CONTACT": "Contact",
        "INDEX_SKILLS": "Skills",
        "INDEX_SKILLS_TEXT": "With more than 5 years of experience in the digital field, I can assist your project, customers and users in many ways : ",
        "INDEX_DEVELOPER_TITLE": "Web Developer",
        "INDEX_DEVELOPER_TEXT": "From design to development, let's work together to build a website that reflects your identity.",
        "INDEX_DESIGNER_TITLE": "UX Designer",
        "INDEX_DESIGNER_TEXT": "With your users and my creativity, we will build useful, usable and desirable softwares.<br /><br />To learn more about UX Design : <a href='https://theblog.adobe.com/what-does-a-ux-designer-actually-do/' target='_blank'>click here.</a>",
        "INDEX_LEAD_TITLE": "Project leader",
        "INDEX_LEAD_TEXT": "I can manage the costs, deadlines and quality of your projects while communicating with our teams and stakeholders.",
        "INDEX_PRODUCT_TITLE": "Product Owner",
        "INDEX_PRODUCT_TEXT": "Let's build together your product's strategy, and I take care of its realization towards the customers and the development team.",
        "INDEX_SPLUNK_TITLE": "Splunk Developer",
        "INDEX_SPLUNK_TEXT": "Let's push the limits of Splunk to create dynamic dashboards which present useful and usable data while following the 'data visualization' precepts.",
        "INDEX_TEAM_TITLE": "Team Booster",
        "INDEX_TEAM_TEXT": "Work should not be laborious ! Let boost together your teams' motivation to create an environment within we will all be able to reveal our full potential.",
        "INDEX_ALL_PROJECTS": "All projects",
        "INDEX_CUSTOMERS": "Customers",
        "PORTFOLIO_CUSTOMER": "Customer",
        "PORTFOLIO_COMPANY": "Company",
        "PORTFOLIO_CHALLENGES": "Challenges",
        "PROJECTS_TAGS_UX_DESIGN": "UX Design",
        "PROJECTS_TAGS_PROJECT_MANAGEMENT": "Project Management",
        "PROJECTS_TAGS_WEB_DEV": "Web Dev",
        "PROJECTS_TAGS_HAPPINESS": "Happiness Management",
        "PROJECTS_TAGS_BUSINESS": "Business Management",
        "PROJECTS_TAGS_MARKETING": "Web Marketing",
        "PROJECTS_TAGS_SPLUNK": "Splunk",
        "PROJECTS_TAGS_TRAINING": "Training",
        "PROJECTS_TAGS_BIG_DATA": "Big Data",
        "PROJECTS_TAGS_NODEJS": "NodeJS",
        "PROJECTS_TAGS_ANGULARJS": "AngularJS",
        "PROJECTS_TAGS_ELASTIC": "ElasticSearch",
        "PROJECTS_TAGS_PERSUASIVE": "Persuasive Apps",
        "RESUME_TITLE": "Experiences",
        "RESUME_DOWNLOAD": "My resume (PDF)",
        "RESUME_CONTACT_TITLE": "You are here",
        "RESUME_CONTACT_DATE": "Jan. 2019 - Now",
        "RESUME_CONTACT_TEXT": "<a href='./contact' target='_blank' class='custom-link' data-link='./contact.html'>Contact me</a> for any of your projects !",
        "RESUME_INOVANS_TITLE": "Inovans",
        "RESUME_INOVANS_DATE": "Sept. 2017 - Jan. 2019",
        "RESUME_INOVANS_TEXT": "<ul><li>Design and development of Splunk Dashboards for Airbus</li><li>Writing and presentation of a Splunk training</li><li>Happiness Management</li><li>UX Design and Project Management for many internal projects</li></ul>",
        "RESUME_ATOFFICE_TITLE": "\"Au Bureau\"",
        "RESUME_ATOFFICE_DATE": "Aug. 2018 - Sept. 2018",
        "RESUME_ATOFFICE_TEXT": "Head waiter in a bar-restaurant",
        "RESUME_TRIP_TITLE": "Asian trip",
        "RESUME_TRIP_DATE": "Dec. 2016 - July 2017",
        "RESUME_TRIP_TEXT": "Backpacking in South-East Asia and in La Reunion island to discover the world as well than myself :)",
        "RESUME_SYCO_TITLE": "Sycomore T.",
        "RESUME_SYCO_DATE": "Oct. 2015 - Nov. 2016",
        "RESUME_SYCO_TEXT": "UX Design and Web dev : <ul><li>Web app to analyze and visualize scientific data</li><li>Web app to dynamically catalog a company's full fileset</li><li>Web app to manage laboratories' samples</li></ul>",
        "RESUME_CAPGE_TITLE": "Capgemini",
        "RESUME_CAPGE_DATE": "June 2015 - Oct. 2015",
        "RESUME_CAPGE_TEXT": "<ul><li>Design of a tool for international market purchasers to input data and negociate prices</li><li>Design of a web app to manage and visualize the French Land Army's doctrines</li><li>Design and development of a web interface to gather and visualize data incoming from a spatial robot</li></ul>",
        "RESUME_FREELANCE_TITLE": "Freelance",
        "RESUME_FREELANCE_DATE": "Nov. 2014 - June 2015",
        "RESUME_FREELANCE_TEXT": "UX Design and Web dev for Sycomore Technologies : <ul><li>Web app to analyze and visualize scientific data</li><li>Web app to dynamically catalog a company's full fileset</li><li>Web app to manage laboratories' samples</li></ul>",
        "RESUME_EFFICIENCIA_TITLE": "Efficiencia",
        "RESUME_EFFICIENCIA_DATE": "Sept. 2013 - Sept. 2014",
        "RESUME_EFFICIENCIA_TEXT": "<ul><li>Design of a Serious Game for tablets to help people to improve their home energy consumption</li><li>Design of a tool to input buildings' thermic data</li><li>Design and development of a web interface to visualize the buildings' consumption forecasting</li></ul>",
        "RESUME_INTUIFACE_TITLE": "IntuiFace",
        "RESUME_INTUIFACE_DATE": "May 2013 - Aug. 2013",
        "RESUME_INTUIFACE_TEXT": "Development of multi-touch widgets and implementation of an HTML5 physic engine",
        "RESUME_UPSILON_TITLE": "Upsilon",
        "RESUME_UPSILON_DATE": "Nov. 2012 - Feb. 2013",
        "RESUME_UPSILON_TEXT": "Web development of an image editor and an inline text editor",
        "RESUME_MILLEGEN_TITLE": "Millegen",
        "RESUME_MILLEGEN_DATE": "July 2012 - Aug. 2012",
        "RESUME_MILLEGEN_TEXT": "Development of a tool to represent interactions and links between a bioinformatics applications' platform",
        "RESUME_STUDIES_TITLE": "Studies",
        "RESUME_IHMMASTER_TITLE": "HCI Master",
        "RESUME_IHMMASTER_DATE": "2011 - 2013",
        "RESUME_IHMMASTER_TEXT": "ENAC / Paul Sabatier, Toulouse",
        "RESUME_ITLICENSE_TITLE": "IT Bachelor",
        "RESUME_ITLICENSE_DATE": "2010 - 2011",
        "RESUME_ITLICENSE_TEXT": "Paul Sabatier, Toulouse",
        "RESUME_MATHSMASTER_TITLE": "Maths Master",
        "RESUME_MATHSMASTER_DATE": "2005 - 2010",
        "RESUME_MATHSMASTER_TEXT": "ENAC / Paul Sabatier, Toulouse",
        "CONTACT_TITLE": "Get in touch !",
        "CONTACT_TEXT": "Any need ? Any project ? Let's talk about it !",
        "CONTACT_NAME": "First name / Last name",
        "CONTACT_EMAIL": "Email",
        "CONTACT_MESSAGE": "Message",
        "CONTACT_SEND": "Send",
        "FOOTER_CONTACT": "Contact me !",
        "FOOTER_LINKEDIN": "Does net work ?",
        "FOOTER_TWITTER": "Free time killer",
        "FOOTER_OPINION": "Your opinion matters",
        "FOOTER_OPINION_TEXT": "Since you are here, this website should be made to fit your expectations. Satisfied or not ? I would be happy to get your feedbacks, so don't hesitate to send me <a class='orange-link' href='./contact.html' target='_blank'>a mail</a>.",
    },
    'fr': {
        "LANG_SWITCH": "FR > EN",
        "HEADER_HOME": "Accueil",
        "HEADER_PORTFOLIO": "Portfolio",
        "HEADER_RESUME": "Curriculum",
        "HEADER_CONTACT": "Contact",
        "INDEX_SKILLS": "Compétences",
        "INDEX_SKILLS_TEXT": "Avec plus de 5 ans d'expériences dans l'univers du digital, je peux assister vos projets, vos clients et vos utilisateurs de plusieurs manières :",
        "INDEX_DEVELOPER_TITLE": "Développeur Web",
        "INDEX_DEVELOPER_TEXT": "De la conception à son développement, travaillons ensemble pour créer un site web à votre image.",
        "INDEX_DESIGNER_TITLE": "UX Designer",
        "INDEX_DESIGNER_TEXT": "Je mets ma créativité à l'écoute de vos utilisateurs pour concevoir des logiciels utiles, utilisables et attractifs.<br /><br />Pour en savoir plus sur l'UX Design : <a href='https://theblog.adobe.com/what-does-a-ux-designer-actually-do/' target='_blank'>cliquez ici.</a>",
        "INDEX_LEAD_TITLE": "Chef de projet",
        "INDEX_LEAD_TEXT": "Je gère pour vous les coûts, les délais et la qualité de votre projet tout en assurant la communication interne et le lien entre les différents acteurs.",
        "INDEX_PRODUCT_TITLE": "Product Owner",
        "INDEX_PRODUCT_TEXT": "Elaborons ensemble une stratégie autour de votre produit, et je veille à sa réalisation auprès du client et des équipes de développement.",
        "INDEX_SPLUNK_TITLE": "Développeur Splunk",
        "INDEX_SPLUNK_TEXT": "Dépassons les limites de Splunk pour créer des dashboards dynamiques qui présentent des données utiles et utilisables en suivant les préceptes de la \"data visualization\".",
        "INDEX_TEAM_TITLE": "Booster d'équipe",
        "INDEX_TEAM_TEXT": "Le travail n'a pas à être pénible ! Renforçons ensemble la motivation de vos équipes pour créer un environnement dans lequel nous pourrons tous révéler notre plein potentiel.",
        "INDEX_ALL_PROJECTS": "Tous les projets",
        "INDEX_CUSTOMERS": "Clients",
        "PORTFOLIO_CUSTOMER": "Client",
        "PORTFOLIO_COMPANY": "Entreprise",
        "PORTFOLIO_CHALLENGES": "Défis",
        "PROJECTS_TAGS_UX_DESIGN": "UX Design",
        "PROJECTS_TAGS_PROJECT_MANAGEMENT": "Gestion de projet",
        "PROJECTS_TAGS_WEB_DEV": "Dev Web",
        "PROJECTS_TAGS_HAPPINESS": "Gestion du Bien-être",
        "PROJECTS_TAGS_BUSINESS": "Business Management",
        "PROJECTS_TAGS_MARKETING": "Web Marketing",
        "PROJECTS_TAGS_SPLUNK": "Splunk",
        "PROJECTS_TAGS_TRAINING": "Formation",
        "PROJECTS_TAGS_BIG_DATA": "Big Data",
        "PROJECTS_TAGS_NODEJS": "NodeJS",
        "PROJECTS_TAGS_ANGULARJS": "AngularJS",
        "PROJECTS_TAGS_ELASTIC": "Elastic Search",
        "PROJECTS_TAGS_PERSUASIVE": "Apps Persuasives",
        "RESUME_TITLE": "Expériences",
        "RESUME_DOWNLOAD": "Mon CV (PDF)",
        "RESUME_CONTACT_TITLE": "Vous êtes ici",
        "RESUME_CONTACT_DATE": "Jan. 2019 - Présent",
        "RESUME_CONTACT_TEXT": "<a href='./contact' target='_blank' class='custom-link' data-link='./contact.html'>Contactez-moi</a> pour discuter de vos projets !",
        "RESUME_INOVANS_TITLE": "Inovans",
        "RESUME_INOVANS_DATE": "Sept. 2017 - Jan. 2019",
        "RESUME_INOVANS_TEXT": "<ul><li>UX design et développement de dashboards Splunk pour Airbus</li><li>Écriture et présentation d'une formation Splunk</li><li>Gestion du bien-être au travail</li><li>UX et gestion de projets internes pour Inovans</li></ul>",
        "RESUME_ATOFFICE_TITLE": "\"Au Bureau\"",
        "RESUME_ATOFFICE_DATE": "Août. 2018 - Sept. 2018",
        "RESUME_ATOFFICE_TEXT": "Chef de rang et serveur dans un bar-restaurant",
        "RESUME_TRIP_TITLE": "Voyage",
        "RESUME_TRIP_DATE": "Dec. 2016 - Juillet. 2017",
        "RESUME_TRIP_TEXT": "Voyage en sac-à-dos en Asie du Sud-Est et à La Réunion pour découvrir et se découvrir :)",
        "RESUME_SYCO_TITLE": "Sycomore T.",
        "RESUME_SYCO_DATE": "Oct. 2015 - Nov. 2016",
        "RESUME_SYCO_TEXT": "UX Design et Web dev : <ul><li>Appli d’analyse et de visualisation de données scientifiques</li><li>Appli de catalogage dynamique des fichiers d’une entreprise</li><li>Appli de gestion des échantillons d’un laboratoire</li></ul>",
        "RESUME_CAPGE_TITLE": "Capgemini",
        "RESUME_CAPGE_DATE": "Juin 2015 - Oct. 2015",
        "RESUME_CAPGE_TEXT": "<ul><li>Conception d'un outil de saisie d'informations et de négociation pour les marchés internationaux.</li><li>Conception d'une application de gestion et de consultation des doctrines de l'Armée</li><li>Conception et dev d'une appli de communication avec un robot spatial</li></ul>",
        "RESUME_FREELANCE_TITLE": "Freelance",
        "RESUME_FREELANCE_DATE": "Nov. 2014 - Juin 2015",
        "RESUME_FREELANCE_TEXT": "UX Design et Web dev pour Sycomore Tech. : <ul><li>Appli d’analyse et de visualisation de données scientifiques</li><li>Appli de catalogage dynamique des fichiers d’une entreprise</li><li>Appli de gestion des échantillons d’un laboratoire</li></ul>",
        "RESUME_EFFICIENCIA_TITLE": "Efficiencia",
        "RESUME_EFFICIENCIA_DATE": "Sept. 2013 - Sept. 2014",
        "RESUME_EFFICIENCIA_TEXT": "<ul><li>Conception d'un serious game pour mieux gérer la consommation énergétique des  bâtiments.</li><li>Conception d'un logiciel de saisie thermique</li><li>Conception et développement d'un outil Web pour visualiser les prévisions de consommation énergétique des bâtiments.</li></ul>",
        "RESUME_INTUIFACE_TITLE": "IntuiFace",
        "RESUME_INTUIFACE_DATE": "Mai 2013 - Août 2013",
        "RESUME_INTUIFACE_TEXT": "Développement de composants graphiques multi-touch et implémentation d'un moteur physique en HTML5",
        "RESUME_UPSILON_TITLE": "Upsilon",
        "RESUME_UPSILON_DATE": "Nov. 2012 - Fév. 2013",
        "RESUME_UPSILON_TEXT": "Développement d'un éditeur d'images Web et d'un éditeur de texte in-line",
        "RESUME_MILLEGEN_TITLE": "Millegen",
        "RESUME_MILLEGEN_DATE": "Juil. 2012 - Août 2012",
        "RESUME_MILLEGEN_TEXT": "Développement d'un outil représentant les interactions entre les fichiers d'une plate-forme d'applications de bio-informatique",
        "RESUME_STUDIES_TITLE": "Etudes",
        "RESUME_IHMMASTER_TITLE": "Master IHM",
        "RESUME_IHMMASTER_DATE": "2011 - 2013",
        "RESUME_IHMMASTER_TEXT": "ENAC / Paul Sabatier, Toulouse",
        "RESUME_ITLICENSE_TITLE": "Licence Informatique",
        "RESUME_ITLICENSE_DATE": "2010 - 2011",
        "RESUME_ITLICENSE_TEXT": "Paul Sabatier, Toulouse",
        "RESUME_MATHSMASTER_TITLE": "Maîtrise de Maths.",
        "RESUME_MATHSMASTER_DATE": "2005 - 2010",
        "RESUME_MATHSMASTER_TEXT": "ENAC / Paul Sabatier, Toulouse",
        "CONTACT_TITLE": "Contactons-nous",
        "CONTACT_TEXT": "Un besoin ? Un projet ? Discutons-en !",
        "FOOTER_CONTACT": "Contactez-moi !",
        "CONTACT_NAME": "Nom / Prénom",
        "CONTACT_EMAIL": "Email",
        "CONTACT_MESSAGE": "Message",
        "CONTACT_SEND": "Envoyer",
        "FOOTER_LINKEDIN": "Panne de réseau ?",
        "FOOTER_TWITTER": "Reliquat du temps libre",
        "FOOTER_OPINION": "Votre avis m'intéresse",
        "FOOTER_OPINION_TEXT": "Si vous êtes ici, ce site devrait être conçu pour répondre à vos attentes. Satisfait ou pas, je serais heureux d'avoir votre retour, n'hésitez pas à m'envoyer <a class='orange-link' href='./contact.html' target='_blank'>un mail</a>.",
    },
    //TODO TO EXPLAIN CONCEPTS TO PEOPLE WHO ARE NOT FROM THIS FIELD
    'noob': {

    }
}

let translator;
function initTranslator() {
    // First we set the default language - if not set in the URL
    let baseQuery = getQueryVariable();

    let lang = baseQuery.lang;

    let setInURL = false;
    if (lang == undefined) {
        lang = defaultLang;
        setInURL = true;
    } else if (dictionary[lang] == undefined) {
        console.error("Unkown language, got : " + lang + ".");
        lang = defaultLang;
        setInUrl = true;
    }

    if (setInURL) updateLangInURL(lang);

    translator = Translator({
        language: lang,
        dictionary: dictionary,
        // autostart: true,
        htmlfriendly: true
    });

    translator.setLanguageRun(lang);
}

function triggerTranslator() {
    translator.setLanguageRun(translator.lang);
}

/**
 * Updates a new query string in URL but taking into account the lang query
 */
function updateURL(queryString) {
    let lang = getQueryVariable().lang;

    let newQueryString = "?lang=" + lang + (queryString === "" ? "" : "&" + queryString)

    window.history.pushState('', '', newQueryString);
}

/**
 * Updates the lang in URL but taking into account any existing query
 */
function updateLangInURL(lang) {
    let baseQuery = getQueryVariable();

    baseQuery.lang = lang;

    let newQueryString = "?";
    let queryKeys = Object.keys(baseQuery);

    queryKeys.forEach(function (key, index) {
        let queryValue = baseQuery[key];
        if (Array.isArray(queryValue)) {
            queryValue.forEach(function (value, valueIndex) {
                newQueryString += key + "=" + value;
                if (valueIndex < queryValue.length - 1) newQueryString += "&";
            });
        }
        else {
            newQueryString += key + "=" + queryValue;
        }

        if (index < queryKeys.length - 1) newQueryString += "&";
    });

    window.history.pushState('', '', newQueryString);
}

/***************
 * GENERAL TOOLS
 **************/

// Provides a JS object from all the query strings
function getQueryVariable() {

    // get query string from window
    var queryString = window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            // paramName = paramName.toLowerCase();
            // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

/**
 * Redirects to an internal page while keeping the query lang
 * The a link must provide a custom-link class and a data-link attribute 
 */
function bindLinks() {
    $(".custom-link").click(function (e) {
        e.preventDefault();

        let lang = getQueryVariable().lang;
        let link = $(this).data("link");

        window.location.href = link + "?lang=" + lang;
    });
}

function hideSpinner() {
    $(".page-content").show();
    setTimeout(function () {
        $(".spinner").fadeOut(600);
    }, 500);
}

function initAndDisplayContent() {
    // Helper functions
    initTranslator();
    bindLinks();
    hideSpinner();
}