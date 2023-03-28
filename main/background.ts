import {app, BrowserWindow} from 'electron';
import serve from 'electron-serve';
import {createWindow} from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
    serve({directory: 'app'});
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
    });

    if (isProd) {
        await mainWindow.loadURL('app://./home.html');
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
        mainWindow.webContents.openDevTools();
    }

    enableWebSerialApi(mainWindow)
})();

app.on('window-all-closed', () => {
    app.quit();
});

async function enableWebSerialApi(mainWindow: BrowserWindow) {
    mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {

        //Add listeners to handle ports being added or removed before the callback for `select-serial-port`
        //is called.
        mainWindow.webContents.session.on('serial-port-added', (event, port) => {
            console.log('serial-port-added FIRED WITH', port)
            //Optionally update portList to add the new port
        })

        mainWindow.webContents.session.on('serial-port-removed', (event, port) => {
            console.log('serial-port-removed FIRED WITH', port)
            //Optionally update portList to remove the port
        })

        event.preventDefault()
        if (portList && portList.length > 0) {
            callback(portList[0].portId)
        } else {
            callback('') //Could not find any matching devices
        }
    })
}