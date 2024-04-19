    function redactContent() {
        let startTime = performance.now();
        let content = document.getElementById('content').value;
        let redactedWords = document.getElementById('redacted').value.split(' ');
        let replacementOption = document.getElementById('redact').value;
        let redactedContent = content;
        let wordsScanned = 0;
        let wordsMatched = 0;
        let charactersRedacted = 0;

        redactedWords.forEach(function(word) {
            let regex = new RegExp(word.trim(), 'gi');
            let matches = redactedContent.match(regex);
            if (matches) {
                wordsMatched++;
                charactersRedacted += matches.reduce((total, match) => total + match.length, 0);
                redactedContent = redactedContent.replace(regex, replacementOption.repeat(word.length));
            }
            wordsScanned++;
        });

        let endTime = performance.now();
        let timeTaken = (endTime - startTime) / 1000;

        let statsHTML = '<strong>Stats:</strong><br>';
        statsHTML += 'Words scanned: ' + wordsScanned + '<br>';
        statsHTML += 'Words matched for redaction: ' + wordsMatched + '<br>';
        statsHTML += 'Total characters redacted: ' + charactersRedacted + '<br>';
        statsHTML += 'Time taken: ' + timeTaken.toFixed(2) + ' seconds';

        document.getElementById('redactedContent').innerHTML = '<strong>Original Content:</strong><br>' + content + '<br><br><strong>Redacted Content:</strong><br>' + redactedContent;
        document.getElementById('stats').innerHTML = statsHTML;
    }

    function resetForm() {
        document.getElementById('redactForm').reset();
        document.getElementById('redactedContent').innerText = '';
        document.getElementById('stats').innerText = '';
    }
