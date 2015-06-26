var self = require("sdk/self");
var cm = require("sdk/context-menu");
var tabs = require("sdk/tabs");

cm.Item({
  label: "Search this repository",
  context: cm.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
    '  var text = window.getSelection().toString();' +
    '  self.postMessage([text, window.location.href]);' +
    '});',
    onMessage: function (datas) {
      urls = datas[1].split('/');
      if(urls[2] !== 'github.com'){
        tabs.activeTab.attach({
          contentScript:
          "alert('this page is not github')"
        });
        return;
      }
      if(urls.length < 5){
        tabs.activeTab.attach({
          contentScript:
          "alert('this page is not github repository')"
        });
        return;
      }
      if(urls.length >= 4){
        tabs.open({
          url: "http://github.com/"+urls[3]+"/"+urls[4]+"/search?utf8=✓&q="+datas[0]
        });
      }
  }
});

cm.Item({
  label: "Search on github",
  context: cm.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
    '  var text = window.getSelection().toString();' +
    '  self.postMessage([text, window.location.pathname]);' +
    '});',
  onMessage: function (datas) {
    tabs.open({
      url: "http://github.com/search?utf8=✓&q="+datas[0]
    });
  }
});
