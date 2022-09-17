import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starterr',
  appName: 'PACRO',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      "launchShowDuration": 0
    }
  },
  "cordova": {}
};


export default config;




