function sendData(url, onSuccess, onError) {
    var request = new XMLHttpRequest(), 
        resp,
        allowCORSajax = false;

    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    if ("withCredentials" in request) {
        request.open('GET', url, true);

    } else if (typeof XDomainRequest != "undefined") {
        var params =  {
            urlCORS : encodeURIComponent(window.location.protocol + '//' + window.location.hostname)
        };

        url = encodeURI(Utils.domain.createUrl(url, null, params)); // EncodeURI needed for special characters in IE

        request =  new XDomainRequest();

        request.open('GET', url);

    } else{
        Utils.shell.error("Your browser does not support AJAX cross-domain requests !");
        return;
    }

    request.onload = function(event) {
        resp = request.responseText;
        onSuccess(resp);
    };

    request.onerror = function() {
        onError();
    };

    request.send();

    return resp;
}

function onSuccess(resp){console.log(resp)};
function onError(resp){console.log(resp)};
