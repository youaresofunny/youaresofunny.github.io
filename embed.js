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
      const DATA_ATTR_ID = 'data-forum-id';
      const DATA_ATTR_PREFIX = 'data-forum-prefix';
      const thisScriptTag = document.querySelector(`script[${DATA_ATTR_ID}]`);
      if (!thisScriptTag)
          return; // should not be possible
      const communityID = thisScriptTag.getAttribute(DATA_ATTR_ID);
      if (!communityID) {
          console.error(`${DATA_ATTR_ID} must be defined`);
          return;
      }
      const prefix = thisScriptTag.getAttribute(DATA_ATTR_PREFIX) || '';
      console.log('PREFIX', prefix);
      const baseURL = env.BASE_URL;
      const prefixRgx = new RegExp(`^/${communityID}`);
      const forumURL = new URL(baseURL);
      const { pathname, search } = window.location;
      const strippedPath = prefix ? pathname.replace(`/${prefix}`, '') : pathname;
      forumURL.pathname = `/${communityID}${strippedPath}`;
      forumURL.search = search;
      const iframe = document.createElement('iframe');
      iframe.src = forumURL.href;
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      insertSmart(iframe, thisScriptTag);

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
              const location = `${payload.pathname.replace(prefixRgx, prefix ? `/${prefix}` : '')}${payload.search}`;
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
