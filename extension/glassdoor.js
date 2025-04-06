(function () {
    const jobCards = document.querySelectorAll('#MainCol div[data-brandviews]');
    const jobs = []; 

    jobCards.forEach(card => {
      const jobLinkElement = card.querySelector('a.jobLink');
      const jobLink = jobLinkElement?.getAttribute('href');
    
      let id = null;
      if (jobLink && jobLink.includes('jobListingId=')) {
        const url = new URL(jobLink.startsWith('http') ? jobLink : `https://www.glassdoor.com${jobLink}`);
        id = url.searchParams.get('jobListingId');
      }
    
      const title = card.querySelector('div.pl-sm > div:nth-child(2)')?.innerText?.trim();
      const companyLocation = card.querySelector('div.pl-sm a.jobLink span')?.innerText?.trim();
      const location = card.querySelector('[data-test="emp-location"]')?.innerText?.trim();
      const salary = card.querySelector('[data-test="detailSalary"]')?.innerText?.trim();
    
      if (title && companyLocation && id) {
        jobs.push({
          id,
          title,
          companyLocation,
          location,
          salary,
          jobLink: jobLink?.startsWith('http') ? jobLink : `https://www.glassdoor.com${jobLink}`
        });
      }
    });

    console.log("Extracted Jobs:", jobs); 

    fetch('http://localhost:8083/api/v1/info/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobs),
    })
      .then(res => res.json())
      .then(data => console.log('Jobs saved:', data))
      .catch(err => console.error('Error saving jobs:', err));
   
})();
  