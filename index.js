//- The `Ord` is used to define totally ordered datatypes.
//-
//- ```haskell
//- class Eq a => Ord a where
//-     (<=) :: a -> Bool
//-     (<) :: a -> Bool
//-     (<) y =
//-         this.(<=)(y) && this.(!=)(y)
//-     (>=) :: a -> Bool
//-     (>=) y =
//-         this.(==)(y) || ! (this.(<=)(y))
//-     (>) :: a -> Bool
//-     (>) y =
//-         ! (this.(<=)(y))
//-     compare :: a -> Ordering
//-     compare y =
//-         this.(==)(y)
//-             ? EQ
//-             : this.(<=)(y)
//-                 ? LT
//-                 : GT
//-     max :: a -> a
//-     max y =
//-         this.(<=)(y)
//-             ? y
//-             : x
//-     min :: a -> a
//-     min y =
//-         this.(<=)(y)
//-             ? x
//-             : y
//- ```
//-
//- As can be seen it is only necessary to define `(<=)` - using the methods off of `Eq` and `(<=)` it is
//- possible to define the rest of the methods.
//-
//- The constants `LT`, `EQ` and `GT` are defined as
//- ```haskell
//- datatype Ordering = LT | EQ | GT
//- ```

//- Constant value for compare result.
//= LT :: Int
const LT =
    -1;


//- Constant value for compare result.
//= EQ :: Int
const EQ =
    0;


//- Constant value for compare result.
//= GT :: Int
const GT =
    1;


//- Adds all the `Ord` methods onto the passed concrete class.  The only function that it extracts
//- out of the second parameter is `$LESS$EQUAL` - the remaining methods are automatically added.
//= implements :: Eq a -> { $LESS$EQUAL :: a -> a -> Bool } -> Ord a
const extend = concreteClass => operations => {
    concreteClass.prototype.$LESS$EQUAL = function (other) {
        return operations.$LESS$EQUAL(this)(other);
    };
    concreteClass.prototype.$LESS = function (other) {
        return this.$LESS$EQUAL(other) && this.$NOT$EQUAL(other);
    };
    concreteClass.prototype.$GREATER$EQUAL = function (other) {
        return this.$EQUAL$EQUAL(other) || !this.$LESS$EQUAL(other);
    };
    concreteClass.prototype.$GREATER = function (other) {
        return !this.$LESS$EQUAL(other);
    };
    concreteClass.prototype.compare = function (other) {
        return this.$EQUAL$EQUAL(other)
            ? EQ
            : this.$LESS$EQUAL(other)
                ? LT
                : GT;
    };
    concreteClass.prototype.max = function (other) {
        return this.$LESS$EQUAL(other)
            ? other
            : this;
    };
    concreteClass.prototype.min = function (other) {
        return this.$LESS$EQUAL(other)
            ? this
            : other;
    };
};


module.exports = {
    LT,
    EQ,
    GT,
    extend
};