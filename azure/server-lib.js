newUser(name, email, pass, personId, PersonGroupId, sites, faceIds){
        $.ajax({
            url: "https://facelock.herokuapp.com/users ",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
            },
            type: "POST",
            // Request body
            data: {
                name: name,
                email: email,
                password: pass,
                pi: personId,
                pgi: PersonGroupId,
                sites: sites,
                faceIds: faceIds
            }
        })
        .done(function(data) {
            return data;
        })
        .fail(function(err) {
            console.log(err);
        });
    }
}