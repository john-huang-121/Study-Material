## Regex Cheatsheet

https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285

## Difference between "\\A \\z and ^ $" in Ruby regular expression

If you're depending on the regular expression for validation, you always want to use \A and \z. ^ and $ will only match up until a newline character, which means they could use an email like me@example.com\n<script>dangerous_stuff();</script> and still have it validate, since the regex only sees everything before the \n.

My recommendation would just be completely stripping new lines from a username or email beforehand, since there's pretty much no legitimate reason for one. Then you can safely use EITHER \A \z or ^ $.

```
^ Matches the beginning of a line.

$ Matches the end of a line.

\A Matches the beginning of the string.

\z Matches the end of the string.

\Z Matches the end of the string unless the string ends with a "\n", in which case it matches just before the "\n".
```
