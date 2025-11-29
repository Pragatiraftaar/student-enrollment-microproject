/*=================================
JsonPowerDB Helper Library
=================================*/

function createPUTRequest(connToken, jsonObj, dbName, relName){
    var putRequest = "{\n"
        + "\"token\" : \"" + connToken + "\","
        + "\"dbName\": \"" + dbName + "\",\n" 
        + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"jsonStr\": \n" + JSON.stringify(jsonObj) + "\n"
        + "}";
    return putRequest;
}

function createGET_BY_KEYRequest(connToken, dbName, relName, keyJson){
    var getRequest = "{\n"
        + "\"token\" : \"" + connToken + "\","
        + "\"dbName\": \"" + dbName + "\",\n"
        + "\"cmd\" : \"GET_BY_KEY\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"jsonStr\": \n" + JSON.stringify(keyJson) + "\n"
        + "}";
    return getRequest;
}

function createUPDATERecordRequest(connToken, jsonObj, dbName, relName){
    var updateRequest = "{\n"
        + "\"token\" : \"" + connToken + "\","
        + "\"dbName\": \"" + dbName + "\",\n"
        + "\"cmd\" : \"UPDATE\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"jsonStr\": \n" + JSON.stringify(jsonObj) + "\n"
        + "}";
    return updateRequest;
}

function executeCommand(requestString, apiEndPointUrl){
    var settings = {
        async: false,
        crossDomain: true,
        url: apiEndPointUrl,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: requestString
    };
    return $.ajax(settings);
}
