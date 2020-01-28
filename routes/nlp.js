const express = require('express');
const natural = require('natural');
const toLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const stopWord = require('stopword');

const router = express.Router();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

// captures the text from the user 
router.post('/', (req, res, next) => {
  const { text } = req.body;

  //converts contractions into standard lexicon and turns every letter to lowercase
  const lowerCaseText = toLexForm(text).toLowerCase();
  
  //removes special characters. leaves only letters
  const onlyLetters = lowerCaseText.replace(/[^a-zA-z\s]+/g, '');

  //parses to create tokens
  const tokenizer = new natural.WordTokenizer();
  const tokenizedText = tokenizer.tokenize(onlyLetters);

  //spell checks the returned array of words
  tokenizedText.forEach((word, index) => {
    tokenizedText[index] = spellCorrector.correct(word);
  });

  //removes but, a, or etc
  const filteredText = stopWord.removeStopwords(tokenizedText);

  const { SentimentAnalyzer, PorterStemmer } = natural;
  const sentimentAnalyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const sentimentAnalysis = sentimentAnalyzer.getSentiment(filteredText);

  res.status(200).json({ sentimentAnalysis });

  next();
});

module.exports = router; 