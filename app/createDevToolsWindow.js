import React from 'react';
import ReactDOM from 'react-dom';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';


export default function createDevToolsWindow(store) {
  // Window name.
  const name = 'Redux DevTools';

  // Give it a name so it reuses the same window
  const win = window.open(null, name,
      'menubar=no,location=no,resizable=yes,scrollbars=no,status=no,width=450,height=5000');

  // Reload in case it's reusing the same window with the old content.
  win.location.reload();

  // Set visible Window title.
  win.document.title = name;

  // Wait a little bit for it to reload, then render.
  setTimeout(() => ReactDOM.render((
      <DebugPanel top right bottom left>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    ), win.document.body.appendChild(document.createElement('div'))
  ), 10);
}
