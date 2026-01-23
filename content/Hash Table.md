---
title: Hash Table
draft: false
date: 2025-07-17
tags:
  - programming/data_structures
  - programming/julia
---
A [hash table](https://en.wikipedia.org/wiki/Hash_table) is a data structure that maps keys to values. One of the foundational concepts of the hash table is that it uses a hash function -- a cryptographic function that takes an arbitrary input value and converts it to a large integer -- to compute an index. Hash tables take the pass the *key* in a key-value pair into the hash function to compute the index, and then the *value* in the key-value pair is stored in at this index.

The logic behind the hash table is that, given a key, we can locate an index without having to either:
1. maintain a sorted array of keys, or
2. scanning through the entire array of keys

This is because, if given a key, the hash function can tell us exactly in which index of our array the value associated with that key is located.

When creating a hash table, we need to define the number of *buckets* in the table ahead of time, i.e. the capacity of the table. This capacity is then used in conjunction with the hash function to assign key-value pairs to a bucket in the table by taking the output of the hash function and calculating the index using the modulo operator. For example, in a hash table with a capacity of 10, we might determine the index where a value is assigned via:

```python
capacity = 10
ind = hash("my-key") % capacity
```

One consideration here is that each bucket in a hash table can itself be a vector of key-value pairs. This feature accommodates *hash collisions* -- situations where the hash function assigns a key-value pair to an index that already has a key-value pair assigned to it. 

## Julia Implementation

Here is an implementation of a hash table in [[Julia]]

```julia
# struct to hold generic key-value pairs. note that K and V are defined when we instantiate our hash table

struct KeyValuePair{K,V}
    key::K
    value::V
end
 

# struct to implement the hash table
mutable struct MyHashTable{K,V}
    buckets::Vector{Vector{KeyValuePair{K,V}}}
    capacity::Int
    count::Int
    #note that buckets is a vector of vectors to help handle collisions. If we specified buckets as simply a vector of k-v pairs, then we'd have to overwrite data in the case of a hash collision. By storing a vector of vectors, we can store any collisions in a vector at a given index.

    function MyHashTable{K,V}(capacity::Int) where {K,V}
        if capacity <= 0
            error("Capacity must be positive")
        end
        
        buckets = [Vector{KeyValuePair{K,V}}() for i in 1:capacity]
        return new(buckets, capacity, 0)
    end
end

#helper to create a has table with a default capacity of 10
MyHashTable(capacity::Int=10) = MyHashTable{Any,Any}(capacity)

# methods
#1. hash function
function _get_bucket_index(ht::MyHashTable, key)
    return (hash(key) % ht.capacity) + 1
end
# the hash() function, which is built into Julia, takes a string (or some other input type) and runs it through a cryptographic algorithm that returns a large integer -- the 'hash code'. We can use the modulo operator to divide by the hash table's capacity, then take the remainder (and add 1, so our index is 1-indexed), and use this as the item's index in our hash table 

#2. insert function
function put!(ht::MyHashTable{K,V}, key::K, value::V) where {K,V}
    idx = _get_bucket_index(ht, key)
    b = ht.buckets[idx]  

    #update value if key already exists
    for (i, pair) in enumerate(b)
        if pair.key == key
            b[i] = KeyValuePair(key, value)
            return value
        end
    end  

    #add a new pair to bucket
    push!(b, KeyValuePair(key, value))
    ht.count += 1
    return value
end  

#3. retrieval function
function Base.get(ht::MyHashTable{K,V}, key::K) where {K,V}
    idx = _get_bucket_index(ht, key)
    b = ht.buckets[idx]

    for i in b
        if i.key == key
           return i.value
        end
    end
    
    return nothing #key not found
end  

#4. delete method
# todo
 
#5. length function to get the number of items in the hash table
Base.length(ht::MyHashTable) = ht.count  

# usage -------------
mht = MyHashTable{String,Int}(8)
 
# show initial status
print(mht)
length(mht)

put!(mht, "apple", 10)
```