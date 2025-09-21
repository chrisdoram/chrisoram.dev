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
