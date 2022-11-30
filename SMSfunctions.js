import React, { Component } from 'react';
//import Scan from './scan';
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';

class SendSMSContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

     // Function to send message
     sendSMS = () => {
        console.log('sendSMS');
        // alert('clicked');
        SendSMS.send({
            body: 'Nice job Adrian, message sent.',
            recipients: ['2816083214'],
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {
            if (completed) {
                console.log('SMS Sent Completed');
            } else if (cancelled) {
                console.log('SMS Sent Cancelled');
            } else if (error) {
                console.log('Some error occured');
            }
        });
    }

    // Function to read particular message from inbox with id
    getSMS = () => {
        let filter = {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // the next 4 filters should NOT be used together, they are OR-ed so pick one
            read: 0, // 0 for unread SMS, 1 for SMS already read in app
            _id: 1234, // initialize the msg id
            address: '+917691008701', // person sending phone number
            body: 'How are you shadman', // content to match
            // the next 2 filters can be used for pagination
            indexFrom: 0, // start from index 0
            maxCount: 10, // count of SMS to return each time
        };
        SmsAndroid.list(
            JSON.stringify(filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (count, smsList) => {
                console.log('Count: ', count);
                console.log('List: ', smsList);
                var arr = JSON.parse(smsList);

                arr.forEach(function (object) {
                    console.log('Object: ' + object);
                    console.log('-->' + object.date);
                    console.log('-->' + object.body);
                    alert('your message with selected id is --->' + object.body)
                });
            },
        );
    }
/*having problems with importing scan
    render() {
        return (
            <Scan
                sendSMS={this.sendSMS}
                getSMS={this.getSMS}
            />
        );
    }
*/
}

export default SendSMSContainer;