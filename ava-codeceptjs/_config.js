const chromeOptions = {
    args: [
      '--disable-web-security',
      // '--headless',
      '--disable-gpu',
      '--no-sandbox'
    ]
  };
  
module.exports = {
    default: {
      caps: [],
      browser: process.env.TEST_BROWSER || 'chrome',
      timeouts: {
        waitForTimeout: 10000
      },
  
      deviceSettings: {
        type: 'desktop',
        width: 1900,
        height: 2048
      },
  
      chromeOptions
    },
  
  }
  