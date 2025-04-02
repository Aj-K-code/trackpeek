(function() {
    // Check if the popup already exists
    if (document.getElementById('trackpeek-popup')) {
        return;
    }

    // Create the popup container
    const popup = document.createElement('div');
    popup.id = 'trackpeek-popup';
    
    // Create header with title
    const header = document.createElement('div');
    header.className = 'trackpeek-header';
    
    const title = document.createElement('h2');
    title.innerHTML = '🕵️ What Data Are They Tracking?';
    header.appendChild(title);
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'trackpeek-close-btn';
    closeButton.onclick = function() {
        popup.remove();
    };
    header.appendChild(closeButton);
    popup.appendChild(header);

    // Create content container
    const content = document.createElement('div');
    content.className = 'trackpeek-content';

    // --- Summary Section ---
    const summary = document.createElement('div');
    summary.className = 'trackpeek-summary';
    
    const currentHostname = window.location.hostname;
    const summaryText = document.createElement('p');
    summaryText.innerHTML = `Scanning <strong>${currentHostname}</strong>`;
    summary.appendChild(summaryText);
    content.appendChild(summary);

    // --- Cookies ---
    const cookiesSection = document.createElement('div');
    cookiesSection.className = 'trackpeek-section';
    
    const cookiesHeading = document.createElement('h3');
    cookiesHeading.innerHTML = '🍪 Cookies';
    cookiesSection.appendChild(cookiesHeading);
    
    const cookiesList = document.createElement('ul');
    const cookies = document.cookie.split(';');
    
    if (cookies.length > 0 && cookies[0] !== "") {
        let cookieCount = 0;
        cookies.forEach(function(cookie) {
            if (cookie.trim()) {
                cookieCount++;
                const item = document.createElement('li');
                item.textContent = cookie.trim();
                cookiesList.appendChild(item);
            }
        });
        
        const cookieSummary = document.createElement('p');
        cookieSummary.className = 'trackpeek-summary-count';
        cookieSummary.textContent = `Found ${cookieCount} cookie${cookieCount !== 1 ? 's' : ''}`;
        cookiesSection.appendChild(cookieSummary);
    } else {
        const noCookies = document.createElement('p');
        noCookies.className = 'trackpeek-none-found';
        noCookies.textContent = 'No cookies found';
        cookiesSection.appendChild(noCookies);
    }
    
    cookiesSection.appendChild(cookiesList);
    content.appendChild(cookiesSection);

    // --- LocalStorage ---
    const localStorageSection = document.createElement('div');
    localStorageSection.className = 'trackpeek-section';
    
    const localStorageHeading = document.createElement('h3');
    localStorageHeading.innerHTML = '📦 LocalStorage';
    localStorageSection.appendChild(localStorageHeading);
    
    try {
        const localStorageList = document.createElement('ul');
        let localStorageCount = 0;
        
        if (localStorage && localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                localStorageCount++;
                const item = document.createElement('li');
                
                // Truncate very long values
                let value = localStorage.getItem(key);
                if (value && value.length > 100) {
                    value = value.substring(0, 100) + '...';
                }
                
                item.textContent = `${key}: ${value}`;
                localStorageList.appendChild(item);
            }
            
            const localStorageSummary = document.createElement('p');
            localStorageSummary.className = 'trackpeek-summary-count';
            localStorageSummary.textContent = `Found ${localStorageCount} item${localStorageCount !== 1 ? 's' : ''}`;
            localStorageSection.appendChild(localStorageSummary);
        } else {
            const noLocalStorage = document.createElement('p');
            noLocalStorage.className = 'trackpeek-none-found';
            noLocalStorage.textContent = 'No localStorage data found';
            localStorageSection.appendChild(noLocalStorage);
        }
        
        localStorageSection.appendChild(localStorageList);
    } catch (e) {
        const errorMsg = document.createElement('p');
        errorMsg.className = 'trackpeek-error';
        errorMsg.textContent = 'Unable to access localStorage (possibly blocked by browser security)';
        localStorageSection.appendChild(errorMsg);
    }
    
    content.appendChild(localStorageSection);

    // --- SessionStorage ---
    const sessionStorageSection = document.createElement('div');
    sessionStorageSection.className = 'trackpeek-section';
    
    const sessionStorageHeading = document.createElement('h3');
    sessionStorageHeading.innerHTML = '📦 SessionStorage';
    sessionStorageSection.appendChild(sessionStorageHeading);
    
    try {
        const sessionStorageList = document.createElement('ul');
        let sessionStorageCount = 0;
        
        if (sessionStorage && sessionStorage.length > 0) {
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                sessionStorageCount++;
                const item = document.createElement('li');
                
                // Truncate very long values
                let value = sessionStorage.getItem(key);
                if (value && value.length > 100) {
                    value = value.substring(0, 100) + '...';
                }
                
                item.textContent = `${key}: ${value}`;
                sessionStorageList.appendChild(item);
            }
            
            const sessionStorageSummary = document.createElement('p');
            sessionStorageSummary.className = 'trackpeek-summary-count';
            sessionStorageSummary.textContent = `Found ${sessionStorageCount} item${sessionStorageCount !== 1 ? 's' : ''}`;
            sessionStorageSection.appendChild(sessionStorageSummary);
        } else {
            const noSessionStorage = document.createElement('p');
            noSessionStorage.className = 'trackpeek-none-found';
            noSessionStorage.textContent = 'No sessionStorage data found';
            sessionStorageSection.appendChild(noSessionStorage);
        }
        
        sessionStorageSection.appendChild(sessionStorageList);
    } catch (e) {
        const errorMsg = document.createElement('p');
        errorMsg.className = 'trackpeek-error';
        errorMsg.textContent = 'Unable to access sessionStorage (possibly blocked by browser security)';
        sessionStorageSection.appendChild(errorMsg);
    }
    
    content.appendChild(sessionStorageSection);

    // --- Third-party Scripts ---
    const scriptsSection = document.createElement('div');
    scriptsSection.className = 'trackpeek-section';
    
    const scriptsHeading = document.createElement('h3');
    scriptsHeading.innerHTML = '🌍 Third-Party Scripts';
    scriptsSection.appendChild(scriptsHeading);
    
    const scriptsList = document.createElement('ul');
    const scripts = document.getElementsByTagName('script');
    const thirdPartyScripts = [];
    
    for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        if (script.src) {
            try {
                const scriptHost = new URL(script.src).hostname;
                if (scriptHost && scriptHost !== currentHostname) {
                    thirdPartyScripts.push({
                        url: script.src,
                        host: scriptHost
                    });
                }
            } catch (e) {
                // Skip invalid URLs
            }
        }
    }
    
    if (thirdPartyScripts.length > 0) {
        const scriptSummary = document.createElement('p');
        scriptSummary.className = 'trackpeek-summary-count';
        scriptSummary.textContent = `Found ${thirdPartyScripts.length} third-party script${thirdPartyScripts.length !== 1 ? 's' : ''}`;
        scriptsSection.appendChild(scriptSummary);
        
        // Group scripts by domain
        const scriptsByDomain = {};
        thirdPartyScripts.forEach(script => {
            if (!scriptsByDomain[script.host]) {
                scriptsByDomain[script.host] = [];
            }
            scriptsByDomain[script.host].push(script.url);
        });
        
        // Display scripts grouped by domain
        for (const domain in scriptsByDomain) {
            const domainItem = document.createElement('li');
            domainItem.className = 'trackpeek-domain';
            domainItem.textContent = domain;
            scriptsList.appendChild(domainItem);
            
            const domainScripts = document.createElement('ul');
            scriptsByDomain[domain].forEach(url => {
                const scriptItem = document.createElement('li');
                scriptItem.textContent = url;
                domainScripts.appendChild(scriptItem);
            });
            scriptsList.appendChild(domainScripts);
        }
    } else {
        const noScripts = document.createElement('p');
        noScripts.className = 'trackpeek-none-found';
        noScripts.textContent = 'No third-party scripts found';
        scriptsSection.appendChild(noScripts);
    }
    
    scriptsSection.appendChild(scriptsList);
    content.appendChild(scriptsSection);

    // Add content to popup
    popup.appendChild(content);

    // Add footer with attribution
    const footer = document.createElement('div');
    footer.className = 'trackpeek-footer';
    footer.innerHTML = '<p>Powered by TrackPeek - A privacy tool</p>';
    popup.appendChild(footer);

    // Add the popup to the page
    document.body.appendChild(popup);

    // Add inline styles for when the bookmarklet is used
    const style = document.createElement('style');
    style.textContent = `
        #trackpeek-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 2147483647;
            width: 350px;
            max-height: 80vh;
            overflow-y: auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
        }
        
        .trackpeek-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
            background-color: #f8f9fa;
            border-radius: 8px 8px 0 0;
        }
        
        .trackpeek-header h2 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }
        
        .trackpeek-close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 0;
            margin: 0;
            line-height: 1;
        }
        
        .trackpeek-close-btn:hover {
            color: #f44336;
        }
        
        .trackpeek-content {
            padding: 16px;
        }
        
        .trackpeek-summary {
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
        }
        
        .trackpeek-section {
            margin-bottom: 20px;
        }
        
        .trackpeek-section h3 {
            margin: 0 0 8px 0;
            font-size: 15px;
            font-weight: 600;
        }
        
        .trackpeek-summary-count {
            font-size: 13px;
            color: #666;
            margin: 4px 0 8px 0;
        }
        
        .trackpeek-none-found {
            font-style: italic;
            color: #888;
        }
        
        .trackpeek-error {
            color: #f44336;
            font-style: italic;
        }
        
        .trackpeek-section ul {
            margin: 8px 0;
            padding-left: 20px;
        }
        
        .trackpeek-section li {
            margin-bottom: 4px;
            word-break: break-all;
        }
        
        .trackpeek-domain {
            font-weight: 600;
            margin-top: 8px;
        }
        
        .trackpeek-footer {
            padding: 8px 16px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
        
        @media (max-width: 480px) {
            #trackpeek-popup {
                width: 90%;
                right: 5%;
                left: 5%;
            }
        }
    `;
    document.head.appendChild(style);
})();