//Only to be run once, creates the user group "Hackathon Demo"
function createPersonGroup() = {
	var params = {
            // Request parameters
            "personGroupId" : "hackathon_demo"
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9dd5ea344b5547da90cb0257a43818d7");
            },
            type: "PUT",
            name: "hackathon_demo",
            // Request body
            data: ""
        })
        .done(function(data) {
            return data;
        })
        .fail(function() {
            alert("error");
        });
    }
}
// Creates a person in the azure api
function createPerson(name, userId) = {
	var params = {
            // Request parameters
            "personGroupId" : "hackathon_demo"
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9dd5ea344b5547da90cb0257a43818d7");
            },
            type: "POST",
            // Request body
            data: "{name: " + name  "," "userData: " + userId "}"
        })
        .done(function(data) {
        	return data;
        })
        .fail(function() {
            alert("error");
        });
}
// Adds a face to a person on the azure api
function addPersonFace(personId, url) = {
        var params = {
            // Request parameters
            "personGroupId" : "hackathon_demo",
            "personId" :  '"' + personId + '"'
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9dd5ea344b5547da90cb0257a43818d7");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            return data;
        })
        .fail(function() {
            alert("error");
        });
}

// Processes an image and returns the face id coressponding to the azure value
function detectFace(img_path) = {
	var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false"
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9dd5ea344b5547da90cb0257a43818d7");
            },
            type: "POST",
            // Request body
            data: "{url: "+ img_path"}"
        })
        .done(function(data) {
        	return data;
        })
        .fail(function() {
            alert("error");
        });
}

// Check if the face corresponding to the faceId matches the person 
function verifyPerson(personId, faceId) {
	var params = {
            // Request parameters
        };
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/verify?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9dd5ea344b5547da90cb0257a43818d7");
            },
            type: "POST",
            // Request body
            data: "{personGroupId : hackathon_demo, personId: " + personId + 
            ", faceId : " + faceId ",}"
        })
        .done(function(data) {
            return data;
        })
        .fail(function(err) {
            alert(err);
        });
}