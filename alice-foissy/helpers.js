/******************************************************
 * Hi there ! Thanks for inspecting my code
 * If you find something interesting *slash* disgusting
 * Please keep me informed at alice.foissy@gmail.com :)
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
    // dictionary["en"][titleTranslationKey] = project.en_title;

    let shortDescriptionKey = "PROJECT_" + project.id + "_SHORT_DESCRIPTION";
    dictionary["fr"][shortDescriptionKey] = project.fr_shortDescription;
    // dictionary["en"][shortDescriptionKey] = project.en_shortDescription;

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
        + '<img src="img/' + project.imageSrc + '" alt="Project\'s picture">'
        + '<div class="card-overlay" style="opacity:' + + project.opacity + '"></div>'
        + '</div>'
        + '<div class="card-content">'
        + '<span class="card-title" data-translate="' + titleTranslationKey + '"></span>'
        + '<p data-translate="' + shortDescriptionKey + '"></p>'
        // + tagsHTML
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
    // dictionary["en"][titleTranslationKey] = project.en_title;

    let shortDescriptionKey = "PROJECT_" + project.id + "_SHORT_DESCRIPTION";
    dictionary["fr"][shortDescriptionKey] = project.fr_shortDescription;
    // dictionary["en"][shortDescriptionKey] = project.en_shortDescription;

    let longDescriptionKey = "PROJECT_" + project.id + "_LONG_DESCRIPTION";
    dictionary["fr"][longDescriptionKey] = project.fr_longDescription;
    // dictionary["en"][longDescriptionKey] = project.en_longDescription;


    let taskBaseKey = "PROJECT_" + project.id + "_TASK_";
    let tasksHTML = "<ul class='tasks-list'>";

    project.tasks.forEach(function (task, index) {
        let taskKey = taskBaseKey + index;
        dictionary["fr"][taskKey] = task.fr;
        // dictionary["en"][taskKey] = task.en;
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

let defaultLang = 'fr';
let dictionary = {
    'fr': {
        "LANG_SWITCH": "FR > EN",
        "HEADER_HOME": "Accueil",
        "HEADER_PORTFOLIO": "Portfolio",
        "HEADER_RESUME": "Expériences",
        "HEADER_REFERENCES": "Références",
        "HEADER_CONTACT": "Contact",
        "INDEX_HTML_TITLE": "Alice-Anne Foissy",
        "INDEX_SKILLS": "Compétences",
        "INDEX_SKILLS_TEXT": "Vous souhaitez concevoir une application métier, un site grand public, l'interface d'une borne de paiement, je suis là pour garantir une expérience agréable à vos utilisateurs, tout en leur permettant d'accomplir leur tâche d'une manière simple et intuitive.",
        "INDEX_NEEDS_TITLE": "Analyse des besoins des utilisateurs",
        "INDEX_NEEDS_TEXT": "Vous voulez proposer des outils adaptés à votre public, pour cela je vais sur le terrain pour connaître les utilisateurs, leurs tâches et leur environnement.",
        "INDEX_CODESIGN_TITLE": "Co-création avec les utilisateurs",
        "INDEX_CODESIGN_TEXT": "Ateliers de brainstorming pour générer des idées de conception, définir l'architecture d'un site ou encore création de prototype papier. Les utilisateurs sont vos alliés !",
        "INDEX_TEAM_TITLE": "Travail en équipes multidisciplinaires",
        "INDEX_TEAM_TEXT": "Prendre en compte les contraintes de temps, de budget, les contraintes techniques… je travaille main dans la main avec tous les acteurs du projet pour proposer des solutions réalistes et non pas une licorne à paillettes <i class=\"far fa-laugh-beam\"></i>",
        "INDEX_PSY_TITLE": "Background en psychologie",
        "INDEX_PSY_TEXT": "Mon master en psychologie me permet de recueillir des informations en influençant au minimum les utilisateurs. Mes connaissances dans la prise de décision, l'attention ou encore le traitement de l'information soutiennent mes propositions d'interfaces.",
        "INDEX_MOCKUPS_TITLE": "Conception de maquettes",
        "INDEX_MOCKUPS_TEXT": "Prototype papier ou informatique pour traduire les besoins en interfaces. Elles me servent à tester les concepts avant leur développement pour vous éviter de perdre du temps et de l'argent, et ça c'est important pour vous :)",
        "INDEX_AGILITY_TITLE": "Agilité",
        "INDEX_AGILITY_TEXT": "L'essence même de l'UX Design ! Travailler en sprints courts pour confronter les concepts choisis avec la réalité du terrain, et vérifier qu'on ne fait pas fausse route.",
        "INDEX_ALL_PROJECTS": "Tous les projets",
        "INDEX_CUSTOMERS": "Clients",
        "PORTFOLIO_HTML_TITLE": "Portfolio - Alice-Anne Foissy",
        "PORTFOLIO_TITLE": "Portfolio",
        "PORTFOLIO_CUSTOMER": "Client",
        "PORTFOLIO_COMPANY": "Entreprise",
        "PORTFOLIO_CHALLENGES": "Défis",
        "PROJECTS_TAGS_UX-DESIGN": "UX Design",
        "PROJECTS_TAGS_PROJECT-MANAGEMENT": "Gestion de projet",
        "PROJECTS_TAGS_WEB-DEV": "Dev Web",
        "PROJECTS_TAGS_HAPPINESS": "Gestion du Bien-être",
        "PROJECTS_TAGS_BUSINESS": "Business Management",
        "PROJECTS_TAGS_MARKETING": "Web Marketing",
        "PROJECTS_TAGS_SPLUNK": "Splunk",
        "PROJECTS_TAGS_TRAINING": "Formation",
        "PROJECTS_TAGS_BIG-DATA": "Big Data",
        "PROJECTS_TAGS_NODEJS": "NodeJS",
        "PROJECTS_TAGS_ANGULARJS": "AngularJS",
        "PROJECTS_TAGS_ELASTIC": "Elastic Search",
        "PROJECTS_TAGS_PERSUASIVE": "Apps Persuasives",
        "RESUME_HTML_TITLE": "Expériences - Alice-Anne Foissy",
        "RESUME_TITLE": "Expériences",
        "RESUME_DOWNLOAD": "Mon CV (PDF)",
        "RESUME_NOW_TITLE": "Disponible",
        "RESUME_NOW_DATE": "Mai 2019 - Présent",
        "RESUME_NOW_TEXT": "A l'écoute d'opportunités. Contactez-moi pour discuter de vos projets.",
        "RESUME_CTV_TITLE": "CToutVert",
        "RESUME_CTV_DATE": "Mai 2018 - Déc. 2018",
        "RESUME_CTV_TEXT": "<ul><li>Amélioration de l’expérience utilisateur sur le logiciel d’administration des campings.</li><li>Refonte du logiciel de gestion des réservations par téléphone</li><li>Conception d’une appli interne pour le partage des photos de vacances dans les campings du groupe.</li></ul>",
        "RESUME_BERTIN_TITLE": "Bertin - HDG",
        "RESUME_BERTIN_DATE": "Sept. 2017 - Déc. 2017",
        "RESUME_BERTIN_TEXT": "<ul><li>Refonte d’un portail à destination des Ingénieurs Commerciaux.</li><li>Analyse de l’activité des techniciens Orange et sous-traitants en répartiteurs habités pour la refonte de leur application métier.</li></ul>",
        "RESUME_ORANGE_TITLE": "Orange",
        "RESUME_ORANGE_DATE": "Mars 2017 - Août 2017",
        "RESUME_ORANGE_TEXT": "<ul><li>Conception d’une grille d’évaluation de la charge de travail et d’un modèle de représentation graphique des ressources mobilisées pour réaliser l’activité.</li><li>Soutien sur divers projets du SI.</li></ul>",
        "RESUME_UTBM_TITLE": "UTBM",
        "RESUME_UTBM_DATE": "Mars 2017 - Août 2017",
        "RESUME_UTBM_TEXT": "Recommandations d’intégrations des technologies dans les futurs véhicules militaires pour le projet Scorpion de l’Armée de Terre.<br />UTBM : Université de Technologie Belfort-Montbéliard",
        "RESUME_STUDIES_TITLE": "Etudes",
        "RESUME_ERGO_TITLE": "Master Ergonomie",
        "RESUME_ERGO_DATE": "2016 - 2017",
        "RESUME_ERGO_TEXT": "Master 2 Pro Sociologie et Ergonomie des Technologies Numériques - Université Sophia-Antipolis, Nice",
        "RESUME_PSYCHO_TITLE": "Master Psycho",
        "RESUME_PSYCHO_DATE": "2014 - 2015",
        "RESUME_PSYCHO_TEXT": "Master 2 Pro Psychologie spécialité Ergonomie Cognitive et Ingénierie Linguistique Université Toulouse 2 Jean Jaurès. <br /><ul><li>Mémoire : Apports et limites d'une intervention en psychologie et ergonomie cognitive dans le cadre de l'intégration de technologies innovantes dans des véhicules militaires (sous la direction de M. André TRICOT).</li></ul>",
        "CONTACT_HTML_TITLE": "Contact - Alice-Anne Foissy",
        "CONTACT_TITLE": "Contactons-nous",
        "CONTACT_TEXT": "Un besoin ? Un projet ? Discutons-en !",
        "FOOTER_CONTACT": "Contactez-moi !",
        "CONTACT_NAME": "Nom / Prénom",
        "CONTACT_EMAIL": "Email",
        "CONTACT_MESSAGE": "Message",
        "CONTACT_SEND": "Envoyer",
        "FOOTER_LINKEDIN": "LinkedIn",
        "FOOTER_OPINION": "Votre avis m'intéresse",
        "FOOTER_OPINION_TEXT": "Si vous êtes ici, ce site devrait être conçu pour répondre à vos attentes. Satisfait ou pas, je serais heureux d'avoir votre retour, n'hésitez pas à m'envoyer <a class='orange-link' href='./contact.html?lang=fr' target='_blank'>un mail</a>.",
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

    if (setInURL) updateLangInURL(lang, true);

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
function updateURL(queryString, replaceHistory) {
    let lang = getQueryVariable().lang;

    let newQueryString = "?lang=" + lang + (queryString === "" ? "" : "&" + queryString)

    if (replaceHistory) window.history.replaceState('', '', newQueryString);
    else window.history.pushState('', '', newQueryString);
}

/**
 * Updates the lang in URL but taking into account any existing query
 */
function updateLangInURL(lang, replaceHistory) {
    let baseQuery = getQueryVariable();

    baseQuery.lang = lang;

    let newQueryString = createQueryStringFromObject(baseQuery);

    if (replaceHistory) window.history.replaceState('', '', newQueryString);
    else window.history.pushState('', '', newQueryString);
}

function createQueryStringFromObject(queryObject) {

    let newQueryString = "?";
    let queryKeys = Object.keys(queryObject);

    queryKeys.forEach(function (key, index) {
        let queryValue = queryObject[key];
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

    return newQueryString;
}

/***************
 * GENERAL TOOLS
 **************/

// Provides a JS object from all the query strings
function getQueryVariable() {

    // get query string from window
    var queryString = window.location.search.slice(1);

    return computeQueryVariable(queryString);
}

function computeQueryVariable(queryString) {
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

        let link = $(this).data("link");
        let linkBase = link.split('?')[0];
        let linkQuery = link.split('?')[1];
        if (linkQuery === undefined) linkQuery = "";
        let linkQueryObject = computeQueryVariable(linkQuery);

        // Transfers the existing lang
        linkQueryObject.lang = getQueryVariable().lang;

        window.location.href = linkBase + createQueryStringFromObject(linkQueryObject);
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