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
Space Complexity = O(v + e)

Weighted vs Unweighted graphs (cost of route) - each edge has an associated cost to use

Self-loop: and edge with both it's starting and endpoint on the same vertex

Multi-edge / Parallel Edge: A node that has two or more connections to the same vertices.

Simple graph: a graph with no self-loop or multi-edges. 
  + Maximum number of edges: 
    if |v| = n
    + Directed: then 0 <= n <= n(n-1)
    + Undirected: then 0 <= n <= n(n-1)/2

Dense / Sparse graphs: Refers to the number of edges and it's relation to the maximum or minimum possible edges.
  + Adjacency Matrix: Used for storage of dense graphs.
  + Adjacency List: Used for storage of sparse graphs.

Walk / Path: a sequence of vertices where each adjacent pair is connected by an edge.
  + Simple Path: a walk in which no vertices (and thus no edges) are repeated.
  + Trail: a walk where no edges are repeated.
  + Closed: starts and ends on the same vertex and length of walk > 0 (length of edges).
  + Cycle: a closed walk where there's no repetition of vertex or edges.
    + Acyclic: trees, since the edge would be repeated.
      + DAG: directed acyclic graph.

Connected graph: if there is a path from any vertex to any other vertex (strongly connected for directed).


Note: starting node is called origin and the end is the destination.

#### Web crawlers

A program that systematically navigates the web, which can then be used by search engines to quickly retrieve location and address of websites.

Note: this is a graph traversal, going to each node of graphs.

## Linked Lists

## Trees and Tries (type of graph)

hierarchical tree structure. Each node will have a root value value and a list of references to other nodes, called child nodes. From a graph view, a tree is a directed acyclic graph which has `n` nodes and `n - 1` edges.

Binary tree nodes can have at most two children nodes(left and right child).

Preorder traversal = visit the root first. Then traverse the left subtree and then the right.
  - Use Stack data structure.


In-order traversal = traverse the left subtree first. Then visit the root. Then traverse the right subtree.
  - In a binary search tree, this will generate a sorted order.

Post-order traversal = traverse the left subtree, then the right subtree. Finally reaching the root node.
  - When deleting nodes in a tree, deletion process is post-order (deletes left and right children before the node)

## Stacks

## Queues

## Heaps

## Vectors / ArrayLists

## Hash Tables