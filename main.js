import './style.css'

const domainFilter = document.getElementById('filter');
const resultsContainer = document.getElementById('results');
const sortButton = document.getElementById('sort');
let scrapedEmails = [];

domainFilter.addEventListener('change', (e) => {
  console.log("domain filter", e.target.value);
  let filteredEmails = scrapedEmails.filter((email) => email.indexOf(e.target.value) > -1);
  renderEmails(filteredEmails);
})

sortButton.addEventListener('click', () => {
  let sortedEmails = JSON.parse(JSON.stringify(scrapedEmails));
  sortedEmails = sortedEmails.sort((a,b) => {
    let domainA = a.split('@')[1];
    let domainB = b.split('@')[1];
    return domainA < domainB ? -1 : 1;
  });
  renderEmails(sortedEmails);
})

document.getElementById('scrapeEmails').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    document.getElementById('isLoaded').innerText = 'Loading...';
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'accessDom' });
  });
});

const checkDOMForEmails = (domstring) => {
  let regex = new RegExp(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g);
  let result;
  scrapedEmails = [];
  while ((result = regex.exec(domstring)) !== null) {
    scrapedEmails.push(result+'');
  }
  renderEmails(scrapedEmails, true);
}

const renderEmails = (emails, resetDomains = false) => {
  resultsContainer.innerHTML = '';
  let domains = [];
  for(let i=0; i<emails.length; i++) {
    let result = emails[i];
    const emailNode = document.createElement('div');
    emailNode.classList.add('email');
    emailNode.innerText = result;
    let emailStr = result+'';
    let domain = emailStr.split('@')[1];
    console.log({domain});
    domains.push(domain);
    resultsContainer.appendChild(emailNode);
    console.log(result);
  }
  domains = [...new Set(domains)];

  if(resetDomains) {
    domainFilter.innerHTML = '';

    let opt = document.createElement('option');
    opt.setAttribute('value', '');
    opt.innerText = 'Show all';
    domainFilter.appendChild(opt);

    domains.forEach(d => {
      let opt = document.createElement('option');
      opt.setAttribute('value', d);
      opt.innerText = d;
      domainFilter.appendChild(opt);
    })
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'domAccessed') {
    document.getElementById('isLoaded').innerText = '';
    checkDOMForEmails(request.domContent);
  }
});
