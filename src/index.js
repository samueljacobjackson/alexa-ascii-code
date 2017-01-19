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
    var speechOutput = '<speak>What would you like me to convert?</speak>';
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
        
        if (intent.slots.phonetic.value){
            character = intent.slots.phonetic.value;
        }
        else if (intent.slots.char.value){
            character = intent.slots.char.value;
        }
        else {
            var speechOutput = "<speak>I'm sorry I did not understand. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
            var repromptText = "<speak>You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
            response.ask(speechOutput, repromptText);
            return;
        }
        
        if (intent.slots.type.value) {
            speakCharacter = character;
            switch (character.toLowerCase()) {
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
                    character = character.split('')[0];
                    speakCharacter = spellOut(character);
                    isAlpha = isNaN(character);
                    break;
            }

            var cardTitle;
            var upper;
            var lower;
            var unit;
            var cardText;
            var speakText;
            var speechOutput;
            var repromptText;
            
            if (intent.slots.type.value && intent.slots.type.value === 'hex') {
                cardTitle = 'Ascii to Hex';
                upper = character.toUpperCase().charCodeAt(0).toString(16);
                lower = character.toLowerCase().charCodeAt(0).toString(16);
                unit = 'hex';
            } else if (intent.slots.type.value && intent.slots.type.value === 'decimal') {
                cardTitle = 'Ascii to Decimal';
                upper = character.toUpperCase().charCodeAt(0).toString();
                lower = character.toLowerCase().charCodeAt(0).toString();
                unit = 'decimal';
            } else if (intent.slots.type.value && intent.slots.type.value === 'octal') {
                cardTitle = 'Ascii to Octal';
                upper = character.toUpperCase().charCodeAt(0).toString(8);
                lower = character.toLowerCase().charCodeAt(0).toString(8);
                unit = 'octal';
            } else if (intent.slots.type.value && intent.slots.type.value === 'binary') {
                cardTitle = 'Ascii to Binary';
                upper = character.toUpperCase().charCodeAt(0).toString(2);
                lower = character.toLowerCase().charCodeAt(0).toString(2);
                unit = 'binary';
            } else {
                speechOutput = "<speak>I'm sorry I did not understand what conversion you wanted. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. WHat would you like to convert?</speak>';
                repromptText = "<speak>You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
                response.tell(speechOutput, repromptText);
            } 
            
            if (isAlpha) {
                if (intent.slots.case.value) {
                    if (intent.slots.case.value.toLowerCase() === 'uppercase' || intent.slots.case.value.toLowerCase() === 'upper case') {
                        cardText = '"' + character.toUpperCase() + '" is represented as ' + unit + ' value ' + upper;
                        speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper);
                    } else if (intent.slots.case.value.toLowerCase() === 'lowercase' || intent.slots.case.value.toLowerCase() === 'lower case') {
                        cardText = '"' + character.toLowerCase() + '" is represented as ' + unit + ' value ' + lower;
                        speakText = 'Lowercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(lower);
                    }
                } else {
                    cardText = 'Uppercase "' + character.toUpperCase() + '" is represented as '+ unit + ' value ' + upper + ' and lowercase is represented as ' + lower;
                    speakText = 'Uppercase ' + speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper) + ' and lowercase is represented as ' + spellOut(lower);
                }
            } else {
                cardText = '"' + character.toUpperCase() + '" is represented as '+ unit + ' value ' + upper;
                speakText = speakCharacter + ' is represented as ' + unit + ' value ' + spellOut(upper);
            }
            response.tellWithCard('<speak>' + speakText + '</speak>', cardTitle, cardText);
        } else {
            speechOutput = "<speak>I'm sorry I did not understand. You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
            repromptText = "<speak>You can say convert character " + spellOut('B') + ' to hex, or convert character exclamation point to decimal. What would you like to convert?</speak>';
            response.ask(speechOutput, repromptText);
        }
    },
    'AMAZON.HelpIntent' : function (intent, session, response) {
        var speechOutput = '<speak>You may ask me to convert any printable ascii character to hex, binary, decimal or octal. for example to convert character ' + spellOut('Y') + ' to hex just say, convert ' + spellOut('Y') + ' to hex. What would you like to convert?</speak>';
        var repromptText = '<speak>You may ask me to convert any printable ascii character to hex, binary, decimal or octal. for example to convert character ' + spellOut('Y') + ' to hex just say, convert ' + spellOut('Y') + ' to hex. What would you like to convert?</speak>';
        response.ask(speechOutput, repromptText);
    },
    'AMAZON.StopIntent' : function (intent, session, response) {
        response.tell('');
    },
    'AMAZON.CancelIntent' : function (intent, session, response) {
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