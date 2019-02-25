## Graphs

Discrete math: graph theory. A formal way to represent a network. Defined in ordered pair form, where G = (set of vertices, set of edges).

Trees are just restricted types of graphs, just with more rules to follow. A tree will always be a graph, but a graph !=tree.

1) Graph nodes are connected in any way possible, no unidirectional flow.
2) Every graph has to be connected to at least one node.
Note: a graph with just one node is called a singleton graph.

3) Edges, or links, can connect nodes in any possible ways.

Directed Graphs (digraph): Edges with direction or flow. One direction of travel. All edges of the graph are unidirectional.
edge definition, the first of the edge pair is the origin and the second is the destination.

```
v = {v1,v2,v3}
e = {
  (v1, v2),
  (v1, v3),
  (v2, v3)
}
```

Undirected Graphs: Edges with bidirectional flow. All edges are bidirectional

```
v = {v1,v2,v3,v4}
e = { 
  {v1,v2},
  {v1,v3},
  {v1,v4},
  {v2,v4},
  {v2,v5}
  ...
}

```

Weighted vs Unweighted graphs (cost of route) - each edge has an associated cost to use





Note: starting node is called origin and the end is the destination.

#### Web crawlers

A program that systematically navigates the web, which can then be used by search engines to quickly retrieve location and address of websites.

Note: this is a graph traversal, going to each node of graphs.

## Linked Lists

## Trees and Tries (type of graph)

## Stacks

## Queues

## Heaps

## Vectors / ArrayLists

## Hash Tables