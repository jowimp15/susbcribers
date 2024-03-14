"use strict";
var _a, _b, _c;
//////////////////////////////////////////////////////////////////////// Extraction
let $form = document.querySelector(".form");
let cardsCOntainer = document.querySelector(".container-cards");
let listStudents = document.querySelector(".students-container");
let listStudentsBtnClose = document.querySelector(".btn-close-info-teacher");
// form teacher
let $teacherName = document.querySelector(".title-teacher");
let $infoTeacher = document.querySelector(".info-teacher");
let $listStudents = document.querySelector(".list-students");
let $imgTeacherListStudent = document.querySelector(".img-info-teacher");
let $asideContainerStudent = document.querySelector(".students-aside");
let $infoTeacherSubject = document.querySelector(".teacher-subject");
let editContainer = document.querySelector(".edit-delete-container");
let $studentElementAsideContainer = document.querySelector(".students-container-aside");
let iconMenu = document.getElementById("icon-menu");
let iconClose = document.getElementById("icon-close");
// span errors-students
/* texmpaltes */
let $templateTeacher = (_a = document.getElementById("template-form-teachers")) === null || _a === void 0 ? void 0 : _a.content;
let $templateStudents = (_b = document.getElementById("template-form-studens")) === null || _b === void 0 ? void 0 : _b.content;
let $templateCard = (_c = document.getElementById("template-cards")) === null || _c === void 0 ? void 0 : _c.content;
//////////////////////////////////////////////////////////////////////// Warehouse
let teachers = [];
let students = [];
// send the position of the element to edit
let positionElementEdit;
// for change student or teacher form
let isStudentsForm = false;
// isDeleteActive cuanndo este activo es que unas de sus opciones este activa se remplazara el icono de menu por una X, cuado le de a la x desactivara la opcion y volvera el icono de menu, es como un btn de cancelar
let isDeleteActive = false;
/* forms history number and descripions*/
let addImgTeacher;
let fragmentCard;
let $fragmentList;
let beforeDescription = "";
let beforeDescriptionTeacher = "";
let lastAge = "";
let lastAgeStudents = "";
let imgTeacher = "assets/images/perfil.jpg";
// span error teacher
let $errorNameT;
let $errorLastNameT;
let $errorageT;
let $errorSubjectT;
let $errorDescriptionSubjectT;
let $errorDescriptionTeacherT;
// span erroor student
let $errorNameS;
let $errorLastNameS;
let $errorageS;
let $errorSubjectS;
var ConfirValue;
(function (ConfirValue) {
    ConfirValue[ConfirValue["theStudentExist"] = 0] = "theStudentExist";
    ConfirValue[ConfirValue["otherSubject"] = 1] = "otherSubject";
    ConfirValue[ConfirValue["notExist"] = 2] = "notExist";
})(ConfirValue || (ConfirValue = {}));
//////////////////////////////////////////////////////////////////////// First Run
if (teachers.length !== 0) {
    let $div = document.createElement("DIV");
    $div.classList.add("change");
    $div.textContent = "inscrivir Estudiantes";
    $form === null || $form === void 0 ? void 0 : $form.append($div);
}
let $h2 = document.createElement("H2");
$h2.classList.add("title-form");
$h2.textContent = "Formulario";
$form === null || $form === void 0 ? void 0 : $form.append($h2);
// add the cards
fragmentCard = document.createDocumentFragment();
iterateCards();
let body = document.querySelector("body");
if (listStudents && body) {
    listStudents.addEventListener("animationstart", () => (body.style.overflowY = "hidden"));
    listStudents === null || listStudents === void 0 ? void 0 : listStudents.addEventListener("animationend", () => (body.style.overflowY = "auto"));
}
//////////////////////////////////////////////////////////////////////// Functions
//function of template  for texcontent
function validTemplate(template, element, text, attribute, addAttribute) {
    let E = template.querySelector(`.${element}`);
    if (E && attribute !== true) {
        E.textContent = text;
    }
    if (attribute === true && addAttribute) {
        E.setAttribute(addAttribute, text);
    }
}
// function
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}
// if the student exist or exist and the subject is not the same or is not exist
function checkStudentInTheArray(data) {
    let resurt = ConfirValue.notExist;
    for (const el of students) {
        let nameStudent = false;
        let lastNameStudent = false;
        if (normalizeText(el.name) === normalizeText(data.name))
            nameStudent = true;
        if (normalizeText(el.lastName) === normalizeText(data.lastName))
            lastNameStudent = true;
        if (nameStudent && lastNameStudent) {
            if (($form === null || $form === void 0 ? void 0 : $form.dataset.option) === "edit")
                if (students[positionElementEdit].name === el.name &&
                    students[positionElementEdit].lastName === el.lastName)
                    continue;
            if (($form === null || $form === void 0 ? void 0 : $form.dataset.option) !== "edit") {
                let isSubjectExist = el.subject.some((element) => normalizeText(element) === normalizeText(data.subject[0]));
                if (isSubjectExist)
                    return ConfirValue.theStudentExist;
                else
                    return ConfirValue.otherSubject;
            }
            else {
                return ConfirValue.theStudentExist;
            }
        }
    }
    return resurt;
}
function HTMLCollectionToArray(father) {
    if (father === null || father === void 0 ? void 0 : father.children)
        return Array.from(father.children);
}
function createStudentAcrodion() {
    editContainer.classList.remove("none");
    editContainer.classList.add("edit-delete-container-none");
    let fragment = document.createDocumentFragment();
    $asideContainerStudent === null || $asideContainerStudent === void 0 ? void 0 : $asideContainerStudent.classList.remove("none");
    $asideContainerStudent === null || $asideContainerStudent === void 0 ? void 0 : $asideContainerStudent.classList.add("open-aside-student");
    // create Elements students for the acrodion
    students.forEach((el, index) => {
        let $p = document.createElement("P");
        let $icon = document.createElement("I");
        let $iconTrash = document.createElement("I");
        let $iconEdit = document.createElement("I");
        $p.classList.add("student-name");
        $p.textContent = `${el.name} ${el.lastName}`;
        $p.setAttribute("id", `student-${index}`);
        $iconTrash.classList.add("bi");
        $iconTrash.setAttribute("id", `student-iconTrash-${index}`);
        $iconTrash.classList.add("bi-trash3");
        $p.append($iconTrash);
        $iconEdit.classList.add("bi");
        $iconEdit.setAttribute("id", `student-iconEdit-${index}`);
        $iconEdit.classList.add("bi-pencil");
        $p.append($iconEdit);
        $icon.classList.add("bi");
        $icon.setAttribute("id", `student-icon-${index}`);
        $icon.classList.add("bi-chevron-down");
        $p.append($icon);
        fragment.append($p);
    });
    $studentElementAsideContainer.innerHTML = "";
    $studentElementAsideContainer === null || $studentElementAsideContainer === void 0 ? void 0 : $studentElementAsideContainer.append(fragment);
}
function createSubjectAcordion(id) {
    var _a;
    const elementStudents = students[id];
    const $subjcetAcordion = document.createElement("DIV");
    $subjcetAcordion.classList.add("subjects-students-acordion");
    elementStudents.subject.forEach((el, index) => {
        let $subject = document.createElement("P");
        let $iconSubject = document.createElement("I");
        if (elementStudents.subject.length > 1) {
            $iconSubject.classList.add("bi");
            $iconSubject.classList.add("bi-trash3");
            $iconSubject.setAttribute("id", `subject-icon-${index}`);
            $iconSubject.setAttribute("data-student", `${id}`);
        }
        let theSubjectExist = false;
        for (const i of teachers) {
            if (normalizeText(i.subject) === normalizeText(el)) {
                theSubjectExist = true;
                break;
            }
        }
        if (theSubjectExist)
            $subject.textContent = el;
        else
            $subject.textContent = `${el} (Eliminado)`;
        $subject.classList.add("student-subject");
        $subject.append($iconSubject);
        $subjcetAcordion.append($subject);
    });
    const actualElement = document.getElementById(`student-${id}`);
    if (actualElement) {
        if ((_a = actualElement.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("subjects-students-acordion"))
            actualElement.nextElementSibling.remove();
        actualElement.insertAdjacentElement("afterend", $subjcetAcordion);
    }
}
// create element form function
function createElements() {
    if ($form)
        $form.innerHTML = "";
    if (teachers.length !== 0) {
        let $div = document.createElement("DIV");
        $div.classList.add("change");
        $div.textContent = "inscrivir Estudiantes";
        $form === null || $form === void 0 ? void 0 : $form.append($div);
    }
    let $h2 = document.createElement("H2");
    $h2.classList.add("title-form");
    $h2.textContent = "Formulario";
    $form === null || $form === void 0 ? void 0 : $form.append($h2);
}
// Events Functions
function subscriberStudentOrTeacher() {
    var _a, _b, _c, _d, _e;
    // true for students, false for teacher
    isStudentsForm = !isStudentsForm;
    if ($form)
        $form.dataset.option = "create";
    if (isStudentsForm) {
        // change color area
        (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.classList.remove("teacher-color");
        document
            .querySelectorAll(".subject-part")
            .forEach((el) => el.classList.remove("subject-part-teacher-mode"));
        (_b = document
            .querySelector(".container-teacher-info")) === null || _b === void 0 ? void 0 : _b.classList.remove("container-teacher-info-teacherColor");
        (_c = document
            .querySelector(".close-aside-students")) === null || _c === void 0 ? void 0 : _c.classList.remove("teacher-color");
        let rootStyle = document.documentElement.style;
        rootStyle.setProperty("--student-color", "#5dff9b");
        rootStyle.setProperty("--student-color-selected", "#afffce");
        rootStyle.setProperty("--btn-color", "#00a841");
        /////////////////////////////
        let clone = $templateStudents.cloneNode(true);
        createElements();
        $form === null || $form === void 0 ? void 0 : $form.append(clone);
        // add options
        let $optionFragment = document.createDocumentFragment();
        for (const i of teachers) {
            let $opt = document.createElement("OPTION");
            $opt.textContent = i.subject;
            $optionFragment.append($opt);
        }
        $form === null || $form === void 0 ? void 0 : $form.subjects.append($optionFragment);
        // errors span student
        $errorNameS = document.querySelector(".span-error-name-student");
        $errorLastNameS = document.querySelector(".span-error-lastName-student");
        $errorageS = document.querySelector(".span-error-age-student");
        $errorSubjectS = document.querySelector(".span-error-select-student");
    }
    else {
        ///////////////////////
        (_d = document.querySelector("html")) === null || _d === void 0 ? void 0 : _d.classList.add("teacher-color");
        document
            .querySelectorAll(".subject-part")
            .forEach((el) => el.classList.add("subject-part-teacher-mode"));
        document
            .querySelectorAll(".close-aside-students")
            .forEach((el) => el.classList.add("teacher-color"));
        (_e = document
            .querySelector(".container-teacher-info")) === null || _e === void 0 ? void 0 : _e.classList.add("container-teacher-info-teacherColor");
        let rootStyle = document.documentElement.style;
        rootStyle.setProperty("--student-color", "#5dff9b");
        rootStyle.setProperty("--student-color-selected", "#71def1");
        rootStyle.setProperty("--btn-color", "#0295af");
        ////////////////////////
        let clone = $templateTeacher.cloneNode(true);
        createElements();
        $form === null || $form === void 0 ? void 0 : $form.append(clone);
        $form === null || $form === void 0 ? void 0 : $form.inputImg.addEventListener("change", (e) => {
            const fileElement = e.target;
            // add event file
            if (fileElement && fileElement.files && fileElement.files.length > 0) {
                const file = fileElement.files[0];
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.addEventListener("load", (ev) => {
                    var _a;
                    imgTeacher = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.result;
                    addImgTeacher = document.querySelector(".img-teacher");
                    addImgTeacher === null || addImgTeacher === void 0 ? void 0 : addImgTeacher.setAttribute("src", imgTeacher);
                });
            }
        });
        // errors span teacher
        $errorNameT = document.querySelector(".span-error-name-teacher");
        $errorLastNameT = document.querySelector(".span-error-lastName-teacher");
        $errorageT = document.querySelector(".span-error-age-teacher");
        $errorSubjectT = document.querySelector(".span-error-subjectsTeacher-teacher");
        $errorDescriptionTeacherT = document.querySelector(".span-error-descriptionTeacher-teacher");
        $errorDescriptionSubjectT = document.querySelector(".span-error-descriptionSubject-teacher");
    }
}
// getdata for form student
function formStudent() {
    const validacion = {
        name: true,
        lastName: true,
        age: true,
        subject: true,
    };
    if ($form === null) {
        return false;
    }
    // name
    let saveName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/gim;
    if (!saveName.test($form.nameStudent.value) &&
        $form.nameStudent.value !== "") {
        validacion.name = false;
        if ($errorNameS) {
            $errorNameS.classList.remove("none");
            $errorNameS.classList.add("span-error-in");
            if ($errorNameS)
                $errorNameS.textContent = "Verifique que no tenga caracteres raros";
        }
    }
    else {
        if ($errorNameS)
            $errorNameS.classList.remove("span-error-in");
    }
    saveName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/gim;
    // last name
    if (!saveName.test($form.lastName.value) && $form.lastName.value !== "") {
        validacion.lastName = false;
        if ($errorLastNameS) {
            $errorLastNameS.classList.remove("none");
            $errorLastNameS.classList.add("span-error-in");
            if ($errorLastNameS)
                $errorLastNameS.textContent = "Verifique que no tenga caracteres raros";
        }
    }
    else {
        if ($errorLastNameS)
            $errorLastNameS.classList.remove("span-error-in");
    }
    // age
    let saveAge = /[^0-9]/g;
    if ($form.age.value >= 0 &&
        $form.age.value < 99 &&
        !saveAge.test($form.age.value)) {
        lastAgeStudents = $form.age.value;
        if ($errorageS)
            $errorageS.classList.remove("span-error-in");
    }
    else {
        $form.age.value = lastAgeStudents;
        validacion.age = false;
        if ($errorageS) {
            $errorageS.classList.remove("none");
            $errorageS.classList.add("span-error-in");
        }
    }
    // select subject
    if ($form.subjects.value === "select") {
        validacion.subject = false;
        if ($errorSubjectS) {
            $errorSubjectS.classList.remove("none");
            $errorSubjectS.classList.add("span-error-in");
        }
    }
    else {
        if ($errorSubjectS)
            $errorSubjectS.classList.remove("span-error-in");
    }
    // the return
    if (validacion.name &&
        validacion.lastName &&
        validacion.subject &&
        validacion.age) {
        return {
            name: $form.nameStudent.value,
            lastName: $form.lastName.value,
            age: $form.age.value,
            subject: [$form.subjects.value],
        };
    }
    else {
        return false;
    }
}
// getdata for form teacher
function formTeacher(e) {
    // span errors-teacher
    const validacion = {
        name: true,
        lastName: true,
        age: true,
        subject: true,
        descriptionTeacher: true,
        descriptionSubject: true,
    };
    if ($form === null) {
        return false;
    }
    // name
    let saveName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/gim;
    if (!saveName.test($form.nameTeacher.value) &&
        $form.nameTeacher.value !== "") {
        validacion.name = false;
        if ($errorNameT) {
            $errorNameT.classList.remove("none");
            $errorNameT.classList.add("span-error-in");
        }
    }
    else {
        if ($errorNameT)
            $errorNameT.classList.remove("span-error-in");
    }
    // lastName
    saveName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/gim;
    if (!saveName.test($form.lastNameTeacher.value) &&
        $form.lastNameTeacher.value !== "") {
        validacion.lastName = false;
        validacion.name = false;
        if ($errorLastNameT) {
            $errorLastNameT.classList.remove("none");
            $errorLastNameT.classList.add("span-error-in");
        }
    }
    else {
        if ($errorLastNameT)
            $errorLastNameT.classList.remove("span-error-in");
    }
    // age
    let saveAge = /[^0-9]/g;
    if ($form.ageTeacher.value >= 0 &&
        $form.ageTeacher.value < 99 &&
        !saveAge.test($form.ageTeacher.value)) {
        lastAge = $form.ageTeacher.value;
        if ($errorageT)
            $errorageT.classList.remove("span-error-in");
    }
    else {
        validacion.age = false;
        $form.ageTeacher.value = lastAge;
        if ($errorageT) {
            $errorageT.classList.remove("none");
            $errorageT.classList.add("span-error-in");
        }
    }
    // subject
    saveName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/gim;
    if (!saveName.test($form.subjectsTeacher.value) &&
        $form.subjectsTeacher.value !== "") {
        validacion.subject = false;
        if ($errorSubjectT) {
            $errorSubjectT.textContent = "Verifique que no tenga caracteres raros";
            $errorSubjectT.classList.remove("none");
            $errorSubjectT.classList.add("span-error-in");
        }
    }
    else {
        if ($errorSubjectT)
            $errorSubjectT.classList.remove("span-error-in");
    }
    // subject description
    if ($form.descriptionSubject.value.length < 200) {
        beforeDescription = $form.descriptionSubject.value;
        if ($errorDescriptionSubjectT)
            $errorDescriptionSubjectT.classList.remove("span-error-in");
    }
    else {
        $form.descriptionSubject.value = beforeDescription;
        validacion.descriptionSubject = false;
        if ($errorDescriptionSubjectT) {
            $errorDescriptionSubjectT.classList.remove("none");
            $errorDescriptionSubjectT.classList.add("span-error-in");
        }
    }
    // teacher description
    if ($form.descriptionTeacher.value.length < 250) {
        beforeDescriptionTeacher = $form.descriptionTeacher.value;
        if ($errorDescriptionTeacherT)
            $errorDescriptionTeacherT.classList.remove("span-error-in");
    }
    else {
        $form.descriptionTeacher.value = beforeDescriptionTeacher;
        validacion.descriptionTeacher = false;
        if ($errorDescriptionTeacherT) {
            $errorDescriptionTeacherT.classList.remove("none");
            $errorDescriptionTeacherT.classList.add("span-error-in");
        }
    }
    //the return
    if (validacion.name &&
        validacion.lastName &&
        validacion.age &&
        validacion.subject &&
        validacion.descriptionSubject &&
        validacion.descriptionTeacher) {
        return {
            name: $form.nameTeacher.value,
            lastName: $form.lastNameTeacher.value,
            age: $form.ageTeacher.value,
            subject: $form.subjectsTeacher.value.toLowerCase(),
            descriptionTeacher: $form.descriptionTeacher.value,
            descriptionSubject: $form.descriptionSubject.value,
            imgTeacher,
        };
    }
    else {
        console.log("falso");
        return false;
    }
}
// create Card
function readCards({ name, subject, descriptionTeacher, descriptionSubject, imgTeacher, }, index) {
    // 1. template selected, 2. class of the element, 3. add a content text, 4. if the element has attribute, 5.add the atribute if the fouth option is true
    validTemplate($templateCard, "title-subject", subject.charAt(0).toUpperCase() + subject.slice(1));
    validTemplate($templateCard, "teacher-name", name);
    validTemplate($templateCard, "img-card", imgTeacher, true, "src");
    validTemplate($templateCard, "info-subject", descriptionSubject);
    validTemplate($templateCard, "info-teacher", descriptionTeacher);
    validTemplate($templateCard, "students", subject, true, "data-subject");
    validTemplate($templateCard, "students", subject, true, "data-subject");
    const editBtn = $templateCard.querySelector(".btn-edit-card");
    editBtn === null || editBtn === void 0 ? void 0 : editBtn.setAttribute("data-position", `${index}`);
    const deletetBtn = $templateCard.querySelector(".btn-delete-card");
    deletetBtn === null || deletetBtn === void 0 ? void 0 : deletetBtn.setAttribute("data-position", `${index}`);
    let $clone = $templateCard.cloneNode(true);
    fragmentCard.append($clone);
}
//create cards
function iterateCards() {
    teachers.forEach((el, index) => {
        readCards(el, index);
    });
    if (cardsCOntainer) {
        cardsCOntainer.innerHTML = "";
        cardsCOntainer.append(fragmentCard);
        isStudentsForm = false;
        if (cardsCOntainer.children.length === 0) {
            cardsCOntainer.innerHTML = `<p class="no-cards">Registrese para aparecer aqui<p>`;
            isStudentsForm = true;
        }
        subscriberStudentOrTeacher();
    }
}
function openPageOfInfoTeacher(cardSubject) {
    listStudents === null || listStudents === void 0 ? void 0 : listStudents.classList.remove("none");
    listStudents === null || listStudents === void 0 ? void 0 : listStudents.classList.add("list-student-up");
    listStudents === null || listStudents === void 0 ? void 0 : listStudents.classList.remove("list-student-down");
    for (const i of teachers) {
        if (normalizeText(cardSubject) === normalizeText(i.subject)) {
            if ($teacherName)
                $teacherName.textContent = `${i.name} ${i.lastName}`;
            if ($infoTeacherSubject)
                $infoTeacherSubject.textContent = `Maestro de ${i.subject}`;
            if ($infoTeacher)
                $infoTeacher.textContent = i.descriptionTeacher;
            if ($imgTeacherListStudent)
                $imgTeacherListStudent.setAttribute("src", i.imgTeacher);
            // add students on the list
            $fragmentList = document.createDocumentFragment();
            if ($listStudents) {
                let datos = students.filter((el) => {
                    return el.subject.some((element) => {
                        let studentSubject = element ? normalizeText(element) : "";
                        let cardSubJ = cardSubject ? normalizeText(cardSubject) : "";
                        return studentSubject === cardSubJ;
                    });
                });
                datos.forEach((el) => {
                    if (el) {
                        let $li = document.createElement("LI");
                        $li.textContent = `${el.name} ${el.lastName}`;
                        $fragmentList.append($li);
                    }
                });
                $listStudents.innerHTML = "";
                if (datos.length === 0) {
                    $listStudents.innerHTML =
                        $listStudents.innerHTML = `<p class="no-cards">Aun sin Estudiantes</p>`;
                }
                $listStudents.append($fragmentList);
            }
        }
    }
}
// console.log(cardsCOntainer?.children)
// function readStudents({ name, lastName, age, subject }: formStudents): void {}
//////////////////////////////////////////////////////////////////////// Events
// event click *****************************
document.addEventListener("click", (e) => {
    var _a, _b, _c, _d, _e;
    // event for cahnge form
    if (e.target.matches(".change")) {
        subscriberStudentOrTeacher();
    }
    // event for list student and info teacher container
    if (e.target.matches(".students")) {
        e.preventDefault();
        let cardSubject = e.target.dataset.subject;
        if (cardSubject)
            openPageOfInfoTeacher(cardSubject);
        // add info teacher
    }
    // event for close the list student and info teacher container
    if (e.target.matches(".btn-close-info-teacher") ||
        e.target.matches(".btn-close-info-teacher *")) {
        listStudents === null || listStudents === void 0 ? void 0 : listStudents.classList.remove("list-student-up");
        listStudents === null || listStudents === void 0 ? void 0 : listStudents.classList.add("list-student-down");
    }
    // event for search teacher or subject
    if (e.target.matches(".btn-seacrh")) {
        let input = document.querySelector(".input-search");
        if (e.target.textContent === "Maestro") {
            if (input)
                input.placeholder = "Buscar por: Maestro";
            e.target.textContent = "Asingnatura";
        }
        else {
            if (input)
                input.placeholder = "Buscar por: Asignatura";
            e.target.textContent = "Maestro";
        }
    }
    //*************   delete
    let btnDelete = document.querySelectorAll(".btn-delete-card");
    let btnEdit = document.querySelectorAll(".btn-edit-card");
    // opening the menu to edit and delete
    if (e.target.matches(".edit-delete") ||
        e.target.matches(".edit-delete *")) {
        // la variable isDeleteActive es para verificar si unas de las opciones borral o editar estudiantes  o profesor esta activa, se remplaza el icono del menu por una X que indicara que si quiere cerral la opcion de borral o edital
        if (isDeleteActive) {
            iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.add("none");
            iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.remove("none");
            for (const i of Array.from(btnDelete)) {
                i.classList.add("none");
            }
            for (const i of Array.from(btnEdit)) {
                i.classList.add("none");
            }
            if ($form) {
                if (teachers.length !== 0)
                    isStudentsForm = false;
                else
                    isStudentsForm = true;
                if ($form.dataset.option === "edit")
                    subscriberStudentOrTeacher();
            }
            isDeleteActive = false;
        }
        else {
            editContainer.classList.toggle("edit-delete-container-none");
            editContainer.classList.remove("none");
        }
    }
    else {
        editContainer.classList.add("edit-delete-container-none");
    }
    // opening option to delete card
    if (e.target.matches("#delete-class")) {
        e.preventDefault();
        iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.remove("none");
        iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.add("none");
        editContainer.classList.add("edit-delete-container-none");
        isDeleteActive = true;
        for (const i of Array.from(btnDelete)) {
            i.classList.remove("none");
        }
    }
    // opening the option to see the list of the students
    if (e.target.matches("#all-student")) {
        e.preventDefault();
        if (!isDeleteActive) {
            createStudentAcrodion();
        }
    }
    // trash, edit and acordion
    if (e.target.matches(".student-name") ||
        e.target.matches(".student-name *")) {
        // event for every student to open the subject
        //****************** */ trash students
        if (e.target.classList.contains("bi-trash3")) {
            const Target = e.target;
            const textId = Target.id;
            const student = students[parseInt(textId[textId.length - 1])];
            const positionStudent = parseInt(textId[textId.length - 1]);
            const deleteStudent = confirm(`Desea borral el estudiante ${student.name} ${student.lastName}`);
            if (deleteStudent) {
                // editContainer.classList.add("edit-delete-container-none");
                students.splice(positionStudent, 1);
                createStudentAcrodion();
            }
        }
        else if (e.target.classList.contains("bi-pencil")) {
            const Target = e.target;
            const positionElement = parseInt(Target.id[Target.id.length - 1]);
            const element = students[positionElement];
            // acivate the btn to reset form
            isDeleteActive = true;
            iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.remove("none");
            iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.add("none");
            // open the student form
            isStudentsForm = false;
            subscriberStudentOrTeacher();
            if ($form) {
                $form.btnSubmitStudent.value = "Editar";
                $form.dataset.option = "edit";
                $form.nameStudent.value = element.name;
                $form.lastName.value = element.lastName;
                $form.age.value = element.age;
                // when selected other subject do not afect de edit
                $form.subjects.selectedIndex = 1;
                $form.subjects.style.visibility = "hidden";
            }
            positionElementEdit = positionElement;
            $asideContainerStudent === null || $asideContainerStudent === void 0 ? void 0 : $asideContainerStudent.classList.remove("open-aside-student");
        }
        else {
            //**************** */ open de acordion
            let Target = e.target;
            let icon = document.getElementById(`student-icon-${Target.id[Target.id.length - 1]}`);
            // remove the acordion
            if ((_a = Target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("subjects-students-acordion")) {
                // change the icon down to up
                icon === null || icon === void 0 ? void 0 : icon.classList.remove("bi-chevron-up");
                icon === null || icon === void 0 ? void 0 : icon.classList.add("bi-chevron-down");
                (_b = Target.nextElementSibling) === null || _b === void 0 ? void 0 : _b.remove();
                // add the acordion
            }
            else {
                let textId = Target.id;
                createSubjectAcordion(parseInt(textId[textId.length - 1]));
                icon === null || icon === void 0 ? void 0 : icon.classList.remove("bi-chevron-down");
                icon === null || icon === void 0 ? void 0 : icon.classList.add("bi-chevron-up");
            }
        }
    }
    // trash subjects students
    if (e.target.matches('[id^="subject-icon"]')) {
        const Target = e.target;
        // the students
        const positionStudent = Target.dataset.student;
        if (positionStudent) {
            const student = students[parseInt(positionStudent)];
            // the subject
            const subjectPosition = parseInt(Target.id[Target.id.length - 1]);
            const subject = student.subject[subjectPosition];
            const confirmDeleteSubject = confirm(`Estas seguro de querer borral la materia ${subject} del estudiante ${student.name} ${student.lastName}`);
            if (confirmDeleteSubject) {
                student.subject.splice(subjectPosition, 1);
                createSubjectAcordion(parseInt(positionStudent));
            }
        }
    }
    // open the subject in the subject acordion of the student
    if (e.target.matches(".student-subject")) {
        const Target = e.target;
        if (Target.textContent) {
            for (const i of teachers) {
                if (normalizeText(i.subject) === normalizeText(Target.textContent)) {
                    openPageOfInfoTeacher(Target.textContent);
                    if (window.innerWidth < 1200)
                        $asideContainerStudent === null || $asideContainerStudent === void 0 ? void 0 : $asideContainerStudent.classList.remove("open-aside-student");
                    break;
                }
            }
        }
    }
    // btn for close the students aside
    if (e.target.matches(".close-aside-students") ||
        e.target.matches(".close-aside-students *")) {
        $asideContainerStudent === null || $asideContainerStudent === void 0 ? void 0 : $asideContainerStudent.classList.remove("open-aside-student");
    }
    // delete card
    if (e.target.matches(".btn-delete-card") ||
        e.target.matches(".btn-delete-card *")) {
        // delete card
        for (const i of teachers) {
            let subJtoDelete = (_e = (_d = (_c = e.target.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector(".title-subject")) === null || _e === void 0 ? void 0 : _e.textContent;
            if (subJtoDelete)
                if (normalizeText(subJtoDelete) === normalizeText(i.subject)) {
                    let dataConfirm = confirm(`Estas seguro de querer borral la Materia de ${i.subject}`);
                    if (dataConfirm) {
                        teachers = teachers.filter((el) => normalizeText(el.subject) !== normalizeText(i.subject));
                        if (teachers.length === 0) {
                            isStudentsForm = true;
                            subscriberStudentOrTeacher();
                        }
                        iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.add("none");
                        iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.remove("none");
                        isDeleteActive = false;
                    }
                    else {
                        iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.add("none");
                        iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.remove("none");
                        isDeleteActive = false;
                    }
                }
        }
        iterateCards();
        editContainer.classList.add("none");
    }
    // show btn to edit card
    if (e.target.matches("#edit-class")) {
        e.preventDefault();
        iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.remove("none");
        iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.add("none");
        editContainer.classList.add("edit-delete-container-none");
        isDeleteActive = true;
        for (const i of Array.from(btnEdit)) {
            i.classList.remove("none");
        }
    }
    // edit card
    if (e.target.matches(".btn-edit-card") ||
        e.target.matches(".btn-edit-card *")) {
        const position = e.target.dataset.position;
        if (position && $form) {
            isStudentsForm = true;
            subscriberStudentOrTeacher();
            const dataTeacher = teachers[parseInt(position)];
            $form.nameTeacher.value = dataTeacher.name;
            $form.lastNameTeacher.value = dataTeacher.lastName;
            $form.ageTeacher.value = dataTeacher.age;
            $form.subjectsTeacher.value = dataTeacher.subject;
            $form.descriptionSubject.value = dataTeacher.descriptionSubject;
            $form.descriptionTeacher.value = dataTeacher.descriptionTeacher;
            positionElementEdit = parseInt(position);
            $form.dataset.option = "edit";
            $form.send.value = "Editar";
        }
    }
    // show btn to edit student
});
// event input ***************************
document.addEventListener("input", (e) => {
    // search teacher or subject
    var _a, _b, _c, _d;
    if (e.target.matches(".input-search")) {
        let Target = e.target;
        let btn = document.querySelector(".btn-seacrh");
        let inputStudent = document.querySelector(".input-search-stuents");
        if (inputStudent)
            inputStudent.value = "";
        if (btn) {
            if (btn.textContent === "Maestro") {
                // subjects
                if (cardsCOntainer)
                    (_a = HTMLCollectionToArray(cardsCOntainer)) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                        var _a, _b;
                        el.classList.add("none");
                        let elementTosearch = (_b = (_a = el.children[1]) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent;
                        if (elementTosearch) {
                            if (new RegExp(normalizeText(Target.value), "img").test(normalizeText(elementTosearch)))
                                el.classList.remove("none");
                        }
                    });
            }
            else {
                // teacher
                if (cardsCOntainer)
                    (_b = HTMLCollectionToArray(cardsCOntainer)) === null || _b === void 0 ? void 0 : _b.forEach((el) => {
                        var _a;
                        el.classList.add("none");
                        let elementTosearch = (_a = el.children[2].firstElementChild) === null || _a === void 0 ? void 0 : _a.textContent;
                        if (elementTosearch)
                            if (new RegExp(normalizeText(Target.value), "img").test(normalizeText(elementTosearch)))
                                el.classList.remove("none");
                    });
            }
        }
    }
    // search students global
    if (e.target.matches(".input-search-stuents")) {
        let Target = e.target;
        let inputSearchTeacher = document.querySelector(".input-search");
        if (inputSearchTeacher)
            inputSearchTeacher.value = "";
        if (cardsCOntainer)
            (_c = HTMLCollectionToArray(cardsCOntainer)) === null || _c === void 0 ? void 0 : _c.forEach((el) => {
                el.classList.add("none");
            });
        students.forEach((el) => {
            var _a;
            if (Target)
                if (new RegExp(normalizeText(Target.value), "img").test(normalizeText(el.name))) {
                    // search all element in the call the title that have the subject
                    if (cardsCOntainer)
                        (_a = HTMLCollectionToArray(cardsCOntainer)) === null || _a === void 0 ? void 0 : _a.forEach((element) => {
                            el.subject.forEach((subJ) => {
                                var _a;
                                let elSubject = (_a = element.querySelector(".title-subject")) === null || _a === void 0 ? void 0 : _a.textContent;
                                if (elSubject)
                                    if (normalizeText(elSubject) === normalizeText(subJ)) {
                                        element.classList.remove("none");
                                    }
                            });
                        });
                }
        });
        if ((Target === null || Target === void 0 ? void 0 : Target.value) === "") {
            if (cardsCOntainer)
                (_d = HTMLCollectionToArray(cardsCOntainer)) === null || _d === void 0 ? void 0 : _d.forEach((el) => {
                    el.classList.remove("none");
                });
        }
    }
    // search student in the subject
    if (e.target.matches(".search-stuents")) {
        let elementStudent;
        let Target = e.target;
        // transform the HTMLCollection to array
        if ($listStudents) {
            elementStudent = Array.from($listStudents.children);
        }
        elementStudent === null || elementStudent === void 0 ? void 0 : elementStudent.forEach((el) => el.classList.add("none"));
        elementStudent === null || elementStudent === void 0 ? void 0 : elementStudent.forEach((el) => {
            if (el.textContent) {
                if (new RegExp(normalizeText(Target.value), "img").test(normalizeText(el.textContent)))
                    el.classList.remove("none");
            }
        });
    }
    // search in the aside student
    if (e.target.matches(".search-student-inTheAside")) {
        const Target = e.target;
        // add the class none for all element in the studentElementAsideContainer and in the fonr of we remove when is match
        const studentsElements = Array.from($studentElementAsideContainer.children);
        studentsElements.forEach((el) => el.classList.add("none"));
        for (const el of studentsElements) {
            if (el.classList.contains("student-name") && el.textContent)
                if (new RegExp(normalizeText(Target.value), "img").test(normalizeText(el.textContent)))
                    el.classList.remove("none");
        }
    }
});
// event for confirm the form who`s first ***************************
$form === null || $form === void 0 ? void 0 : $form.addEventListener("input", (e) => {
    if (isStudentsForm)
        formStudent();
    else
        formTeacher(e);
});
// submit the forms *********************************
$form === null || $form === void 0 ? void 0 : $form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isStudentsForm) {
        let data = formStudent();
        // check data student
        if (typeof data !== "boolean") {
            let resurt = checkStudentInTheArray(data);
            switch (resurt) {
                // add the span error is the same the name and the last name
                case ConfirValue.theStudentExist:
                    $errorNameS === null || $errorNameS === void 0 ? void 0 : $errorNameS.classList.remove("none");
                    $errorNameS === null || $errorNameS === void 0 ? void 0 : $errorNameS.classList.add("span-error-in");
                    $errorLastNameS === null || $errorLastNameS === void 0 ? void 0 : $errorLastNameS.classList.remove("none");
                    $errorLastNameS === null || $errorLastNameS === void 0 ? void 0 : $errorLastNameS.classList.add("span-error-in");
                    if ($errorNameS)
                        $errorNameS.textContent = "Ya existe";
                    if ($errorLastNameS)
                        $errorLastNameS.textContent = "Ya existe";
                    break;
                // this option add the new subject in the same student
                case ConfirValue.otherSubject:
                    students.forEach((el) => {
                        if (typeof data !== "boolean") {
                            if (normalizeText(el.name) === normalizeText(data.name) &&
                                normalizeText(el.lastName) === normalizeText(data.lastName))
                                el.subject.push(...data.subject);
                        }
                    });
                    $form === null || $form === void 0 ? void 0 : $form.reset();
                    openPageOfInfoTeacher(data.subject[0]);
                    break;
                // this option remove the span error and add the new student in the array student
                case ConfirValue.notExist:
                    if ($errorLastNameS)
                        $errorLastNameS.classList.remove("span-error-in");
                    if ($errorNameS)
                        $errorNameS.classList.remove("span-error-in");
                    $form === null || $form === void 0 ? void 0 : $form.reset();
                    if (($form === null || $form === void 0 ? void 0 : $form.dataset.option) !== "edit") {
                        students.push(data);
                        openPageOfInfoTeacher(data.subject[0]);
                    }
                    else {
                        students[positionElementEdit].name = data.name;
                        students[positionElementEdit].lastName = data.lastName;
                        if ($form) {
                            if (teachers.length !== 0)
                                isStudentsForm = false;
                            else
                                isStudentsForm = true;
                            if ($form.dataset.option === "edit")
                                subscriberStudentOrTeacher();
                            iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.add("none");
                            iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.remove("none");
                        }
                    }
                    break;
            }
        }
    }
    else {
        const option = e.target.dataset.option;
        fragmentCard = document.createDocumentFragment();
        let confirm = false;
        let data = formTeacher(e);
        if (typeof data !== "boolean") {
            // Detects if a subject exists in the teacher area
            for (const i of teachers) {
                if (normalizeText(data.subject) === normalizeText(i.subject)) {
                    if (option === "edit")
                        if (normalizeText(teachers[positionElementEdit].subject) ===
                            normalizeText(i.subject))
                            continue;
                    confirm = true;
                    if ($errorSubjectT) {
                        $errorSubjectT.textContent =
                            "Verifique que no tenga caracteres raros";
                        $errorSubjectT.classList.remove("none");
                        $errorSubjectT.classList.add("span-error-in");
                        $errorSubjectT.textContent = "Esta materia ya existe";
                        $form === null || $form === void 0 ? void 0 : $form.subjectsTeacher.focus();
                    }
                    return;
                }
            }
            if (!confirm) {
                if ($errorSubjectT)
                    $errorSubjectT.classList.remove("span-error-in");
                $form === null || $form === void 0 ? void 0 : $form.reset();
                addImgTeacher === null || addImgTeacher === void 0 ? void 0 : addImgTeacher.setAttribute("src", "assets/images/perfil.jpg");
                imgTeacher = "assets/images/perfil.jpg";
                if (option === "create") {
                    teachers.push(data);
                }
                else {
                    iconClose === null || iconClose === void 0 ? void 0 : iconClose.classList.add("none");
                    iconMenu === null || iconMenu === void 0 ? void 0 : iconMenu.classList.remove("none");
                    teachers.splice(positionElementEdit, 1, data);
                }
                // add cards
                if ($form) {
                    $form.send.value = "Enviar";
                    $form.dataset.option = "create";
                }
                positionElementEdit = teachers.length;
                iterateCards();
            }
        }
    }
});
