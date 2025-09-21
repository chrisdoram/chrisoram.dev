---
title: introduction to rust enums
description: A brief introduction to rust's algebraic sum types.
date: 2025-09-21
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
