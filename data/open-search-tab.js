var cm = require("sdk/context-menu");
var tabs = require("sdk/tabs");

cm.Item({
    label: "Search in this repository",
    context: cm.SelectionContext(),
    contentScript: 'self.on("click", function () {' +
        '  var text = window.getSelection().toString();' +
        '  self.postMessage(text);' +
        '});',
    onMessage: function (selectionText) {
        console.log(selectionText);
        tabs.open({
            url: "http://github.com/search?utf8=✓&q="+selectionText,
        });
    }
});
