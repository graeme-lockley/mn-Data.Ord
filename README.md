
The `Ord` is used to define totally ordered datatypes.

```haskell
class Eq a => Ord a where
    (<=) :: a -> Bool
    (<) :: a -> Bool
    (<) y =
        this.(<=)(y) && this.(!=)(y)
    (>=) :: a -> Bool
    (>=) y =
        this.(==)(y) || ! (this.(<=)(y))
    (>) :: a -> Bool
    (>) y =
        ! (this.(<=)(y))
    compare :: a -> Ordering
    compare y =
        this.(==)(y)
            ? EQ
            : this.(<=)(y)
                ? LT
                : GT
    max :: a -> a
    max y =
        this.(<=)(y)
            ? y
            : x
    min :: a -> a
    min y =
        this.(<=)(y)
            ? x
            : y
```

As can be seen it is only necessary to define `(<=)` - using the methods off of `Eq` and `(<=)` it is
possible to define the rest of the methods.

The constants `LT`, `EQ` and `GT` are defined as
```haskell
datatype Ordering = LT | EQ | GT
```

### LT

```haskell
LT :: Int
```

Constant value for compare result.

### EQ

```haskell
EQ :: Int
```

Constant value for compare result.

### GT

```haskell
GT :: Int
```

Constant value for compare result.

### implements

```haskell
implements :: Eq a -> { $LESS$EQUAL :: a -> a -> Bool } -> Ord a
```

Adds all the `Ord` methods onto the passed concrete class.  The only function that it extracts
out of the second parameter is `$LESS$EQUAL` - the remaining methods are automatically added.

