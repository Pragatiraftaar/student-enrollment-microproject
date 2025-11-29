// ===========================
// RESET FORM
// ===========================
function resetForm() {
    $("#rollno").val("");
    $("#fullname").val("");
    $("#class").val("");
    $("#birthdate").val("");
    $("#address").val("");
    $("#enrolldate").val("");

    $("#save").prop("disabled", false);
    $("#update").prop("disabled", false);

    $("#fullname, #class, #birthdate, #address, #enrolldate")
        .prop("disabled", false);

    $("#rollno").focus();
}


// ===========================
// SAVE RECORD
// ===========================
function saveRecord() {
    let student = {
        rollno: $("#rollno").val(),
        fullname: $("#fullname").val(),
        class: $("#class").val(),
        birthdate: $("#birthdate").val(),
        address: $("#address").val(),
        enrolldate: $("#enrolldate").val()
    };

    fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => alert(data.message));

    resetForm();
}


// ===========================
// UPDATE RECORD
// ===========================
function updateRecord() {
    let student = {
        rollno: $("#rollno").val(),
        fullname: $("#fullname").val(),
        class: $("#class").val(),
        birthdate: $("#birthdate").val(),
        address: $("#address").val(),
        enrolldate: $("#enrolldate").val()
    };

    fetch("http://localhost:3000/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(data => alert(data.message));

    resetForm();
}


// ===========================
// CHECK ROLL NUMBER (LOCAL)
// ===========================
function checkRollNo() {
    let roll = $("#rollno").val().trim();
    if (roll === "") return;

    fetch("http://localhost:3000/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollno: roll })
    })
    .then(res => res.json())
    .then(data => {
        if (data.found) {
            // fill form
            $("#fullname").val(data.student.fullname);
            $("#class").val(data.student.class);
            $("#birthdate").val(data.student.birthdate);
            $("#address").val(data.student.address);
            $("#enrolldate").val(data.student.enrolldate);

            $("#update").prop("disabled", false);
            $("#save").prop("disabled", true);
        } else {
            $("#update").prop("disabled", true);
            $("#save").prop("disabled", false);
        }
    });
}
