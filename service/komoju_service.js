const querystring = require("querystring");
const moment = require("moment/moment");
const https = require("https");
const util = require("util");

// your secret_key
var secret_key = 'sk_test_c3wpjat0ijcvwggc6bzrwnzw'

const komojuService = {
    pay: function (request) {
        var auth = 'Basic ' + Buffer.from(secret_key + ':').toString('base64');
        var post_data = querystring.stringify({
            'amount': request.amount,
            'currency': request.currency,
            // like shopify item id
            'external_order_num': request.orderNo,
            'metadata[foobar]': "hoge",
            // payee info
            'payment_details[email]': request.email,
            'payment_details[month]': moment().format('MM'),
            'payment_details[type]': request.type,
            'payment_details[number]': request.number,
            'payment_details[verification_value]': request.verification_value,
            'payment_details[year]': moment().format('YYYY')
        });
        var post_options = {
            host: 'komoju.com',
            port: '443',
            path: '/api/v1/payments',
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Length': Buffer.byteLength(post_data)
            }
        };
        let promise = new Promise((resolve, reject) => {
            let data = null;
            var post_req = https.request(post_options, function (im) {
                im.setEncoding('utf8');
                im.on('data', function (chunk) {
                    data += chunk;
                });
                im.on('error', function (err) {
                    reject(err);
                })
                im.on('end', function () {
                    resolve(data);
                })
            });
            post_req.write(post_data);
            post_req.end();
        })
        return promise;
    }
}
module.exports = komojuService;