export class Result<T, E = string> {
  private _error: E | null;
  private _value: T | null;

  constructor(value: T | null, error?: E) {
    this._error = error ?? null;
    this._value = value;

    if (!!error && !!value) {
      throw new Error(
        //developer error, this really should be thrown
        "InvalidOperation: A result cannot have both an error and a value.",
      );
    }

    //response cannot be mutated
    Object.freeze(this);
  }

  //Using this type, typescript will assume that if this function return trues, then everything
  //above on the code will match the Result<T, null> type.
  isSuccess = (): this is Result<T, null> => {
    return this._error === null;
  };

  //Using this type, typescript will assume that if this function return trues, then everything
  //above on the code will match the Result<null, E> type.
  isFailure = (): this is Result<null, E> => {
    return this._error !== null;
  };

  get value(): T {
    if (this._value === null) {
      //developer error, this really should be thrown
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this._value;
  }

  get error(): E {
    if (!this._error) {
      //developer error, this really should be thrown
      throw new Error(
        "Can't get the error of a success result. Use 'value' instead.",
      );
    }

    return this._error;
  }

  static ok<U>(value: U): Result<U, null> {
    return new Result<U, null>(value || null);
  }

  static fail<U>(error: U): Result<null, U> {
    return new Result<null, U>(null, error);
  }
}

export type Either<T, E> = NonNullable<Result<T, null> | Result<null, E>>;
