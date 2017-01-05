var APP_ID = ""; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var AlexaSkill = require('./AlexaSkill');
var AsciiCode = function () {
    AlexaSkill.call(this, APP_ID);
};

AsciiCode.prototype = Object.create(AlexaSkill.prototype);
AsciiCode.prototype.constructor = AsciiCode;

AsciiCode.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("AsciiCode onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

AsciiCode.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("AsciiCode onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = '<speak>You can ask me to convert any printable ascii character to hex, decimal, octal, or binary!</speak>';
    var repromptText = '<speak>You can say convert character ' + spellOut('B') + ' to hex, or convert character exclamation point to decimal</speak>';
    response.ask(speechOutput, repromptText);
};

AsciiCode.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("AsciiCode onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

AsciiCode.prototype.intentHandlers = {
    "ConvertIntent": function (intent, session, response) {
        var character;
        var speakCharacter;
        var isAlpha = false;
        if (intent.slots.char.value && intent.slots.type.value) {
            speakCharacter = intent.slots.char.value;
            switch (intent.slots.char.value.toLowerCase()) {
                case 'space':
                    character = ' ';
                    break;
                case 'exclamation':
                    character = '!';
                    speakCharacter = 'exclamation point';
                    break;
                case 'double quote':
                    character = '"';
                    break;
                case 'quote':
                    character = '"';
                    speakCharacter = 'double quote';
                    break;
                case 'hash':
                    character = '#';
                    speakCharacter = 'hash mark';
                    break;
                case 'pound':
                    character = '#';
                    speakCharacter = 'pound sign';
                    break;
                case 'dollar':
                    character = '$';
                    speakCharacter = 'dollar sign';
                    break;
                case 'percent':
                    character = '%';
                    speakCharacter = 'percent sign';
                    break;
                case 'ampersand':
                    character = '&';
                    break;
                case 'single quote':
                    character = "'";
                    break;
                case 'apostrophe':
                    character = "'";
                    break;
                case 'left parenthesis':
                    character = '(';
                    break;
                case 'right parenthesis':
                    character = ')';
                    break;
                case 'times':
                    character = '*';
                    speakCharacter = 'times sign';
                    break;
                case 'star':
                    character = '*';
                    break;
                case 'plus':
                    character = '+';
                    speakCharacter = 'plus sign';
                    break;
                case 'comma':
                    character = ',';
                    break;
                case 'minus':
                    character = '-';
                    speakCharacter = 'minus sign';
                    break;
                case 'dash':
                    character = '-';
                    break;
                case 'period':
                    character = '.';
                    break;
                case 'dot':
                    character = '.';
                    break;
                case 'forward slash':
                    character = '/';
                    break;
                case 'slash':
                    character = '/';
                    speakCharacter = 'forward slash';
                    break;
                case 'colon':
                    character = ':';
                    break;
                case 'semicolon':
                    character = ';';
                    break;
                case 'less than':
                    character = '<';
                    break;
                case 'equals':
                    character = '=';
                    speakCharacter = 'equals sign';
                    break;
                case 'greater than':
                    character = '>';
                    break;
                case 'question':
                    character = '?';
                    speakCharacter = 'question mark';
                    break;
                case 'at':
                    character = '@';
                    speakCharacter = 'at symbol';
                    break;
                case 'left bracket':
                    character = '[';
                    break;
                case 'backslash':
                    character = '\\';
                    break;
                case 'right bracket':
                    character = ']';
                    break;
                case 'caret':
                    character = '^';
                    break;
                case 'underscore':
                    character = '_';
                    break;
                case 'tick':
                    character = '`';
                    speakCharacter = 'tick mark';
                    break;
                case 'left brace':
                    character = '{';
                    break;
                case 'pipe':
                    character = '|';
                    break;
                case 'right brace':
                    character = '}';
                    break;
                case 'tilde':
                    character = '~';
                    break;
                default:
                    character = intent.slots.char.value.split('')[0];
                    speakCharacter = spellOut(character);
                    isAlpha = isNaN(character);
                    break;
            }

            if (intent.slots.type.value && intent.slots.type.value === 'hex') {
                var cardTitle = 'Ascii to Hex';
                var upper = character.toUpperCase().charCodeAt(0).toString(16);
                var lower = character.toLowerCase().charCodeAt(0).toString(16);
                var unit = 'hex';
            } else if (intent.slots.type.value && intent.slots.type.value === 'decimal') {
                var cardTitle = 'Ascii to Decimal';
                var upper = character.toUpperCase().charCodeAt(0).toString();
                var lower = character.toLowerCase().charCodeAt(0).toString();
                var unit = 'decimal';
            } else if (intent.slots.type.value && intent.slots.type.value === 'octal') {
                var cardTitle = 'Ascii to Octal';
                var upper = character.toUpperCase().charCodeAt(0).toString(8);
                var lower = character.toLowerCase().charCodeAt(0).toString(8);
                var unit = 'octal';
            } else if (intent.slots.type.value && intent.slots.type.value === 'binary') {
                var cardTitle = 'Ascii to Binary';
                var upper = character.toUpperCase().charCodeAt(0).toString(2);
                var lower = character.toLowerCase().charCodeAt(0).toString(2);
                var unit = 'binary';
            } else {
                var speechOutput = "<speak>I'm sorry I did not understand what conversion you wanted. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal</speak>';
                var repromptText = '<speak>You can say convert character ' + spellOut('B') + ' to hex, or convert character exclamation point to decimal</speak>';
                response.ask(speechOutput, repromptText);
            } 
            
            if (isAlpha) {
                if (intent.slots.case.value) {
                    if (intent.slots.case.value.toLowerCase() === 'uppercase') {
                        var cardText = '"' + character.toUpperCase() + '" is represented as ' + unit + ' value ' + upper;
                        var speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(lower);
                    } else if (intent.slots.case.value.toLowerCase() === 'lowercase') {
                        var cardText = '"' + character.toUpperCase() + '" is represented as ' + unit + ' value ' + upper;
                        var speakText = 'Lowercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(lower);
                    }
                } else {
                    var cardText = 'Uppercase "' + character.toUpperCase() + '" is represented as '+ unit + ' value ' + upper + ' and lowercase is represented as ' + lower;
                    var speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper) + ' and lowercase is represented as ' + spellOut(lower);
                }
            } else {
                var cardText = '"' + character.toUpperCase() + '" is represented as '+ unit + ' value ' + upper;
                var speakText = speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper);
            }
            response.tellWithCard('<speak>' + speakText + '</speak>', cardTitle, cardText);
        } else {
            var speechOutput = "<speak>I'm sorry I did not understand. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal</speak>';
            var repromptText = '<speak>You can say convert character ' + spellOut('B') + ' to hex, or convert character exclamation point to decimal</speak>';
            response.ask(speechOutput, repromptText);
        }
    },
    'AMAZON.StopIntent' : function (intent, session, response) {
        response.tell('');
    }
}

exports.handler = function (event, context) {
    var asciiCode = new AsciiCode();
    asciiCode.execute(event, context);
};

var spellOut = function (text) {
    return '<say-as interpret-as="spell-out">' + text + '</say-as>';
}