import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PendingEmails } from './pending-emails';
import { EmailConfirmByCodeBody, EmailConfirmInitBody } from './email-confirm-body';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const pendingEmails: PendingEmails = {

};

app.get('/', (req, res) => {
    res.send({hello: 'welcome to the api'});
});

app.post('/init-email-confirm', (req, res) => {
    if ((req.body as EmailConfirmInitBody).email) {
        const email = (req.body as EmailConfirmInitBody).email;
        if (pendingEmails[email]) {
            res.send({status: 'The code is already generated.', code: pendingEmails[email]});
        } else {
            const code = '123' // TODO: make randome generation
            pendingEmails[email] = code;
            // TODO: send code  to email
            res.send({ status: `The newly genereted code is '${code}' .`}) //  Only in debug sense. Delete later.
        }
    } else {
        res.send('Email not found in the request body');
    }

});

app.post('/confirm-email-by-code', (req, res) => {
    console.log(req.body);
    console.log(pendingEmails)
    const {code, email} = (req.body as EmailConfirmByCodeBody);
    if (code === pendingEmails[email]) {
        res.send({ status: `Ok`});
    } else {
        res.statusCode = 404; // TODO: more complex handle
        res.send({status: 'Code is not right.'});
    }

});

app.listen(5000, () => {
    console.log('The server is listening port 5000');
});