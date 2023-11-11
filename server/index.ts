import express from 'express';
import bodyParser from 'body-parser';
import { PendingEmails } from './pending-emails';
import { EmailConfirmByCodeBody, EmailConfirmInitBody } from './email-confirm-body';

const app = express();
app.use(bodyParser.json());
const pendingEmails: PendingEmails = {

};


app.post('/init-email-confirm', (req, res) => {
    console.log(req.body);
    if ((req.body as EmailConfirmInitBody).email) {
        const email = (req.body as EmailConfirmInitBody).email;
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (pendingEmails[email]) {
            res.send('The code is already generated.');
        } else {
            const code = '123' // TODO: make randome generation
            pendingEmails[email] = code;
            // TODO: send code  to email
            res.send(`The code is '${code}' .`) //  Only in debug sense. Delete later.
        }
    } else {
        res.send('Email not found in the request body');
    }

});

app.post('/confirm-email-by-code', (req, res) => {
    const {code, email} = (req.body as EmailConfirmByCodeBody);
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (code === pendingEmails[email]) {
        res.send('Ok');
    } else {
        res.statusCode = 404;
        res.send('Provided email has not provided code.');
    }

});

app.listen(5000, () => {
    console.log('The server is listening port 5000');
});