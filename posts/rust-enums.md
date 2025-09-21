---
title: introduction to rust enums
desription: A breif introduction to rust's algebraic sum types.
date: 21-09-2025
tags:
  - rust
  - types
---
# Introduction to Rust enums

Rust enums are cool!

## A weekday enum

```rust
#[repr(u8)]
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}
```
