'use strict';

const Fs = require("fire-fs");
const Path = require("fire-path");

module.exports = {
  load() {
    // execute when package loaded
  },

  unload() {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open'() {
      // open entry panel registered in package.json
      Editor.Panel.open('creator-utils');
    },
    'addInterface'() {
      let origination = Editor.Package.packagePath("creator-utils");
      let destination = Editor.Project.path;

      // remove
      let destinalFile = Path.join(destination, "cocos_utils.d.ts");
      if (Fs.existsSync(destinalFile)) {
        Fs.removeSync(destinalFile);
        Editor.log("remove cocos_utils.d.ts complete.");
      };

      // copy
      Fs.copySync(Path.join(origination, "release"), destination);

      // Fs.readdirSync(y)["forEach"](A => {
      //   showInfo('copied "' + A + '" to "' + z + '"');
      // });
      Editor.log('add Interface complete!');
    },

    'clicked'() {
      Editor.log('Button clicked!');
      // send ipc message to panel
      Editor.Ipc.sendToPanel('creator-utils', 'creator-utils:addInterface');
    }
  },
};