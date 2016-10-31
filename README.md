# Signature Slash Command for Mixmax

## Overview
Make your contact info more then plain text!
Present yourself differently depending on who you're contacting.
If your info such as position, company, or contact change simply change your contact info variables so they automatically update in all emails previously sent! 

![alt tag](https://raw.githubusercontent.com/mkausas/Mixmax-Sig-Command/master/assets/design.png "Design")

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the typeahead URL (to return a JSON list of typeahead results), run:

```
curl http://localhost:9145/typeahead
```

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9145/resolver?text=cats
```
