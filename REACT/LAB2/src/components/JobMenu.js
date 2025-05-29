import React from 'react';

const JobMenu = ({ job }) => {
  const menuItems = {
    developer: [
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
      { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { name: 'Dev.to', url: 'https://dev.to' },
      { name: 'Codewars', url: 'https://www.codewars.com' },
      { name: 'LeetCode', url: 'https://leetcode.com' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com' }
    ],
    designer: [
      { name: 'Dribbble', url: 'https://dribbble.com' },
      { name: 'Behance', url: 'https://www.behance.net' },
      { name: 'Figma', url: 'https://www.figma.com' },
      { name: 'Adobe Creative Cloud', url: 'https://www.adobe.com/creativecloud.html' },
      { name: 'Awwwards', url: 'https://www.awwwards.com' },
      { name: 'UI Movement', url: 'https://uimovement.com' },
      { name: 'Designmodo', url: 'https://designmodo.com' }
    ],
    manager: [
      { name: 'Trello', url: 'https://trello.com' },
      { name: 'Asana', url: 'https://asana.com' },
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira' },
      { name: 'Slack', url: 'https://slack.com' },
      { name: 'Microsoft Teams', url: 'https://www.microsoft.com/microsoft-teams' },
      { name: 'Notion', url: 'https://www.notion.so' },
      { name: 'Basecamp', url: 'https://basecamp.com' }
    ],
    analyst: [
      { name: 'Google Analytics', url: 'https://analytics.google.com' },
      { name: 'Tableau', url: 'https://www.tableau.com' },
      { name: 'Power BI', url: 'https://powerbi.microsoft.com' },
      { name: 'SQL documentation', url: 'https://www.w3schools.com/sql' },
      { name: 'Kaggle', url: 'https://www.kaggle.com' },
      { name: 'DataCamp', url: 'https://www.datacamp.com' },
      { name: 'Mode Analytics', url: 'https://mode.com' }
    ],
    tester: [
      { name: 'Selenium', url: 'https://www.selenium.dev' },
      { name: 'Postman', url: 'https://www.postman.com' },
      { name: 'Jira', url: 'https://www.atlassian.com/software/jira' },
      { name: 'TestRail', url: 'https://www.gurock.com/testrail' },
      { name: 'BrowserStack', url: 'https://www.browserstack.com' },
      { name: 'Appium', url: 'http://appium.io' },
      { name: 'TestLink', url: 'https://testlink.org' }
    ]
  };

  return (
    <div className="job-menu">
      <h3>Полезные ресурсы для {job}:</h3>
      <ul>
        {menuItems[job].map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobMenu;