(function() {
    // Check if the popup already exists
    if (document.getElementById('scanner-popup')) {
        return;
    }

    // Create the popup container
    var popup = document.createElement('div');
    popup.id = 'scanner-popup';
    popup.innerHTML = '<h2>What Data Are They Tracking? 🕵️</h2>';

    // Add close button
    var closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = function() {
        popup.remove();
    };
    popup.appendChild(closeButton);

    // --- Cookies ---
    popup.appendChild(document.createElement('hr'));
    var cookiesHeading = document.createElement('h2');
    cookiesHeading.innerText = 'Cookies 🍪';
    popup.appendChild(cookiesHeading);
    var cookiesList = document.createElement('ul');
    var cookies = document.cookie.split(';');
    if (cookies.length > 0 && cookies[0] !== "") {
        cookies.forEach(function(cookie) {
            var item = document.createElement('li');
            item.innerText = cookie.trim();
            cookiesList.appendChild(item);
        });
    } else {
        cookiesList.innerHTML = '<li>No cookies found.</li>';
    }
    popup.appendChild(cookiesList);

    // --- LocalStorage ---
    popup.appendChild(document.createElement('hr'));
    var localStorageHeading = document.createElement('h2');
    localStorageHeading.innerText = 'LocalStorage 📦';
    popup.appendChild(localStorageHeading);
    var localStorageList = document.createElement('ul');
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var item = document.createElement('li');
            item.innerText = key + ': ' + localStorage.getItem(key);
            localStorageList.appendChild(item);
        }
    } else {
        localStorageList.innerHTML = '<li>No localStorage data found.</li>';
    }
    popup.appendChild(localStorageList);

    // --- SessionStorage ---
    popup.appendChild(document.createElement('hr'));
    var sessionStorageHeading = document.createElement('h2');
    sessionStorageHeading.innerText = 'SessionStorage 📦';
    popup.appendChild(sessionStorageHeading);
    var sessionStorageList = document.createElement('ul');
    if (sessionStorage.length > 0) {
        for (var i = 0; i < sessionStorage.length; i++) {
            var key = sessionStorage.key(i);
            var item = document.createElement('li');
            item.innerText = key + ': ' + sessionStorage.getItem(key);
            sessionStorageList.appendChild(item);
        }
    } else {
        sessionStorageList.innerHTML = '<li>No sessionStorage data found.</li>';
    }
    popup.appendChild(sessionStorageList);

    // --- Third-party Scripts ---
    popup.appendChild(document.createElement('hr'));
    var scriptsHeading = document.createElement('h2');
    scriptsHeading.innerText = 'Third-Party Scripts 🌍';
    popup.appendChild(scriptsHeading);
    var scriptsList = document.createElement('ul');
    var scripts = document.getElementsByTagName('script');
    var thirdPartyScripts = [];
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src && new URL(script.src).hostname !== window.location.hostname) {
            thirdPartyScripts.push(script.src);
        }
    }
    if (thirdPartyScripts.length > 0) {
        thirdPartyScripts.forEach(function(src) {
            var item = document.createElement('li');
            item.innerText = src;
            scriptsList.appendChild(item);
        });
    } else {
        scriptsList.innerHTML = '<li>No third-party scripts found.</li>';
    }
    popup.appendChild(scriptsList);

    // Add the popup to the page
    document.body.appendChild(popup);

    // Basic styling (can be moved to CSS file)
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        z-index: 10000;
        width: 300px;
        max-height: 80vh;
        overflow-y: auto;
    `;
    closeButton.style.cssText = `
        background-color: #f44336;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        margin-top: 10px;
    `;
})();