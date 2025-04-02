// TrackPeek Scanner - Simplified version for Chrome compatibility
(function() {
    // Check if the popup already exists
    if (document.getElementById('trackpeek-popup')) {
        return;
    }

    // Create the popup container
    const popup = document.createElement('div');
    popup.id = 'trackpeek-popup';
    popup.style.cssText = 'position:fixed;top:20px;right:20px;background-color:white;border:1px solid #ccc;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.2);z-index:2147483647;width:350px;max-height:80vh;overflow-y:auto;font-family:sans-serif;font-size:14px;line-height:1.5;color:#333;padding:16px;';
    
    // Create header with title
    const title = document.createElement('h2');
    title.innerHTML = '🕵️ What Data Are They Tracking?';
    title.style.margin = '0 0 15px 0';
    popup.appendChild(title);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = 'position:absolute;top:10px;right:10px;background:none;border:none;font-size:24px;cursor:pointer;color:#666;';
    closeButton.onclick = function() {
        popup.remove();
    };
    popup.appendChild(closeButton);

    // --- Cookies ---
    const cookiesHeading = document.createElement('h3');
    cookiesHeading.innerHTML = '🍪 Cookies';
    cookiesHeading.style.margin = '20px 0 10px 0';
    popup.appendChild(cookiesHeading);
    
    const cookiesList = document.createElement('ul');
    cookiesList.style.margin = '10px 0';
    cookiesList.style.paddingLeft = '20px';
    const cookies = document.cookie.split(';');
    
    if (cookies.length > 0 && cookies[0] !== "") {
        let cookieCount = 0;
        cookies.forEach(function(cookie) {
            if (cookie.trim()) {
                cookieCount++;
                const item = document.createElement('li');
                item.textContent = cookie.trim();
                item.style.margin = '5px 0';
                cookiesList.appendChild(item);
            }
        });
        
        const cookieSummary = document.createElement('p');
        cookieSummary.textContent = `Found ${cookieCount} cookie${cookieCount !== 1 ? 's' : ''}`;
        cookieSummary.style.fontWeight = 'bold';
        popup.appendChild(cookieSummary);
    } else {
        const noCookies = document.createElement('p');
        noCookies.textContent = 'No cookies found';
        popup.appendChild(noCookies);
    }
    
    popup.appendChild(cookiesList);

    // --- LocalStorage ---
    const localStorageHeading = document.createElement('h3');
    localStorageHeading.innerHTML = '📦 LocalStorage';
    localStorageHeading.style.margin = '20px 0 10px 0';
    popup.appendChild(localStorageHeading);
    
    try {
        const localStorageList = document.createElement('ul');
        localStorageList.style.margin = '10px 0';
        localStorageList.style.paddingLeft = '20px';
        let localStorageCount = 0;
        
        if (localStorage && localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                localStorageCount++;
                const item = document.createElement('li');
                
                // Truncate very long values
                let value = localStorage.getItem(key);
                if (value && value.length > 50) {
                    value = value.substring(0, 50) + '...';
                }
                
                item.textContent = `${key}: ${value}`;
                item.style.margin = '5px 0';
                localStorageList.appendChild(item);
            }
            
            const localStorageSummary = document.createElement('p');
            localStorageSummary.textContent = `Found ${localStorageCount} localStorage item${localStorageCount !== 1 ? 's' : ''}`;
            localStorageSummary.style.fontWeight = 'bold';
            popup.appendChild(localStorageSummary);
        } else {
            const noLocalStorage = document.createElement('p');
            noLocalStorage.textContent = 'No localStorage data found';
            popup.appendChild(noLocalStorage);
        }
        
        popup.appendChild(localStorageList);
    } catch (e) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Unable to access localStorage';
        popup.appendChild(errorMsg);
    }

    // --- SessionStorage ---
    const sessionStorageHeading = document.createElement('h3');
    sessionStorageHeading.innerHTML = '📦 SessionStorage';
    sessionStorageHeading.style.margin = '20px 0 10px 0';
    popup.appendChild(sessionStorageHeading);
    
    try {
        const sessionStorageList = document.createElement('ul');
        sessionStorageList.style.margin = '10px 0';
        sessionStorageList.style.paddingLeft = '20px';
        let sessionStorageCount = 0;
        
        if (sessionStorage && sessionStorage.length > 0) {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                sessionStorageCount++;
                const item = document.createElement('li');
                
                // Truncate very long values
                let value = sessionStorage.getItem(key);
                if (value && value.length > 50) {
                    value = value.substring(0, 50) + '...';
                }
                
                item.textContent = `${key}: ${value}`;
                item.style.margin = '5px 0';
                sessionStorageList.appendChild(item);
            }
            
            const sessionStorageSummary = document.createElement('p');
            sessionStorageSummary.textContent = `Found ${sessionStorageCount} sessionStorage item${sessionStorageCount !== 1 ? 's' : ''}`;
            sessionStorageSummary.style.fontWeight = 'bold';
            popup.appendChild(sessionStorageSummary);
        } else {
            const noSessionStorage = document.createElement('p');
            noSessionStorage.textContent = 'No sessionStorage data found';
            popup.appendChild(noSessionStorage);
        }
        
        popup.appendChild(sessionStorageList);
    } catch (e) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Unable to access sessionStorage';
        popup.appendChild(errorMsg);
    }

    // --- Third-Party Scripts ---
    const scriptsHeading = document.createElement('h3');
    scriptsHeading.innerHTML = '🌍 Third-Party Scripts';
    scriptsHeading.style.margin = '20px 0 10px 0';
    popup.appendChild(scriptsHeading);
    
    const scriptsList = document.createElement('ul');
    scriptsList.style.margin = '10px 0';
    scriptsList.style.paddingLeft = '20px';
    
    // Get all script tags
    const scripts = document.getElementsByTagName('script');
    const thirdPartyScripts = [];
    const currentHostname = window.location.hostname;
    
    // Find third-party scripts
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src) {
            try {
                const scriptHostname = new URL(scripts[i].src).hostname;
                if (scriptHostname && scriptHostname !== currentHostname) {
                    thirdPartyScripts.push(scripts[i].src);
                }
            } catch (e) {
                // Skip invalid URLs
            }
        }
    }
    
    if (thirdPartyScripts.length > 0) {
        const scriptSummary = document.createElement('p');
        scriptSummary.textContent = `Found ${thirdPartyScripts.length} third-party script${thirdPartyScripts.length !== 1 ? 's' : ''}`;
        scriptSummary.style.fontWeight = 'bold';
        popup.appendChild(scriptSummary);
        
        // Group scripts by domain
        const scriptsByDomain = {};
        
        thirdPartyScripts.forEach(script => {
            try {
                const url = new URL(script);
                const domain = url.hostname;
                
                if (!scriptsByDomain[domain]) {
                    scriptsByDomain[domain] = [];
                }
                
                scriptsByDomain[domain].push(script);
            } catch (e) {
                // Skip invalid URLs
            }
        });
        
        // Display scripts grouped by domain
        for (const domain in scriptsByDomain) {
            const domainItem = document.createElement('li');
            domainItem.style.margin = '10px 0 5px 0';
            domainItem.style.fontWeight = 'bold';
            domainItem.textContent = domain;
            scriptsList.appendChild(domainItem);
            
            const domainScripts = document.createElement('ul');
            domainScripts.style.paddingLeft = '20px';
            
            scriptsByDomain[domain].forEach(script => {
                const scriptItem = document.createElement('li');
                scriptItem.style.margin = '3px 0';
                scriptItem.style.fontSize = '12px';
                scriptItem.textContent = script;
                domainScripts.appendChild(scriptItem);
            });
            
            scriptsList.appendChild(domainScripts);
        }
    } else {
        const noScripts = document.createElement('p');
        noScripts.textContent = 'No third-party scripts found';
        popup.appendChild(noScripts);
    }
    
    popup.appendChild(scriptsList);

    // Add the popup to the page
    document.body.appendChild(popup);
})();