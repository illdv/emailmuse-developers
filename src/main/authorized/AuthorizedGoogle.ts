const querystring = require('querystring');
const http2       = require('http');
const url2        = require('url');
const destroyer   = require('server-destroy');
const { google }  = require('googleapis');

// TODO: Out setting in file.

const scope = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
].join(' ');

const oauth2Client = new google.auth.OAuth2(
  '82810830270-qc10pvb784bs9dfmcmruoklob4l09rnc.apps.googleusercontent.com',
  'VWcJXbwWhPqhRcjN1BTpp09a',
  'http://localhost:3030'
);
google.options({ auth: oauth2Client });

export function generateAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });
}

export async function getOauth2Client() {
  return new Promise((resolve, reject) => {
    const server = http2.createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/?code=4') > -1) {
          const qs = querystring.parse(url2.parse(req.url).query);
          server.destroy();
          const { tokens } = await oauth2Client.getToken(qs.code);
          oauth2Client.setCredentials(tokens);
          resolve(oauth2Client);
        }
      } catch (e) {
        reject(e);
      }
    }).listen(3030);
    destroyer(server);
  });
}