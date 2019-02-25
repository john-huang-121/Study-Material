#SQL

## Postgres Index Types

Postgres has 4 different types of indexing.

## Postgres Gin Index (Generalized Inverted Index)

Used in cases where items indexed are composite values, and the query needs to search for element values that appear in the composite items (ie document items and the query is searching for documents containing specific words).
Searches through partial matches on multiple columns or within an array.

