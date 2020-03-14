(function () {
  'use strict';
  const env = {"BASE_URL":"https://dev.randomcoffee.us"};

  function isForumNavEvent(e) {
      return e.type === 'forum-navigation';
  }
  function isForumTitleEvent(e) {
      return e.type === 'forum-title';
  }
  const unallowedInsertTags = ["P","SPAN","LI","UL","OL"];
  function insertSmart(what, where) {
    if (unallowedInsertTags.includes(where.parentElement.tagName)) {
      insertSmart(what, where.parentElement);
    } else {
      where.parentElement.insertBefore(what, where);
    }
  }

  (() => {
      const DATA_ATTR = 'data-forum-id';
      const thisScriptTag = document.querySelector(`script[${DATA_ATTR}]`);
      if (!thisScriptTag)
          return; // should not be possible
      const communityID = thisScriptTag.getAttribute(DATA_ATTR);
      if (!communityID) {
          console.error(`${DATA_ATTR} must be defined`);
          return;
      }
      const baseURL = env.BASE_URL;
      const prefixRgx = new RegExp(`^/${communityID}`);
      const forumURL = new URL(baseURL);
      const { pathname, search } = window.location;
      forumURL.pathname = `/${communityID}${pathname}`;
      forumURL.search = search;
      const iframe = document.createElement('iframe');
      iframe.src = forumURL.href;
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.id = 'circles-forum';

      insertSmart(iframe, thisScriptTag);

      document.body.insertBefore(iframe, thisScriptTag);


      const sendMessage = (msg) => {
          const w = iframe.contentWindow;
          if (!w) {
              console.error('no child window');
              return;
          }
          w.postMessage(msg, baseURL);
      };
      window.addEventListener('popstate', () => sendMessage({
          type: 'forum-popstate',
      }));
      window.addEventListener('message', event => {
          if (event.origin !== forumURL.origin) {
              return; // some other window sent this event
          }
          const payload = event.data;
          if (isForumNavEvent(payload)) {
              const location = payload.pathname.replace(prefixRgx, '') + payload.search;
              history.pushState(null, '', location);
              return;
          }
          if (isForumTitleEvent(payload)) {
              document.title = payload.title;
              return;
          }
          if (payload.type === 'forum-ready') {
              const msg = {
                  type: 'forum-referrer',
                  referrer: document.referrer,
              };
              sendMessage(msg);
          }
      });
  })();

}());
//# sourceMappingURL=embed.js.map
