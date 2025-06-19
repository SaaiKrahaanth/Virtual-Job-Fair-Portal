document.getElementById('loadLiveSessions').addEventListener('click', () => {
      const container = document.getElementById('contentArea');

        fetch('live-sessions.html')
          .then(res => res.text())
          .then(html => {
            container.innerHTML = html;
           
            const script = document.createElement('script');
            script.src = 'live-sessions.js';
            document.body.appendChild(script);
          })
          .catch(err => {
            container.innerHTML = '<div class="alert alert-danger">Failed to load live sessions.</div>';
            console.error(err);
          });
      
    });
    
    
 document.getElementById('loadJobApplications').addEventListener('click', () => {
  const container = document.getElementById('contentArea');
      
        fetch('user-jobApply.html')
          .then(res => res.text())
          .then(html => {
            container.innerHTML = html;
          });
    
    });    
    