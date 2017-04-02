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
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    }
}

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
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
}

function addPersonFace(personId, url) = {
	var pi;
        var url;
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
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
}

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
            data: "{url: "+ img_path"}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });s
}

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
            data: "{personGroupId : hackathon_demo, faceId}",
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
}