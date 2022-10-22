
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: string
  username: string
  email: string
  plan: PLAN
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Page
 * 
 */
export type Page = {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model PageEntry
 * 
 */
export type PageEntry = {
  id: string
  linkId: string | null
  blogId: string | null
  pageId: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Link
 * 
 */
export type Link = {
  id: string
  displayText: string
  link: string
  mediaUrl: string | null
  entryAnalyticsId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Blog
 * 
 */
export type Blog = {
  id: string
  name: string
  rating: number | null
  location: string | null
  externalLink: string | null
  entryAnalyticsId: string
  mediaUrl: string | null
  lifetimeClicks: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model EntryAnalytics
 * 
 */
export type EntryAnalytics = {
  id: string
  lifetimeClicks: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const PLAN: {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM'
};

export type PLAN = (typeof PLAN)[keyof typeof PLAN]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<GlobalReject>;

  /**
   * `prisma.pageEntry`: Exposes CRUD operations for the **PageEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PageEntries
    * const pageEntries = await prisma.pageEntry.findMany()
    * ```
    */
  get pageEntry(): Prisma.PageEntryDelegate<GlobalReject>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<GlobalReject>;

  /**
   * `prisma.blog`: Exposes CRUD operations for the **Blog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blogs
    * const blogs = await prisma.blog.findMany()
    * ```
    */
  get blog(): Prisma.BlogDelegate<GlobalReject>;

  /**
   * `prisma.entryAnalytics`: Exposes CRUD operations for the **EntryAnalytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntryAnalytics
    * const entryAnalytics = await prisma.entryAnalytics.findMany()
    * ```
    */
  get entryAnalytics(): Prisma.EntryAnalyticsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = runtime.Extension 

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Page: 'Page',
    PageEntry: 'PageEntry',
    Link: 'Link',
    Blog: 'Blog',
    EntryAnalytics: 'EntryAnalytics'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    page: number
  }

  export type UserCountOutputTypeSelect = {
    page?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type PageCountOutputType
   */


  export type PageCountOutputType = {
    pageEntries: number
  }

  export type PageCountOutputTypeSelect = {
    pageEntries?: boolean
  }

  export type PageCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PageCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PageCountOutputType
    : S extends undefined
    ? never
    : S extends PageCountOutputTypeArgs
    ?'include' extends U
    ? PageCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PageCountOutputType ? PageCountOutputType[P] : never
  } 
    : PageCountOutputType
  : PageCountOutputType




  // Custom InputTypes

  /**
   * PageCountOutputType without action
   */
  export type PageCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PageCountOutputType
     * 
    **/
    select?: PageCountOutputTypeSelect | null
  }



  /**
   * Count Type LinkCountOutputType
   */


  export type LinkCountOutputType = {
    pageEntry: number
  }

  export type LinkCountOutputTypeSelect = {
    pageEntry?: boolean
  }

  export type LinkCountOutputTypeGetPayload<
    S extends boolean | null | undefined | LinkCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? LinkCountOutputType
    : S extends undefined
    ? never
    : S extends LinkCountOutputTypeArgs
    ?'include' extends U
    ? LinkCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof LinkCountOutputType ? LinkCountOutputType[P] : never
  } 
    : LinkCountOutputType
  : LinkCountOutputType




  // Custom InputTypes

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LinkCountOutputType
     * 
    **/
    select?: LinkCountOutputTypeSelect | null
  }



  /**
   * Count Type BlogCountOutputType
   */


  export type BlogCountOutputType = {
    pageEntry: number
  }

  export type BlogCountOutputTypeSelect = {
    pageEntry?: boolean
  }

  export type BlogCountOutputTypeGetPayload<
    S extends boolean | null | undefined | BlogCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? BlogCountOutputType
    : S extends undefined
    ? never
    : S extends BlogCountOutputTypeArgs
    ?'include' extends U
    ? BlogCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof BlogCountOutputType ? BlogCountOutputType[P] : never
  } 
    : BlogCountOutputType
  : BlogCountOutputType




  // Custom InputTypes

  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the BlogCountOutputType
     * 
    **/
    select?: BlogCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    plan: PLAN | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    plan: PLAN | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    plan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    plan: PLAN
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    username?: boolean
    email?: boolean
    plan?: boolean
    page?: boolean | PageFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    page?: boolean | PageFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'page' ? Array < PageGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'page' ? Array < PageGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    page<T extends PageFindManyArgs = {}>(args?: Subset<T, PageFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Page>| Null>, PrismaPromise<Array<PageGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Page
   */


  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageAggregateArgs = {
    /**
     * Filter which Page to aggregate.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs = {
    where?: PageWhereInput
    orderBy?: Enumerable<PageOrderByWithAggregationInput>
    by: Array<PageScalarFieldEnum>
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }


  export type PageGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect = {
    id?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    pageEntries?: boolean | PageEntryFindManyArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | PageCountOutputTypeArgs
  }

  export type PageInclude = {
    user?: boolean | UserArgs
    pageEntries?: boolean | PageEntryFindManyArgs
    _count?: boolean | PageCountOutputTypeArgs
  }

  export type PageGetPayload<
    S extends boolean | null | undefined | PageArgs,
    U = keyof S
      > = S extends true
        ? Page
    : S extends undefined
    ? never
    : S extends PageArgs | PageFindManyArgs
    ?'include' extends U
    ? Page  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'pageEntries' ? Array < PageEntryGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? PageCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'pageEntries' ? Array < PageEntryGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? PageCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Page ? Page[P] : never
  } 
    : Page
  : Page


  type PageCountArgs = Merge<
    Omit<PageFindManyArgs, 'select' | 'include'> & {
      select?: PageCountAggregateInputType | true
    }
  >

  export interface PageDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PageFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PageFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Page'> extends True ? CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>> : CheckSelect<T, Prisma__PageClient<Page | null, null>, Prisma__PageClient<PageGetPayload<T> | null, null>>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PageFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PageFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Page'> extends True ? CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>> : CheckSelect<T, Prisma__PageClient<Page | null, null>, Prisma__PageClient<PageGetPayload<T> | null, null>>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PageFindManyArgs>(
      args?: SelectSubset<T, PageFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Page>>, PrismaPromise<Array<PageGetPayload<T>>>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
    **/
    create<T extends PageCreateArgs>(
      args: SelectSubset<T, PageCreateArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Create many Pages.
     *     @param {PageCreateManyArgs} args - Arguments to create many Pages.
     *     @example
     *     // Create many Pages
     *     const page = await prisma.page.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PageCreateManyArgs>(
      args?: SelectSubset<T, PageCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
    **/
    delete<T extends PageDeleteArgs>(
      args: SelectSubset<T, PageDeleteArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PageUpdateArgs>(
      args: SelectSubset<T, PageUpdateArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PageDeleteManyArgs>(
      args?: SelectSubset<T, PageDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PageUpdateManyArgs>(
      args: SelectSubset<T, PageUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
    **/
    upsert<T extends PageUpsertArgs>(
      args: SelectSubset<T, PageUpsertArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Find one Page that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PageFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Find the first Page that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PageFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PageClient<Page>, Prisma__PageClient<PageGetPayload<T>>>

    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PageClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    pageEntries<T extends PageEntryFindManyArgs = {}>(args?: Subset<T, PageEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PageEntry>| Null>, PrismaPromise<Array<PageEntryGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Page base type for findUnique actions
   */
  export type PageFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Page to fetch.
     * 
    **/
    where: PageWhereUniqueInput
  }

  /**
   * Page: findUnique
   */
  export interface PageFindUniqueArgs extends PageFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page base type for findFirst actions
   */
  export type PageFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Page to fetch.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     * 
    **/
    distinct?: Enumerable<PageScalarFieldEnum>
  }

  /**
   * Page: findFirst
   */
  export interface PageFindFirstArgs extends PageFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Page findMany
   */
  export type PageFindManyArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter, which Pages to fetch.
     * 
    **/
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     * 
    **/
    orderBy?: Enumerable<PageOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     * 
    **/
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PageScalarFieldEnum>
  }


  /**
   * Page create
   */
  export type PageCreateArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The data needed to create a Page.
     * 
    **/
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }


  /**
   * Page createMany
   */
  export type PageCreateManyArgs = {
    /**
     * The data used to create many Pages.
     * 
    **/
    data: Enumerable<PageCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Page update
   */
  export type PageUpdateArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The data needed to update a Page.
     * 
    **/
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     * 
    **/
    where: PageWhereUniqueInput
  }


  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs = {
    /**
     * The data used to update Pages.
     * 
    **/
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     * 
    **/
    where?: PageWhereInput
  }


  /**
   * Page upsert
   */
  export type PageUpsertArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * The filter to search for the Page to update in case it exists.
     * 
    **/
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     * 
    **/
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }


  /**
   * Page delete
   */
  export type PageDeleteArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
    /**
     * Filter which Page to delete.
     * 
    **/
    where: PageWhereUniqueInput
  }


  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs = {
    /**
     * Filter which Pages to delete
     * 
    **/
    where?: PageWhereInput
  }


  /**
   * Page: findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs = PageFindUniqueArgsBase
      

  /**
   * Page: findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs = PageFindFirstArgsBase
      

  /**
   * Page without action
   */
  export type PageArgs = {
    /**
     * Select specific fields to fetch from the Page
     * 
    **/
    select?: PageSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageInclude | null
  }



  /**
   * Model PageEntry
   */


  export type AggregatePageEntry = {
    _count: PageEntryCountAggregateOutputType | null
    _min: PageEntryMinAggregateOutputType | null
    _max: PageEntryMaxAggregateOutputType | null
  }

  export type PageEntryMinAggregateOutputType = {
    id: string | null
    linkId: string | null
    blogId: string | null
    pageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageEntryMaxAggregateOutputType = {
    id: string | null
    linkId: string | null
    blogId: string | null
    pageId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PageEntryCountAggregateOutputType = {
    id: number
    linkId: number
    blogId: number
    pageId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PageEntryMinAggregateInputType = {
    id?: true
    linkId?: true
    blogId?: true
    pageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageEntryMaxAggregateInputType = {
    id?: true
    linkId?: true
    blogId?: true
    pageId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PageEntryCountAggregateInputType = {
    id?: true
    linkId?: true
    blogId?: true
    pageId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PageEntryAggregateArgs = {
    /**
     * Filter which PageEntry to aggregate.
     * 
    **/
    where?: PageEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<PageEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PageEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageEntries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PageEntries
    **/
    _count?: true | PageEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageEntryMaxAggregateInputType
  }

  export type GetPageEntryAggregateType<T extends PageEntryAggregateArgs> = {
        [P in keyof T & keyof AggregatePageEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePageEntry[P]>
      : GetScalarType<T[P], AggregatePageEntry[P]>
  }




  export type PageEntryGroupByArgs = {
    where?: PageEntryWhereInput
    orderBy?: Enumerable<PageEntryOrderByWithAggregationInput>
    by: Array<PageEntryScalarFieldEnum>
    having?: PageEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageEntryCountAggregateInputType | true
    _min?: PageEntryMinAggregateInputType
    _max?: PageEntryMaxAggregateInputType
  }


  export type PageEntryGroupByOutputType = {
    id: string
    linkId: string | null
    blogId: string | null
    pageId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PageEntryCountAggregateOutputType | null
    _min: PageEntryMinAggregateOutputType | null
    _max: PageEntryMaxAggregateOutputType | null
  }

  type GetPageEntryGroupByPayload<T extends PageEntryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PageEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageEntryGroupByOutputType[P]>
            : GetScalarType<T[P], PageEntryGroupByOutputType[P]>
        }
      >
    >


  export type PageEntrySelect = {
    id?: boolean
    linkId?: boolean
    blogId?: boolean
    link?: boolean | LinkArgs
    blog?: boolean | BlogArgs
    Page?: boolean | PageArgs
    pageId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PageEntryInclude = {
    link?: boolean | LinkArgs
    blog?: boolean | BlogArgs
    Page?: boolean | PageArgs
  }

  export type PageEntryGetPayload<
    S extends boolean | null | undefined | PageEntryArgs,
    U = keyof S
      > = S extends true
        ? PageEntry
    : S extends undefined
    ? never
    : S extends PageEntryArgs | PageEntryFindManyArgs
    ?'include' extends U
    ? PageEntry  & {
    [P in TrueKeys<S['include']>]:
        P extends 'link' ? LinkGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'blog' ? BlogGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'Page' ? PageGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'link' ? LinkGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'blog' ? BlogGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'Page' ? PageGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof PageEntry ? PageEntry[P] : never
  } 
    : PageEntry
  : PageEntry


  type PageEntryCountArgs = Merge<
    Omit<PageEntryFindManyArgs, 'select' | 'include'> & {
      select?: PageEntryCountAggregateInputType | true
    }
  >

  export interface PageEntryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one PageEntry that matches the filter.
     * @param {PageEntryFindUniqueArgs} args - Arguments to find a PageEntry
     * @example
     * // Get one PageEntry
     * const pageEntry = await prisma.pageEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PageEntryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PageEntryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PageEntry'> extends True ? CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>> : CheckSelect<T, Prisma__PageEntryClient<PageEntry | null, null>, Prisma__PageEntryClient<PageEntryGetPayload<T> | null, null>>

    /**
     * Find the first PageEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryFindFirstArgs} args - Arguments to find a PageEntry
     * @example
     * // Get one PageEntry
     * const pageEntry = await prisma.pageEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PageEntryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PageEntryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PageEntry'> extends True ? CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>> : CheckSelect<T, Prisma__PageEntryClient<PageEntry | null, null>, Prisma__PageEntryClient<PageEntryGetPayload<T> | null, null>>

    /**
     * Find zero or more PageEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PageEntries
     * const pageEntries = await prisma.pageEntry.findMany()
     * 
     * // Get first 10 PageEntries
     * const pageEntries = await prisma.pageEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageEntryWithIdOnly = await prisma.pageEntry.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PageEntryFindManyArgs>(
      args?: SelectSubset<T, PageEntryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PageEntry>>, PrismaPromise<Array<PageEntryGetPayload<T>>>>

    /**
     * Create a PageEntry.
     * @param {PageEntryCreateArgs} args - Arguments to create a PageEntry.
     * @example
     * // Create one PageEntry
     * const PageEntry = await prisma.pageEntry.create({
     *   data: {
     *     // ... data to create a PageEntry
     *   }
     * })
     * 
    **/
    create<T extends PageEntryCreateArgs>(
      args: SelectSubset<T, PageEntryCreateArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Create many PageEntries.
     *     @param {PageEntryCreateManyArgs} args - Arguments to create many PageEntries.
     *     @example
     *     // Create many PageEntries
     *     const pageEntry = await prisma.pageEntry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PageEntryCreateManyArgs>(
      args?: SelectSubset<T, PageEntryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PageEntry.
     * @param {PageEntryDeleteArgs} args - Arguments to delete one PageEntry.
     * @example
     * // Delete one PageEntry
     * const PageEntry = await prisma.pageEntry.delete({
     *   where: {
     *     // ... filter to delete one PageEntry
     *   }
     * })
     * 
    **/
    delete<T extends PageEntryDeleteArgs>(
      args: SelectSubset<T, PageEntryDeleteArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Update one PageEntry.
     * @param {PageEntryUpdateArgs} args - Arguments to update one PageEntry.
     * @example
     * // Update one PageEntry
     * const pageEntry = await prisma.pageEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PageEntryUpdateArgs>(
      args: SelectSubset<T, PageEntryUpdateArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Delete zero or more PageEntries.
     * @param {PageEntryDeleteManyArgs} args - Arguments to filter PageEntries to delete.
     * @example
     * // Delete a few PageEntries
     * const { count } = await prisma.pageEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PageEntryDeleteManyArgs>(
      args?: SelectSubset<T, PageEntryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PageEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PageEntries
     * const pageEntry = await prisma.pageEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PageEntryUpdateManyArgs>(
      args: SelectSubset<T, PageEntryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PageEntry.
     * @param {PageEntryUpsertArgs} args - Arguments to update or create a PageEntry.
     * @example
     * // Update or create a PageEntry
     * const pageEntry = await prisma.pageEntry.upsert({
     *   create: {
     *     // ... data to create a PageEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PageEntry we want to update
     *   }
     * })
    **/
    upsert<T extends PageEntryUpsertArgs>(
      args: SelectSubset<T, PageEntryUpsertArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Find one PageEntry that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PageEntryFindUniqueOrThrowArgs} args - Arguments to find a PageEntry
     * @example
     * // Get one PageEntry
     * const pageEntry = await prisma.pageEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PageEntryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PageEntryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Find the first PageEntry that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryFindFirstOrThrowArgs} args - Arguments to find a PageEntry
     * @example
     * // Get one PageEntry
     * const pageEntry = await prisma.pageEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PageEntryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PageEntryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PageEntryClient<PageEntry>, Prisma__PageEntryClient<PageEntryGetPayload<T>>>

    /**
     * Count the number of PageEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryCountArgs} args - Arguments to filter PageEntries to count.
     * @example
     * // Count the number of PageEntries
     * const count = await prisma.pageEntry.count({
     *   where: {
     *     // ... the filter for the PageEntries we want to count
     *   }
     * })
    **/
    count<T extends PageEntryCountArgs>(
      args?: Subset<T, PageEntryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PageEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageEntryAggregateArgs>(args: Subset<T, PageEntryAggregateArgs>): PrismaPromise<GetPageEntryAggregateType<T>>

    /**
     * Group by PageEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageEntryGroupByArgs['orderBy'] }
        : { orderBy?: PageEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageEntryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PageEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PageEntryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    link<T extends LinkArgs = {}>(args?: Subset<T, LinkArgs>): CheckSelect<T, Prisma__LinkClient<Link | Null>, Prisma__LinkClient<LinkGetPayload<T> | Null>>;

    blog<T extends BlogArgs = {}>(args?: Subset<T, BlogArgs>): CheckSelect<T, Prisma__BlogClient<Blog | Null>, Prisma__BlogClient<BlogGetPayload<T> | Null>>;

    Page<T extends PageArgs = {}>(args?: Subset<T, PageArgs>): CheckSelect<T, Prisma__PageClient<Page | Null>, Prisma__PageClient<PageGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PageEntry base type for findUnique actions
   */
  export type PageEntryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * Filter, which PageEntry to fetch.
     * 
    **/
    where: PageEntryWhereUniqueInput
  }

  /**
   * PageEntry: findUnique
   */
  export interface PageEntryFindUniqueArgs extends PageEntryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PageEntry base type for findFirst actions
   */
  export type PageEntryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * Filter, which PageEntry to fetch.
     * 
    **/
    where?: PageEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<PageEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PageEntries.
     * 
    **/
    cursor?: PageEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageEntries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PageEntries.
     * 
    **/
    distinct?: Enumerable<PageEntryScalarFieldEnum>
  }

  /**
   * PageEntry: findFirst
   */
  export interface PageEntryFindFirstArgs extends PageEntryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PageEntry findMany
   */
  export type PageEntryFindManyArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * Filter, which PageEntries to fetch.
     * 
    **/
    where?: PageEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PageEntries to fetch.
     * 
    **/
    orderBy?: Enumerable<PageEntryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PageEntries.
     * 
    **/
    cursor?: PageEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PageEntries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PageEntries.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PageEntryScalarFieldEnum>
  }


  /**
   * PageEntry create
   */
  export type PageEntryCreateArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * The data needed to create a PageEntry.
     * 
    **/
    data: XOR<PageEntryCreateInput, PageEntryUncheckedCreateInput>
  }


  /**
   * PageEntry createMany
   */
  export type PageEntryCreateManyArgs = {
    /**
     * The data used to create many PageEntries.
     * 
    **/
    data: Enumerable<PageEntryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PageEntry update
   */
  export type PageEntryUpdateArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * The data needed to update a PageEntry.
     * 
    **/
    data: XOR<PageEntryUpdateInput, PageEntryUncheckedUpdateInput>
    /**
     * Choose, which PageEntry to update.
     * 
    **/
    where: PageEntryWhereUniqueInput
  }


  /**
   * PageEntry updateMany
   */
  export type PageEntryUpdateManyArgs = {
    /**
     * The data used to update PageEntries.
     * 
    **/
    data: XOR<PageEntryUpdateManyMutationInput, PageEntryUncheckedUpdateManyInput>
    /**
     * Filter which PageEntries to update
     * 
    **/
    where?: PageEntryWhereInput
  }


  /**
   * PageEntry upsert
   */
  export type PageEntryUpsertArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * The filter to search for the PageEntry to update in case it exists.
     * 
    **/
    where: PageEntryWhereUniqueInput
    /**
     * In case the PageEntry found by the `where` argument doesn't exist, create a new PageEntry with this data.
     * 
    **/
    create: XOR<PageEntryCreateInput, PageEntryUncheckedCreateInput>
    /**
     * In case the PageEntry was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PageEntryUpdateInput, PageEntryUncheckedUpdateInput>
  }


  /**
   * PageEntry delete
   */
  export type PageEntryDeleteArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
    /**
     * Filter which PageEntry to delete.
     * 
    **/
    where: PageEntryWhereUniqueInput
  }


  /**
   * PageEntry deleteMany
   */
  export type PageEntryDeleteManyArgs = {
    /**
     * Filter which PageEntries to delete
     * 
    **/
    where?: PageEntryWhereInput
  }


  /**
   * PageEntry: findUniqueOrThrow
   */
  export type PageEntryFindUniqueOrThrowArgs = PageEntryFindUniqueArgsBase
      

  /**
   * PageEntry: findFirstOrThrow
   */
  export type PageEntryFindFirstOrThrowArgs = PageEntryFindFirstArgsBase
      

  /**
   * PageEntry without action
   */
  export type PageEntryArgs = {
    /**
     * Select specific fields to fetch from the PageEntry
     * 
    **/
    select?: PageEntrySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PageEntryInclude | null
  }



  /**
   * Model Link
   */


  export type AggregateLink = {
    _count: LinkCountAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  export type LinkMinAggregateOutputType = {
    id: string | null
    displayText: string | null
    link: string | null
    mediaUrl: string | null
    entryAnalyticsId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LinkMaxAggregateOutputType = {
    id: string | null
    displayText: string | null
    link: string | null
    mediaUrl: string | null
    entryAnalyticsId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LinkCountAggregateOutputType = {
    id: number
    displayText: number
    link: number
    mediaUrl: number
    entryAnalyticsId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LinkMinAggregateInputType = {
    id?: true
    displayText?: true
    link?: true
    mediaUrl?: true
    entryAnalyticsId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LinkMaxAggregateInputType = {
    id?: true
    displayText?: true
    link?: true
    mediaUrl?: true
    entryAnalyticsId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LinkCountAggregateInputType = {
    id?: true
    displayText?: true
    link?: true
    mediaUrl?: true
    entryAnalyticsId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LinkAggregateArgs = {
    /**
     * Filter which Link to aggregate.
     * 
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     * 
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    _count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
        [P in keyof T & keyof AggregateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }




  export type LinkGroupByArgs = {
    where?: LinkWhereInput
    orderBy?: Enumerable<LinkOrderByWithAggregationInput>
    by: Array<LinkScalarFieldEnum>
    having?: LinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkCountAggregateInputType | true
    _min?: LinkMinAggregateInputType
    _max?: LinkMaxAggregateInputType
  }


  export type LinkGroupByOutputType = {
    id: string
    displayText: string
    link: string
    mediaUrl: string | null
    entryAnalyticsId: string
    createdAt: Date
    updatedAt: Date
    _count: LinkCountAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  type GetLinkGroupByPayload<T extends LinkGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkGroupByOutputType[P]>
            : GetScalarType<T[P], LinkGroupByOutputType[P]>
        }
      >
    >


  export type LinkSelect = {
    id?: boolean
    displayText?: boolean
    link?: boolean
    pageEntry?: boolean | PageEntryFindManyArgs
    mediaUrl?: boolean
    entryAnalyticsId?: boolean
    entryAnalytics?: boolean | EntryAnalyticsArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | LinkCountOutputTypeArgs
  }

  export type LinkInclude = {
    pageEntry?: boolean | PageEntryFindManyArgs
    entryAnalytics?: boolean | EntryAnalyticsArgs
    _count?: boolean | LinkCountOutputTypeArgs
  }

  export type LinkGetPayload<
    S extends boolean | null | undefined | LinkArgs,
    U = keyof S
      > = S extends true
        ? Link
    : S extends undefined
    ? never
    : S extends LinkArgs | LinkFindManyArgs
    ?'include' extends U
    ? Link  & {
    [P in TrueKeys<S['include']>]:
        P extends 'pageEntry' ? Array < PageEntryGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'entryAnalytics' ? EntryAnalyticsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends '_count' ? LinkCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'pageEntry' ? Array < PageEntryGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'entryAnalytics' ? EntryAnalyticsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends '_count' ? LinkCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Link ? Link[P] : never
  } 
    : Link
  : Link


  type LinkCountArgs = Merge<
    Omit<LinkFindManyArgs, 'select' | 'include'> & {
      select?: LinkCountAggregateInputType | true
    }
  >

  export interface LinkDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LinkFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LinkFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Link'> extends True ? CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>> : CheckSelect<T, Prisma__LinkClient<Link | null, null>, Prisma__LinkClient<LinkGetPayload<T> | null, null>>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LinkFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LinkFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Link'> extends True ? CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>> : CheckSelect<T, Prisma__LinkClient<Link | null, null>, Prisma__LinkClient<LinkGetPayload<T> | null, null>>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LinkFindManyArgs>(
      args?: SelectSubset<T, LinkFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Link>>, PrismaPromise<Array<LinkGetPayload<T>>>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
    **/
    create<T extends LinkCreateArgs>(
      args: SelectSubset<T, LinkCreateArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Create many Links.
     *     @param {LinkCreateManyArgs} args - Arguments to create many Links.
     *     @example
     *     // Create many Links
     *     const link = await prisma.link.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LinkCreateManyArgs>(
      args?: SelectSubset<T, LinkCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
    **/
    delete<T extends LinkDeleteArgs>(
      args: SelectSubset<T, LinkDeleteArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LinkUpdateArgs>(
      args: SelectSubset<T, LinkUpdateArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LinkDeleteManyArgs>(
      args?: SelectSubset<T, LinkDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LinkUpdateManyArgs>(
      args: SelectSubset<T, LinkUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
    **/
    upsert<T extends LinkUpsertArgs>(
      args: SelectSubset<T, LinkUpsertArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Find one Link that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {LinkFindUniqueOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LinkFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LinkFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Find the first Link that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LinkFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LinkFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__LinkClient<Link>, Prisma__LinkClient<LinkGetPayload<T>>>

    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): PrismaPromise<GetLinkAggregateType<T>>

    /**
     * Group by Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkGroupByArgs['orderBy'] }
        : { orderBy?: LinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LinkClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    pageEntry<T extends PageEntryFindManyArgs = {}>(args?: Subset<T, PageEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PageEntry>| Null>, PrismaPromise<Array<PageEntryGetPayload<T>>| Null>>;

    entryAnalytics<T extends EntryAnalyticsArgs = {}>(args?: Subset<T, EntryAnalyticsArgs>): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics | Null>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Link base type for findUnique actions
   */
  export type LinkFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * Filter, which Link to fetch.
     * 
    **/
    where: LinkWhereUniqueInput
  }

  /**
   * Link: findUnique
   */
  export interface LinkFindUniqueArgs extends LinkFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Link base type for findFirst actions
   */
  export type LinkFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * Filter, which Link to fetch.
     * 
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     * 
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     * 
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     * 
    **/
    distinct?: Enumerable<LinkScalarFieldEnum>
  }

  /**
   * Link: findFirst
   */
  export interface LinkFindFirstArgs extends LinkFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Link findMany
   */
  export type LinkFindManyArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * Filter, which Links to fetch.
     * 
    **/
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     * 
    **/
    orderBy?: Enumerable<LinkOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
     * 
    **/
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LinkScalarFieldEnum>
  }


  /**
   * Link create
   */
  export type LinkCreateArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * The data needed to create a Link.
     * 
    **/
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }


  /**
   * Link createMany
   */
  export type LinkCreateManyArgs = {
    /**
     * The data used to create many Links.
     * 
    **/
    data: Enumerable<LinkCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Link update
   */
  export type LinkUpdateArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * The data needed to update a Link.
     * 
    **/
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
     * 
    **/
    where: LinkWhereUniqueInput
  }


  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs = {
    /**
     * The data used to update Links.
     * 
    **/
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     * 
    **/
    where?: LinkWhereInput
  }


  /**
   * Link upsert
   */
  export type LinkUpsertArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * The filter to search for the Link to update in case it exists.
     * 
    **/
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
     * 
    **/
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }


  /**
   * Link delete
   */
  export type LinkDeleteArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
    /**
     * Filter which Link to delete.
     * 
    **/
    where: LinkWhereUniqueInput
  }


  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs = {
    /**
     * Filter which Links to delete
     * 
    **/
    where?: LinkWhereInput
  }


  /**
   * Link: findUniqueOrThrow
   */
  export type LinkFindUniqueOrThrowArgs = LinkFindUniqueArgsBase
      

  /**
   * Link: findFirstOrThrow
   */
  export type LinkFindFirstOrThrowArgs = LinkFindFirstArgsBase
      

  /**
   * Link without action
   */
  export type LinkArgs = {
    /**
     * Select specific fields to fetch from the Link
     * 
    **/
    select?: LinkSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LinkInclude | null
  }



  /**
   * Model Blog
   */


  export type AggregateBlog = {
    _count: BlogCountAggregateOutputType | null
    _avg: BlogAvgAggregateOutputType | null
    _sum: BlogSumAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  export type BlogAvgAggregateOutputType = {
    rating: number | null
    lifetimeClicks: number | null
  }

  export type BlogSumAggregateOutputType = {
    rating: number | null
    lifetimeClicks: number | null
  }

  export type BlogMinAggregateOutputType = {
    id: string | null
    name: string | null
    rating: number | null
    location: string | null
    externalLink: string | null
    entryAnalyticsId: string | null
    mediaUrl: string | null
    lifetimeClicks: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogMaxAggregateOutputType = {
    id: string | null
    name: string | null
    rating: number | null
    location: string | null
    externalLink: string | null
    entryAnalyticsId: string | null
    mediaUrl: string | null
    lifetimeClicks: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogCountAggregateOutputType = {
    id: number
    name: number
    rating: number
    location: number
    externalLink: number
    entryAnalyticsId: number
    mediaUrl: number
    lifetimeClicks: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogAvgAggregateInputType = {
    rating?: true
    lifetimeClicks?: true
  }

  export type BlogSumAggregateInputType = {
    rating?: true
    lifetimeClicks?: true
  }

  export type BlogMinAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    location?: true
    externalLink?: true
    entryAnalyticsId?: true
    mediaUrl?: true
    lifetimeClicks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogMaxAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    location?: true
    externalLink?: true
    entryAnalyticsId?: true
    mediaUrl?: true
    lifetimeClicks?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogCountAggregateInputType = {
    id?: true
    name?: true
    rating?: true
    location?: true
    externalLink?: true
    entryAnalyticsId?: true
    mediaUrl?: true
    lifetimeClicks?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogAggregateArgs = {
    /**
     * Filter which Blog to aggregate.
     * 
    **/
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     * 
    **/
    orderBy?: Enumerable<BlogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blogs
    **/
    _count?: true | BlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogMaxAggregateInputType
  }

  export type GetBlogAggregateType<T extends BlogAggregateArgs> = {
        [P in keyof T & keyof AggregateBlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlog[P]>
      : GetScalarType<T[P], AggregateBlog[P]>
  }




  export type BlogGroupByArgs = {
    where?: BlogWhereInput
    orderBy?: Enumerable<BlogOrderByWithAggregationInput>
    by: Array<BlogScalarFieldEnum>
    having?: BlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogCountAggregateInputType | true
    _avg?: BlogAvgAggregateInputType
    _sum?: BlogSumAggregateInputType
    _min?: BlogMinAggregateInputType
    _max?: BlogMaxAggregateInputType
  }


  export type BlogGroupByOutputType = {
    id: string
    name: string
    rating: number | null
    location: string | null
    externalLink: string | null
    entryAnalyticsId: string
    mediaUrl: string | null
    lifetimeClicks: number
    createdAt: Date
    updatedAt: Date
    _count: BlogCountAggregateOutputType | null
    _avg: BlogAvgAggregateOutputType | null
    _sum: BlogSumAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  type GetBlogGroupByPayload<T extends BlogGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogGroupByOutputType[P]>
            : GetScalarType<T[P], BlogGroupByOutputType[P]>
        }
      >
    >


  export type BlogSelect = {
    id?: boolean
    name?: boolean
    rating?: boolean
    location?: boolean
    externalLink?: boolean
    pageEntry?: boolean | PageEntryFindManyArgs
    entryAnalyticsId?: boolean
    entryAnalytics?: boolean | EntryAnalyticsArgs
    mediaUrl?: boolean
    lifetimeClicks?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | BlogCountOutputTypeArgs
  }

  export type BlogInclude = {
    pageEntry?: boolean | PageEntryFindManyArgs
    entryAnalytics?: boolean | EntryAnalyticsArgs
    _count?: boolean | BlogCountOutputTypeArgs
  }

  export type BlogGetPayload<
    S extends boolean | null | undefined | BlogArgs,
    U = keyof S
      > = S extends true
        ? Blog
    : S extends undefined
    ? never
    : S extends BlogArgs | BlogFindManyArgs
    ?'include' extends U
    ? Blog  & {
    [P in TrueKeys<S['include']>]:
        P extends 'pageEntry' ? Array < PageEntryGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'entryAnalytics' ? EntryAnalyticsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends '_count' ? BlogCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'pageEntry' ? Array < PageEntryGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'entryAnalytics' ? EntryAnalyticsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends '_count' ? BlogCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Blog ? Blog[P] : never
  } 
    : Blog
  : Blog


  type BlogCountArgs = Merge<
    Omit<BlogFindManyArgs, 'select' | 'include'> & {
      select?: BlogCountAggregateInputType | true
    }
  >

  export interface BlogDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Blog that matches the filter.
     * @param {BlogFindUniqueArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BlogFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BlogFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Blog'> extends True ? CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>> : CheckSelect<T, Prisma__BlogClient<Blog | null, null>, Prisma__BlogClient<BlogGetPayload<T> | null, null>>

    /**
     * Find the first Blog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BlogFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BlogFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Blog'> extends True ? CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>> : CheckSelect<T, Prisma__BlogClient<Blog | null, null>, Prisma__BlogClient<BlogGetPayload<T> | null, null>>

    /**
     * Find zero or more Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blogs
     * const blogs = await prisma.blog.findMany()
     * 
     * // Get first 10 Blogs
     * const blogs = await prisma.blog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogWithIdOnly = await prisma.blog.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BlogFindManyArgs>(
      args?: SelectSubset<T, BlogFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Blog>>, PrismaPromise<Array<BlogGetPayload<T>>>>

    /**
     * Create a Blog.
     * @param {BlogCreateArgs} args - Arguments to create a Blog.
     * @example
     * // Create one Blog
     * const Blog = await prisma.blog.create({
     *   data: {
     *     // ... data to create a Blog
     *   }
     * })
     * 
    **/
    create<T extends BlogCreateArgs>(
      args: SelectSubset<T, BlogCreateArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Create many Blogs.
     *     @param {BlogCreateManyArgs} args - Arguments to create many Blogs.
     *     @example
     *     // Create many Blogs
     *     const blog = await prisma.blog.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BlogCreateManyArgs>(
      args?: SelectSubset<T, BlogCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Blog.
     * @param {BlogDeleteArgs} args - Arguments to delete one Blog.
     * @example
     * // Delete one Blog
     * const Blog = await prisma.blog.delete({
     *   where: {
     *     // ... filter to delete one Blog
     *   }
     * })
     * 
    **/
    delete<T extends BlogDeleteArgs>(
      args: SelectSubset<T, BlogDeleteArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Update one Blog.
     * @param {BlogUpdateArgs} args - Arguments to update one Blog.
     * @example
     * // Update one Blog
     * const blog = await prisma.blog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BlogUpdateArgs>(
      args: SelectSubset<T, BlogUpdateArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Delete zero or more Blogs.
     * @param {BlogDeleteManyArgs} args - Arguments to filter Blogs to delete.
     * @example
     * // Delete a few Blogs
     * const { count } = await prisma.blog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BlogDeleteManyArgs>(
      args?: SelectSubset<T, BlogDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blogs
     * const blog = await prisma.blog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BlogUpdateManyArgs>(
      args: SelectSubset<T, BlogUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Blog.
     * @param {BlogUpsertArgs} args - Arguments to update or create a Blog.
     * @example
     * // Update or create a Blog
     * const blog = await prisma.blog.upsert({
     *   create: {
     *     // ... data to create a Blog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blog we want to update
     *   }
     * })
    **/
    upsert<T extends BlogUpsertArgs>(
      args: SelectSubset<T, BlogUpsertArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Find one Blog that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BlogFindUniqueOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BlogFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BlogFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Find the first Blog that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BlogFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BlogFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BlogClient<Blog>, Prisma__BlogClient<BlogGetPayload<T>>>

    /**
     * Count the number of Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCountArgs} args - Arguments to filter Blogs to count.
     * @example
     * // Count the number of Blogs
     * const count = await prisma.blog.count({
     *   where: {
     *     // ... the filter for the Blogs we want to count
     *   }
     * })
    **/
    count<T extends BlogCountArgs>(
      args?: Subset<T, BlogCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogAggregateArgs>(args: Subset<T, BlogAggregateArgs>): PrismaPromise<GetBlogAggregateType<T>>

    /**
     * Group by Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogGroupByArgs['orderBy'] }
        : { orderBy?: BlogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Blog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BlogClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    pageEntry<T extends PageEntryFindManyArgs = {}>(args?: Subset<T, PageEntryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PageEntry>| Null>, PrismaPromise<Array<PageEntryGetPayload<T>>| Null>>;

    entryAnalytics<T extends EntryAnalyticsArgs = {}>(args?: Subset<T, EntryAnalyticsArgs>): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics | Null>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Blog base type for findUnique actions
   */
  export type BlogFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * Filter, which Blog to fetch.
     * 
    **/
    where: BlogWhereUniqueInput
  }

  /**
   * Blog: findUnique
   */
  export interface BlogFindUniqueArgs extends BlogFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Blog base type for findFirst actions
   */
  export type BlogFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * Filter, which Blog to fetch.
     * 
    **/
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     * 
    **/
    orderBy?: Enumerable<BlogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     * 
    **/
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     * 
    **/
    distinct?: Enumerable<BlogScalarFieldEnum>
  }

  /**
   * Blog: findFirst
   */
  export interface BlogFindFirstArgs extends BlogFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Blog findMany
   */
  export type BlogFindManyArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * Filter, which Blogs to fetch.
     * 
    **/
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     * 
    **/
    orderBy?: Enumerable<BlogOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blogs.
     * 
    **/
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BlogScalarFieldEnum>
  }


  /**
   * Blog create
   */
  export type BlogCreateArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * The data needed to create a Blog.
     * 
    **/
    data: XOR<BlogCreateInput, BlogUncheckedCreateInput>
  }


  /**
   * Blog createMany
   */
  export type BlogCreateManyArgs = {
    /**
     * The data used to create many Blogs.
     * 
    **/
    data: Enumerable<BlogCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Blog update
   */
  export type BlogUpdateArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * The data needed to update a Blog.
     * 
    **/
    data: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
    /**
     * Choose, which Blog to update.
     * 
    **/
    where: BlogWhereUniqueInput
  }


  /**
   * Blog updateMany
   */
  export type BlogUpdateManyArgs = {
    /**
     * The data used to update Blogs.
     * 
    **/
    data: XOR<BlogUpdateManyMutationInput, BlogUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     * 
    **/
    where?: BlogWhereInput
  }


  /**
   * Blog upsert
   */
  export type BlogUpsertArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * The filter to search for the Blog to update in case it exists.
     * 
    **/
    where: BlogWhereUniqueInput
    /**
     * In case the Blog found by the `where` argument doesn't exist, create a new Blog with this data.
     * 
    **/
    create: XOR<BlogCreateInput, BlogUncheckedCreateInput>
    /**
     * In case the Blog was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
  }


  /**
   * Blog delete
   */
  export type BlogDeleteArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
    /**
     * Filter which Blog to delete.
     * 
    **/
    where: BlogWhereUniqueInput
  }


  /**
   * Blog deleteMany
   */
  export type BlogDeleteManyArgs = {
    /**
     * Filter which Blogs to delete
     * 
    **/
    where?: BlogWhereInput
  }


  /**
   * Blog: findUniqueOrThrow
   */
  export type BlogFindUniqueOrThrowArgs = BlogFindUniqueArgsBase
      

  /**
   * Blog: findFirstOrThrow
   */
  export type BlogFindFirstOrThrowArgs = BlogFindFirstArgsBase
      

  /**
   * Blog without action
   */
  export type BlogArgs = {
    /**
     * Select specific fields to fetch from the Blog
     * 
    **/
    select?: BlogSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BlogInclude | null
  }



  /**
   * Model EntryAnalytics
   */


  export type AggregateEntryAnalytics = {
    _count: EntryAnalyticsCountAggregateOutputType | null
    _avg: EntryAnalyticsAvgAggregateOutputType | null
    _sum: EntryAnalyticsSumAggregateOutputType | null
    _min: EntryAnalyticsMinAggregateOutputType | null
    _max: EntryAnalyticsMaxAggregateOutputType | null
  }

  export type EntryAnalyticsAvgAggregateOutputType = {
    lifetimeClicks: number | null
  }

  export type EntryAnalyticsSumAggregateOutputType = {
    lifetimeClicks: number | null
  }

  export type EntryAnalyticsMinAggregateOutputType = {
    id: string | null
    lifetimeClicks: number | null
  }

  export type EntryAnalyticsMaxAggregateOutputType = {
    id: string | null
    lifetimeClicks: number | null
  }

  export type EntryAnalyticsCountAggregateOutputType = {
    id: number
    lifetimeClicks: number
    _all: number
  }


  export type EntryAnalyticsAvgAggregateInputType = {
    lifetimeClicks?: true
  }

  export type EntryAnalyticsSumAggregateInputType = {
    lifetimeClicks?: true
  }

  export type EntryAnalyticsMinAggregateInputType = {
    id?: true
    lifetimeClicks?: true
  }

  export type EntryAnalyticsMaxAggregateInputType = {
    id?: true
    lifetimeClicks?: true
  }

  export type EntryAnalyticsCountAggregateInputType = {
    id?: true
    lifetimeClicks?: true
    _all?: true
  }

  export type EntryAnalyticsAggregateArgs = {
    /**
     * Filter which EntryAnalytics to aggregate.
     * 
    **/
    where?: EntryAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryAnalytics to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryAnalyticsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EntryAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryAnalytics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryAnalytics.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntryAnalytics
    **/
    _count?: true | EntryAnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntryAnalyticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntryAnalyticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryAnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryAnalyticsMaxAggregateInputType
  }

  export type GetEntryAnalyticsAggregateType<T extends EntryAnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateEntryAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntryAnalytics[P]>
      : GetScalarType<T[P], AggregateEntryAnalytics[P]>
  }




  export type EntryAnalyticsGroupByArgs = {
    where?: EntryAnalyticsWhereInput
    orderBy?: Enumerable<EntryAnalyticsOrderByWithAggregationInput>
    by: Array<EntryAnalyticsScalarFieldEnum>
    having?: EntryAnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryAnalyticsCountAggregateInputType | true
    _avg?: EntryAnalyticsAvgAggregateInputType
    _sum?: EntryAnalyticsSumAggregateInputType
    _min?: EntryAnalyticsMinAggregateInputType
    _max?: EntryAnalyticsMaxAggregateInputType
  }


  export type EntryAnalyticsGroupByOutputType = {
    id: string
    lifetimeClicks: number
    _count: EntryAnalyticsCountAggregateOutputType | null
    _avg: EntryAnalyticsAvgAggregateOutputType | null
    _sum: EntryAnalyticsSumAggregateOutputType | null
    _min: EntryAnalyticsMinAggregateOutputType | null
    _max: EntryAnalyticsMaxAggregateOutputType | null
  }

  type GetEntryAnalyticsGroupByPayload<T extends EntryAnalyticsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EntryAnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryAnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryAnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], EntryAnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type EntryAnalyticsSelect = {
    id?: boolean
    lifetimeClicks?: boolean
    blog?: boolean | BlogArgs
    link?: boolean | LinkArgs
  }

  export type EntryAnalyticsInclude = {
    blog?: boolean | BlogArgs
    link?: boolean | LinkArgs
  }

  export type EntryAnalyticsGetPayload<
    S extends boolean | null | undefined | EntryAnalyticsArgs,
    U = keyof S
      > = S extends true
        ? EntryAnalytics
    : S extends undefined
    ? never
    : S extends EntryAnalyticsArgs | EntryAnalyticsFindManyArgs
    ?'include' extends U
    ? EntryAnalytics  & {
    [P in TrueKeys<S['include']>]:
        P extends 'blog' ? BlogGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'link' ? LinkGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'blog' ? BlogGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'link' ? LinkGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof EntryAnalytics ? EntryAnalytics[P] : never
  } 
    : EntryAnalytics
  : EntryAnalytics


  type EntryAnalyticsCountArgs = Merge<
    Omit<EntryAnalyticsFindManyArgs, 'select' | 'include'> & {
      select?: EntryAnalyticsCountAggregateInputType | true
    }
  >

  export interface EntryAnalyticsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one EntryAnalytics that matches the filter.
     * @param {EntryAnalyticsFindUniqueArgs} args - Arguments to find a EntryAnalytics
     * @example
     * // Get one EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EntryAnalyticsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EntryAnalyticsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EntryAnalytics'> extends True ? CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>> : CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics | null, null>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T> | null, null>>

    /**
     * Find the first EntryAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsFindFirstArgs} args - Arguments to find a EntryAnalytics
     * @example
     * // Get one EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EntryAnalyticsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EntryAnalyticsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EntryAnalytics'> extends True ? CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>> : CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics | null, null>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T> | null, null>>

    /**
     * Find zero or more EntryAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findMany()
     * 
     * // Get first 10 EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entryAnalyticsWithIdOnly = await prisma.entryAnalytics.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EntryAnalyticsFindManyArgs>(
      args?: SelectSubset<T, EntryAnalyticsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EntryAnalytics>>, PrismaPromise<Array<EntryAnalyticsGetPayload<T>>>>

    /**
     * Create a EntryAnalytics.
     * @param {EntryAnalyticsCreateArgs} args - Arguments to create a EntryAnalytics.
     * @example
     * // Create one EntryAnalytics
     * const EntryAnalytics = await prisma.entryAnalytics.create({
     *   data: {
     *     // ... data to create a EntryAnalytics
     *   }
     * })
     * 
    **/
    create<T extends EntryAnalyticsCreateArgs>(
      args: SelectSubset<T, EntryAnalyticsCreateArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Create many EntryAnalytics.
     *     @param {EntryAnalyticsCreateManyArgs} args - Arguments to create many EntryAnalytics.
     *     @example
     *     // Create many EntryAnalytics
     *     const entryAnalytics = await prisma.entryAnalytics.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EntryAnalyticsCreateManyArgs>(
      args?: SelectSubset<T, EntryAnalyticsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EntryAnalytics.
     * @param {EntryAnalyticsDeleteArgs} args - Arguments to delete one EntryAnalytics.
     * @example
     * // Delete one EntryAnalytics
     * const EntryAnalytics = await prisma.entryAnalytics.delete({
     *   where: {
     *     // ... filter to delete one EntryAnalytics
     *   }
     * })
     * 
    **/
    delete<T extends EntryAnalyticsDeleteArgs>(
      args: SelectSubset<T, EntryAnalyticsDeleteArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Update one EntryAnalytics.
     * @param {EntryAnalyticsUpdateArgs} args - Arguments to update one EntryAnalytics.
     * @example
     * // Update one EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EntryAnalyticsUpdateArgs>(
      args: SelectSubset<T, EntryAnalyticsUpdateArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Delete zero or more EntryAnalytics.
     * @param {EntryAnalyticsDeleteManyArgs} args - Arguments to filter EntryAnalytics to delete.
     * @example
     * // Delete a few EntryAnalytics
     * const { count } = await prisma.entryAnalytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EntryAnalyticsDeleteManyArgs>(
      args?: SelectSubset<T, EntryAnalyticsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EntryAnalyticsUpdateManyArgs>(
      args: SelectSubset<T, EntryAnalyticsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EntryAnalytics.
     * @param {EntryAnalyticsUpsertArgs} args - Arguments to update or create a EntryAnalytics.
     * @example
     * // Update or create a EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.upsert({
     *   create: {
     *     // ... data to create a EntryAnalytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntryAnalytics we want to update
     *   }
     * })
    **/
    upsert<T extends EntryAnalyticsUpsertArgs>(
      args: SelectSubset<T, EntryAnalyticsUpsertArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Find one EntryAnalytics that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EntryAnalyticsFindUniqueOrThrowArgs} args - Arguments to find a EntryAnalytics
     * @example
     * // Get one EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EntryAnalyticsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EntryAnalyticsFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Find the first EntryAnalytics that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsFindFirstOrThrowArgs} args - Arguments to find a EntryAnalytics
     * @example
     * // Get one EntryAnalytics
     * const entryAnalytics = await prisma.entryAnalytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EntryAnalyticsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EntryAnalyticsFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__EntryAnalyticsClient<EntryAnalytics>, Prisma__EntryAnalyticsClient<EntryAnalyticsGetPayload<T>>>

    /**
     * Count the number of EntryAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsCountArgs} args - Arguments to filter EntryAnalytics to count.
     * @example
     * // Count the number of EntryAnalytics
     * const count = await prisma.entryAnalytics.count({
     *   where: {
     *     // ... the filter for the EntryAnalytics we want to count
     *   }
     * })
    **/
    count<T extends EntryAnalyticsCountArgs>(
      args?: Subset<T, EntryAnalyticsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryAnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntryAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntryAnalyticsAggregateArgs>(args: Subset<T, EntryAnalyticsAggregateArgs>): PrismaPromise<GetEntryAnalyticsAggregateType<T>>

    /**
     * Group by EntryAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryAnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntryAnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryAnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: EntryAnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryAnalyticsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for EntryAnalytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EntryAnalyticsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    blog<T extends BlogArgs = {}>(args?: Subset<T, BlogArgs>): CheckSelect<T, Prisma__BlogClient<Blog | Null>, Prisma__BlogClient<BlogGetPayload<T> | Null>>;

    link<T extends LinkArgs = {}>(args?: Subset<T, LinkArgs>): CheckSelect<T, Prisma__LinkClient<Link | Null>, Prisma__LinkClient<LinkGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * EntryAnalytics base type for findUnique actions
   */
  export type EntryAnalyticsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * Filter, which EntryAnalytics to fetch.
     * 
    **/
    where: EntryAnalyticsWhereUniqueInput
  }

  /**
   * EntryAnalytics: findUnique
   */
  export interface EntryAnalyticsFindUniqueArgs extends EntryAnalyticsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EntryAnalytics base type for findFirst actions
   */
  export type EntryAnalyticsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * Filter, which EntryAnalytics to fetch.
     * 
    **/
    where?: EntryAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryAnalytics to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryAnalyticsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryAnalytics.
     * 
    **/
    cursor?: EntryAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryAnalytics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryAnalytics.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryAnalytics.
     * 
    **/
    distinct?: Enumerable<EntryAnalyticsScalarFieldEnum>
  }

  /**
   * EntryAnalytics: findFirst
   */
  export interface EntryAnalyticsFindFirstArgs extends EntryAnalyticsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EntryAnalytics findMany
   */
  export type EntryAnalyticsFindManyArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * Filter, which EntryAnalytics to fetch.
     * 
    **/
    where?: EntryAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryAnalytics to fetch.
     * 
    **/
    orderBy?: Enumerable<EntryAnalyticsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntryAnalytics.
     * 
    **/
    cursor?: EntryAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryAnalytics from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryAnalytics.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EntryAnalyticsScalarFieldEnum>
  }


  /**
   * EntryAnalytics create
   */
  export type EntryAnalyticsCreateArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * The data needed to create a EntryAnalytics.
     * 
    **/
    data: XOR<EntryAnalyticsCreateInput, EntryAnalyticsUncheckedCreateInput>
  }


  /**
   * EntryAnalytics createMany
   */
  export type EntryAnalyticsCreateManyArgs = {
    /**
     * The data used to create many EntryAnalytics.
     * 
    **/
    data: Enumerable<EntryAnalyticsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EntryAnalytics update
   */
  export type EntryAnalyticsUpdateArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * The data needed to update a EntryAnalytics.
     * 
    **/
    data: XOR<EntryAnalyticsUpdateInput, EntryAnalyticsUncheckedUpdateInput>
    /**
     * Choose, which EntryAnalytics to update.
     * 
    **/
    where: EntryAnalyticsWhereUniqueInput
  }


  /**
   * EntryAnalytics updateMany
   */
  export type EntryAnalyticsUpdateManyArgs = {
    /**
     * The data used to update EntryAnalytics.
     * 
    **/
    data: XOR<EntryAnalyticsUpdateManyMutationInput, EntryAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which EntryAnalytics to update
     * 
    **/
    where?: EntryAnalyticsWhereInput
  }


  /**
   * EntryAnalytics upsert
   */
  export type EntryAnalyticsUpsertArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * The filter to search for the EntryAnalytics to update in case it exists.
     * 
    **/
    where: EntryAnalyticsWhereUniqueInput
    /**
     * In case the EntryAnalytics found by the `where` argument doesn't exist, create a new EntryAnalytics with this data.
     * 
    **/
    create: XOR<EntryAnalyticsCreateInput, EntryAnalyticsUncheckedCreateInput>
    /**
     * In case the EntryAnalytics was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EntryAnalyticsUpdateInput, EntryAnalyticsUncheckedUpdateInput>
  }


  /**
   * EntryAnalytics delete
   */
  export type EntryAnalyticsDeleteArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
    /**
     * Filter which EntryAnalytics to delete.
     * 
    **/
    where: EntryAnalyticsWhereUniqueInput
  }


  /**
   * EntryAnalytics deleteMany
   */
  export type EntryAnalyticsDeleteManyArgs = {
    /**
     * Filter which EntryAnalytics to delete
     * 
    **/
    where?: EntryAnalyticsWhereInput
  }


  /**
   * EntryAnalytics: findUniqueOrThrow
   */
  export type EntryAnalyticsFindUniqueOrThrowArgs = EntryAnalyticsFindUniqueArgsBase
      

  /**
   * EntryAnalytics: findFirstOrThrow
   */
  export type EntryAnalyticsFindFirstOrThrowArgs = EntryAnalyticsFindFirstArgsBase
      

  /**
   * EntryAnalytics without action
   */
  export type EntryAnalyticsArgs = {
    /**
     * Select specific fields to fetch from the EntryAnalytics
     * 
    **/
    select?: EntryAnalyticsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EntryAnalyticsInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const BlogScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rating: 'rating',
    location: 'location',
    externalLink: 'externalLink',
    entryAnalyticsId: 'entryAnalyticsId',
    mediaUrl: 'mediaUrl',
    lifetimeClicks: 'lifetimeClicks',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum]


  export const EntryAnalyticsScalarFieldEnum: {
    id: 'id',
    lifetimeClicks: 'lifetimeClicks'
  };

  export type EntryAnalyticsScalarFieldEnum = (typeof EntryAnalyticsScalarFieldEnum)[keyof typeof EntryAnalyticsScalarFieldEnum]


  export const LinkScalarFieldEnum: {
    id: 'id',
    displayText: 'displayText',
    link: 'link',
    mediaUrl: 'mediaUrl',
    entryAnalyticsId: 'entryAnalyticsId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const PageEntryScalarFieldEnum: {
    id: 'id',
    linkId: 'linkId',
    blogId: 'blogId',
    pageId: 'pageId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PageEntryScalarFieldEnum = (typeof PageEntryScalarFieldEnum)[keyof typeof PageEntryScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    plan: 'plan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    username?: StringFilter | string
    email?: StringFilter | string
    plan?: EnumPLANFilter | PLAN
    page?: PageListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    page?: PageOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: string
    username?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    plan?: EnumPLANWithAggregatesFilter | PLAN
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PageWhereInput = {
    AND?: Enumerable<PageWhereInput>
    OR?: Enumerable<PageWhereInput>
    NOT?: Enumerable<PageWhereInput>
    id?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput> | null
    userId?: StringFilter | string
    pageEntries?: PageEntryListRelationFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    pageEntries?: PageEntryOrderByRelationAggregateInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageWhereUniqueInput = {
    id?: string
  }

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PageScalarWhereWithAggregatesInput>
    OR?: Enumerable<PageScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PageScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PageEntryWhereInput = {
    AND?: Enumerable<PageEntryWhereInput>
    OR?: Enumerable<PageEntryWhereInput>
    NOT?: Enumerable<PageEntryWhereInput>
    id?: StringFilter | string
    linkId?: StringNullableFilter | string | null
    blogId?: StringNullableFilter | string | null
    link?: XOR<LinkRelationFilter, LinkWhereInput> | null
    blog?: XOR<BlogRelationFilter, BlogWhereInput> | null
    Page?: XOR<PageRelationFilter, PageWhereInput> | null
    pageId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type PageEntryOrderByWithRelationInput = {
    id?: SortOrder
    linkId?: SortOrder
    blogId?: SortOrder
    link?: LinkOrderByWithRelationInput
    blog?: BlogOrderByWithRelationInput
    Page?: PageOrderByWithRelationInput
    pageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageEntryWhereUniqueInput = {
    id?: string
  }

  export type PageEntryOrderByWithAggregationInput = {
    id?: SortOrder
    linkId?: SortOrder
    blogId?: SortOrder
    pageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PageEntryCountOrderByAggregateInput
    _max?: PageEntryMaxOrderByAggregateInput
    _min?: PageEntryMinOrderByAggregateInput
  }

  export type PageEntryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PageEntryScalarWhereWithAggregatesInput>
    OR?: Enumerable<PageEntryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PageEntryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    linkId?: StringNullableWithAggregatesFilter | string | null
    blogId?: StringNullableWithAggregatesFilter | string | null
    pageId?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type LinkWhereInput = {
    AND?: Enumerable<LinkWhereInput>
    OR?: Enumerable<LinkWhereInput>
    NOT?: Enumerable<LinkWhereInput>
    id?: StringFilter | string
    displayText?: StringFilter | string
    link?: StringFilter | string
    pageEntry?: PageEntryListRelationFilter
    mediaUrl?: StringNullableFilter | string | null
    entryAnalyticsId?: StringFilter | string
    entryAnalytics?: XOR<EntryAnalyticsRelationFilter, EntryAnalyticsWhereInput> | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type LinkOrderByWithRelationInput = {
    id?: SortOrder
    displayText?: SortOrder
    link?: SortOrder
    pageEntry?: PageEntryOrderByRelationAggregateInput
    mediaUrl?: SortOrder
    entryAnalyticsId?: SortOrder
    entryAnalytics?: EntryAnalyticsOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LinkWhereUniqueInput = {
    id?: string
    entryAnalyticsId?: string
  }

  export type LinkOrderByWithAggregationInput = {
    id?: SortOrder
    displayText?: SortOrder
    link?: SortOrder
    mediaUrl?: SortOrder
    entryAnalyticsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LinkCountOrderByAggregateInput
    _max?: LinkMaxOrderByAggregateInput
    _min?: LinkMinOrderByAggregateInput
  }

  export type LinkScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LinkScalarWhereWithAggregatesInput>
    OR?: Enumerable<LinkScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LinkScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    displayText?: StringWithAggregatesFilter | string
    link?: StringWithAggregatesFilter | string
    mediaUrl?: StringNullableWithAggregatesFilter | string | null
    entryAnalyticsId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type BlogWhereInput = {
    AND?: Enumerable<BlogWhereInput>
    OR?: Enumerable<BlogWhereInput>
    NOT?: Enumerable<BlogWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    rating?: FloatNullableFilter | number | null
    location?: StringNullableFilter | string | null
    externalLink?: StringNullableFilter | string | null
    pageEntry?: PageEntryListRelationFilter
    entryAnalyticsId?: StringFilter | string
    entryAnalytics?: XOR<EntryAnalyticsRelationFilter, EntryAnalyticsWhereInput> | null
    mediaUrl?: StringNullableFilter | string | null
    lifetimeClicks?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type BlogOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    location?: SortOrder
    externalLink?: SortOrder
    pageEntry?: PageEntryOrderByRelationAggregateInput
    entryAnalyticsId?: SortOrder
    entryAnalytics?: EntryAnalyticsOrderByWithRelationInput
    mediaUrl?: SortOrder
    lifetimeClicks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogWhereUniqueInput = {
    id?: string
    entryAnalyticsId?: string
  }

  export type BlogOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    location?: SortOrder
    externalLink?: SortOrder
    entryAnalyticsId?: SortOrder
    mediaUrl?: SortOrder
    lifetimeClicks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogCountOrderByAggregateInput
    _avg?: BlogAvgOrderByAggregateInput
    _max?: BlogMaxOrderByAggregateInput
    _min?: BlogMinOrderByAggregateInput
    _sum?: BlogSumOrderByAggregateInput
  }

  export type BlogScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BlogScalarWhereWithAggregatesInput>
    OR?: Enumerable<BlogScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BlogScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    rating?: FloatNullableWithAggregatesFilter | number | null
    location?: StringNullableWithAggregatesFilter | string | null
    externalLink?: StringNullableWithAggregatesFilter | string | null
    entryAnalyticsId?: StringWithAggregatesFilter | string
    mediaUrl?: StringNullableWithAggregatesFilter | string | null
    lifetimeClicks?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type EntryAnalyticsWhereInput = {
    AND?: Enumerable<EntryAnalyticsWhereInput>
    OR?: Enumerable<EntryAnalyticsWhereInput>
    NOT?: Enumerable<EntryAnalyticsWhereInput>
    id?: StringFilter | string
    lifetimeClicks?: IntFilter | number
    blog?: XOR<BlogRelationFilter, BlogWhereInput> | null
    link?: XOR<LinkRelationFilter, LinkWhereInput> | null
  }

  export type EntryAnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    lifetimeClicks?: SortOrder
    blog?: BlogOrderByWithRelationInput
    link?: LinkOrderByWithRelationInput
  }

  export type EntryAnalyticsWhereUniqueInput = {
    id?: string
  }

  export type EntryAnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    lifetimeClicks?: SortOrder
    _count?: EntryAnalyticsCountOrderByAggregateInput
    _avg?: EntryAnalyticsAvgOrderByAggregateInput
    _max?: EntryAnalyticsMaxOrderByAggregateInput
    _min?: EntryAnalyticsMinOrderByAggregateInput
    _sum?: EntryAnalyticsSumOrderByAggregateInput
  }

  export type EntryAnalyticsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EntryAnalyticsScalarWhereWithAggregatesInput>
    OR?: Enumerable<EntryAnalyticsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EntryAnalyticsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    lifetimeClicks?: IntWithAggregatesFilter | number
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    plan?: PLAN
    page?: PageCreateNestedManyWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    plan?: PLAN
    page?: PageUncheckedCreateNestedManyWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    page?: PageUpdateManyWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    page?: PageUncheckedUpdateManyWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    plan?: PLAN
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateInput = {
    id?: string
    user?: UserCreateNestedOneWithoutPageInput
    pageEntries?: PageEntryCreateNestedManyWithoutPageInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUncheckedCreateInput = {
    id?: string
    userId: string
    pageEntries?: PageEntryUncheckedCreateNestedManyWithoutPageInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPageNestedInput
    pageEntries?: PageEntryUpdateManyWithoutPageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pageEntries?: PageEntryUncheckedUpdateManyWithoutPageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateInput = {
    id?: string
    link?: LinkCreateNestedOneWithoutPageEntryInput
    blog?: BlogCreateNestedOneWithoutPageEntryInput
    Page?: PageCreateNestedOneWithoutPageEntriesInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUncheckedCreateInput = {
    id?: string
    linkId?: string | null
    blogId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    link?: LinkUpdateOneWithoutPageEntryNestedInput
    blog?: BlogUpdateOneWithoutPageEntryNestedInput
    Page?: PageUpdateOneWithoutPageEntriesNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: NullableStringFieldUpdateOperationsInput | string | null
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateManyInput = {
    id?: string
    linkId?: string | null
    blogId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: NullableStringFieldUpdateOperationsInput | string | null
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkCreateInput = {
    id?: string
    displayText: string
    link: string
    pageEntry?: PageEntryCreateNestedManyWithoutLinkInput
    mediaUrl?: string | null
    entryAnalytics?: EntryAnalyticsCreateNestedOneWithoutLinkInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkUncheckedCreateInput = {
    id?: string
    displayText: string
    link: string
    pageEntry?: PageEntryUncheckedCreateNestedManyWithoutLinkInput
    mediaUrl?: string | null
    entryAnalyticsId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    pageEntry?: PageEntryUpdateManyWithoutLinkNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalytics?: EntryAnalyticsUpdateOneWithoutLinkNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    pageEntry?: PageEntryUncheckedUpdateManyWithoutLinkNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkCreateManyInput = {
    id?: string
    displayText: string
    link: string
    mediaUrl?: string | null
    entryAnalyticsId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogCreateInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    pageEntry?: PageEntryCreateNestedManyWithoutBlogInput
    entryAnalytics?: EntryAnalyticsCreateNestedOneWithoutBlogInput
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUncheckedCreateInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    pageEntry?: PageEntryUncheckedCreateNestedManyWithoutBlogInput
    entryAnalyticsId: string
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    pageEntry?: PageEntryUpdateManyWithoutBlogNestedInput
    entryAnalytics?: EntryAnalyticsUpdateOneWithoutBlogNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    pageEntry?: PageEntryUncheckedUpdateManyWithoutBlogNestedInput
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogCreateManyInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    entryAnalyticsId: string
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryAnalyticsCreateInput = {
    id?: string
    lifetimeClicks?: number
    blog?: BlogCreateNestedOneWithoutEntryAnalyticsInput
    link?: LinkCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsUncheckedCreateInput = {
    id?: string
    lifetimeClicks?: number
    blog?: BlogUncheckedCreateNestedOneWithoutEntryAnalyticsInput
    link?: LinkUncheckedCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    blog?: BlogUpdateOneWithoutEntryAnalyticsNestedInput
    link?: LinkUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type EntryAnalyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    blog?: BlogUncheckedUpdateOneWithoutEntryAnalyticsNestedInput
    link?: LinkUncheckedUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type EntryAnalyticsCreateManyInput = {
    id?: string
    lifetimeClicks?: number
  }

  export type EntryAnalyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
  }

  export type EntryAnalyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumPLANFilter = {
    equals?: PLAN
    in?: Enumerable<PLAN>
    notIn?: Enumerable<PLAN>
    not?: NestedEnumPLANFilter | PLAN
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumPLANWithAggregatesFilter = {
    equals?: PLAN
    in?: Enumerable<PLAN>
    notIn?: Enumerable<PLAN>
    not?: NestedEnumPLANWithAggregatesFilter | PLAN
    _count?: NestedIntFilter
    _min?: NestedEnumPLANFilter
    _max?: NestedEnumPLANFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PageEntryListRelationFilter = {
    every?: PageEntryWhereInput
    some?: PageEntryWhereInput
    none?: PageEntryWhereInput
  }

  export type PageEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type LinkRelationFilter = {
    is?: LinkWhereInput | null
    isNot?: LinkWhereInput | null
  }

  export type BlogRelationFilter = {
    is?: BlogWhereInput | null
    isNot?: BlogWhereInput | null
  }

  export type PageRelationFilter = {
    is?: PageWhereInput | null
    isNot?: PageWhereInput | null
  }

  export type PageEntryCountOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    blogId?: SortOrder
    pageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    blogId?: SortOrder
    pageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PageEntryMinOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    blogId?: SortOrder
    pageId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type EntryAnalyticsRelationFilter = {
    is?: EntryAnalyticsWhereInput | null
    isNot?: EntryAnalyticsWhereInput | null
  }

  export type LinkCountOrderByAggregateInput = {
    id?: SortOrder
    displayText?: SortOrder
    link?: SortOrder
    mediaUrl?: SortOrder
    entryAnalyticsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LinkMaxOrderByAggregateInput = {
    id?: SortOrder
    displayText?: SortOrder
    link?: SortOrder
    mediaUrl?: SortOrder
    entryAnalyticsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LinkMinOrderByAggregateInput = {
    id?: SortOrder
    displayText?: SortOrder
    link?: SortOrder
    mediaUrl?: SortOrder
    entryAnalyticsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BlogCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    location?: SortOrder
    externalLink?: SortOrder
    entryAnalyticsId?: SortOrder
    mediaUrl?: SortOrder
    lifetimeClicks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogAvgOrderByAggregateInput = {
    rating?: SortOrder
    lifetimeClicks?: SortOrder
  }

  export type BlogMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    location?: SortOrder
    externalLink?: SortOrder
    entryAnalyticsId?: SortOrder
    mediaUrl?: SortOrder
    lifetimeClicks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rating?: SortOrder
    location?: SortOrder
    externalLink?: SortOrder
    entryAnalyticsId?: SortOrder
    mediaUrl?: SortOrder
    lifetimeClicks?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogSumOrderByAggregateInput = {
    rating?: SortOrder
    lifetimeClicks?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type EntryAnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    lifetimeClicks?: SortOrder
  }

  export type EntryAnalyticsAvgOrderByAggregateInput = {
    lifetimeClicks?: SortOrder
  }

  export type EntryAnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    lifetimeClicks?: SortOrder
  }

  export type EntryAnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    lifetimeClicks?: SortOrder
  }

  export type EntryAnalyticsSumOrderByAggregateInput = {
    lifetimeClicks?: SortOrder
  }

  export type PageCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutUserInput>, Enumerable<PageUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUserInput>
    createMany?: PageCreateManyUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type PageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PageCreateWithoutUserInput>, Enumerable<PageUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUserInput>
    createMany?: PageCreateManyUserInputEnvelope
    connect?: Enumerable<PageWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPLANFieldUpdateOperationsInput = {
    set?: PLAN
  }

  export type PageUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutUserInput>, Enumerable<PageUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PageCreateManyUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PageCreateWithoutUserInput>, Enumerable<PageUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PageCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PageUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PageCreateManyUserInputEnvelope
    set?: Enumerable<PageWhereUniqueInput>
    disconnect?: Enumerable<PageWhereUniqueInput>
    delete?: Enumerable<PageWhereUniqueInput>
    connect?: Enumerable<PageWhereUniqueInput>
    update?: Enumerable<PageUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PageUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PageScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutPageInput = {
    create?: XOR<UserCreateWithoutPageInput, UserUncheckedCreateWithoutPageInput>
    connectOrCreate?: UserCreateOrConnectWithoutPageInput
    connect?: UserWhereUniqueInput
  }

  export type PageEntryCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutPageInput>, Enumerable<PageEntryUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutPageInput>
    createMany?: PageEntryCreateManyPageInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type PageEntryUncheckedCreateNestedManyWithoutPageInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutPageInput>, Enumerable<PageEntryUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutPageInput>
    createMany?: PageEntryCreateManyPageInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type UserUpdateOneWithoutPageNestedInput = {
    create?: XOR<UserCreateWithoutPageInput, UserUncheckedCreateWithoutPageInput>
    connectOrCreate?: UserCreateOrConnectWithoutPageInput
    upsert?: UserUpsertWithoutPageInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPageInput, UserUncheckedUpdateWithoutPageInput>
  }

  export type PageEntryUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutPageInput>, Enumerable<PageEntryUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutPageInput>
    createMany?: PageEntryCreateManyPageInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type PageEntryUncheckedUpdateManyWithoutPageNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutPageInput>, Enumerable<PageEntryUncheckedCreateWithoutPageInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutPageInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutPageInput>
    createMany?: PageEntryCreateManyPageInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutPageInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutPageInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type LinkCreateNestedOneWithoutPageEntryInput = {
    create?: XOR<LinkCreateWithoutPageEntryInput, LinkUncheckedCreateWithoutPageEntryInput>
    connectOrCreate?: LinkCreateOrConnectWithoutPageEntryInput
    connect?: LinkWhereUniqueInput
  }

  export type BlogCreateNestedOneWithoutPageEntryInput = {
    create?: XOR<BlogCreateWithoutPageEntryInput, BlogUncheckedCreateWithoutPageEntryInput>
    connectOrCreate?: BlogCreateOrConnectWithoutPageEntryInput
    connect?: BlogWhereUniqueInput
  }

  export type PageCreateNestedOneWithoutPageEntriesInput = {
    create?: XOR<PageCreateWithoutPageEntriesInput, PageUncheckedCreateWithoutPageEntriesInput>
    connectOrCreate?: PageCreateOrConnectWithoutPageEntriesInput
    connect?: PageWhereUniqueInput
  }

  export type LinkUpdateOneWithoutPageEntryNestedInput = {
    create?: XOR<LinkCreateWithoutPageEntryInput, LinkUncheckedCreateWithoutPageEntryInput>
    connectOrCreate?: LinkCreateOrConnectWithoutPageEntryInput
    upsert?: LinkUpsertWithoutPageEntryInput
    disconnect?: boolean
    delete?: boolean
    connect?: LinkWhereUniqueInput
    update?: XOR<LinkUpdateWithoutPageEntryInput, LinkUncheckedUpdateWithoutPageEntryInput>
  }

  export type BlogUpdateOneWithoutPageEntryNestedInput = {
    create?: XOR<BlogCreateWithoutPageEntryInput, BlogUncheckedCreateWithoutPageEntryInput>
    connectOrCreate?: BlogCreateOrConnectWithoutPageEntryInput
    upsert?: BlogUpsertWithoutPageEntryInput
    disconnect?: boolean
    delete?: boolean
    connect?: BlogWhereUniqueInput
    update?: XOR<BlogUpdateWithoutPageEntryInput, BlogUncheckedUpdateWithoutPageEntryInput>
  }

  export type PageUpdateOneWithoutPageEntriesNestedInput = {
    create?: XOR<PageCreateWithoutPageEntriesInput, PageUncheckedCreateWithoutPageEntriesInput>
    connectOrCreate?: PageCreateOrConnectWithoutPageEntriesInput
    upsert?: PageUpsertWithoutPageEntriesInput
    disconnect?: boolean
    delete?: boolean
    connect?: PageWhereUniqueInput
    update?: XOR<PageUpdateWithoutPageEntriesInput, PageUncheckedUpdateWithoutPageEntriesInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PageEntryCreateNestedManyWithoutLinkInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutLinkInput>, Enumerable<PageEntryUncheckedCreateWithoutLinkInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutLinkInput>
    createMany?: PageEntryCreateManyLinkInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type EntryAnalyticsCreateNestedOneWithoutLinkInput = {
    create?: XOR<EntryAnalyticsCreateWithoutLinkInput, EntryAnalyticsUncheckedCreateWithoutLinkInput>
    connectOrCreate?: EntryAnalyticsCreateOrConnectWithoutLinkInput
    connect?: EntryAnalyticsWhereUniqueInput
  }

  export type PageEntryUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutLinkInput>, Enumerable<PageEntryUncheckedCreateWithoutLinkInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutLinkInput>
    createMany?: PageEntryCreateManyLinkInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type PageEntryUpdateManyWithoutLinkNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutLinkInput>, Enumerable<PageEntryUncheckedCreateWithoutLinkInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutLinkInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutLinkInput>
    createMany?: PageEntryCreateManyLinkInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutLinkInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutLinkInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type EntryAnalyticsUpdateOneWithoutLinkNestedInput = {
    create?: XOR<EntryAnalyticsCreateWithoutLinkInput, EntryAnalyticsUncheckedCreateWithoutLinkInput>
    connectOrCreate?: EntryAnalyticsCreateOrConnectWithoutLinkInput
    upsert?: EntryAnalyticsUpsertWithoutLinkInput
    disconnect?: boolean
    delete?: boolean
    connect?: EntryAnalyticsWhereUniqueInput
    update?: XOR<EntryAnalyticsUpdateWithoutLinkInput, EntryAnalyticsUncheckedUpdateWithoutLinkInput>
  }

  export type PageEntryUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutLinkInput>, Enumerable<PageEntryUncheckedCreateWithoutLinkInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutLinkInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutLinkInput>
    createMany?: PageEntryCreateManyLinkInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutLinkInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutLinkInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type PageEntryCreateNestedManyWithoutBlogInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutBlogInput>, Enumerable<PageEntryUncheckedCreateWithoutBlogInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutBlogInput>
    createMany?: PageEntryCreateManyBlogInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type EntryAnalyticsCreateNestedOneWithoutBlogInput = {
    create?: XOR<EntryAnalyticsCreateWithoutBlogInput, EntryAnalyticsUncheckedCreateWithoutBlogInput>
    connectOrCreate?: EntryAnalyticsCreateOrConnectWithoutBlogInput
    connect?: EntryAnalyticsWhereUniqueInput
  }

  export type PageEntryUncheckedCreateNestedManyWithoutBlogInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutBlogInput>, Enumerable<PageEntryUncheckedCreateWithoutBlogInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutBlogInput>
    createMany?: PageEntryCreateManyBlogInputEnvelope
    connect?: Enumerable<PageEntryWhereUniqueInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PageEntryUpdateManyWithoutBlogNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutBlogInput>, Enumerable<PageEntryUncheckedCreateWithoutBlogInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutBlogInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutBlogInput>
    createMany?: PageEntryCreateManyBlogInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutBlogInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutBlogInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type EntryAnalyticsUpdateOneWithoutBlogNestedInput = {
    create?: XOR<EntryAnalyticsCreateWithoutBlogInput, EntryAnalyticsUncheckedCreateWithoutBlogInput>
    connectOrCreate?: EntryAnalyticsCreateOrConnectWithoutBlogInput
    upsert?: EntryAnalyticsUpsertWithoutBlogInput
    disconnect?: boolean
    delete?: boolean
    connect?: EntryAnalyticsWhereUniqueInput
    update?: XOR<EntryAnalyticsUpdateWithoutBlogInput, EntryAnalyticsUncheckedUpdateWithoutBlogInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PageEntryUncheckedUpdateManyWithoutBlogNestedInput = {
    create?: XOR<Enumerable<PageEntryCreateWithoutBlogInput>, Enumerable<PageEntryUncheckedCreateWithoutBlogInput>>
    connectOrCreate?: Enumerable<PageEntryCreateOrConnectWithoutBlogInput>
    upsert?: Enumerable<PageEntryUpsertWithWhereUniqueWithoutBlogInput>
    createMany?: PageEntryCreateManyBlogInputEnvelope
    set?: Enumerable<PageEntryWhereUniqueInput>
    disconnect?: Enumerable<PageEntryWhereUniqueInput>
    delete?: Enumerable<PageEntryWhereUniqueInput>
    connect?: Enumerable<PageEntryWhereUniqueInput>
    update?: Enumerable<PageEntryUpdateWithWhereUniqueWithoutBlogInput>
    updateMany?: Enumerable<PageEntryUpdateManyWithWhereWithoutBlogInput>
    deleteMany?: Enumerable<PageEntryScalarWhereInput>
  }

  export type BlogCreateNestedOneWithoutEntryAnalyticsInput = {
    create?: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutEntryAnalyticsInput
    connect?: BlogWhereUniqueInput
  }

  export type LinkCreateNestedOneWithoutEntryAnalyticsInput = {
    create?: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEntryAnalyticsInput
    connect?: LinkWhereUniqueInput
  }

  export type BlogUncheckedCreateNestedOneWithoutEntryAnalyticsInput = {
    create?: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutEntryAnalyticsInput
    connect?: BlogWhereUniqueInput
  }

  export type LinkUncheckedCreateNestedOneWithoutEntryAnalyticsInput = {
    create?: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEntryAnalyticsInput
    connect?: LinkWhereUniqueInput
  }

  export type BlogUpdateOneWithoutEntryAnalyticsNestedInput = {
    create?: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutEntryAnalyticsInput
    upsert?: BlogUpsertWithoutEntryAnalyticsInput
    disconnect?: boolean
    delete?: boolean
    connect?: BlogWhereUniqueInput
    update?: XOR<BlogUpdateWithoutEntryAnalyticsInput, BlogUncheckedUpdateWithoutEntryAnalyticsInput>
  }

  export type LinkUpdateOneWithoutEntryAnalyticsNestedInput = {
    create?: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEntryAnalyticsInput
    upsert?: LinkUpsertWithoutEntryAnalyticsInput
    disconnect?: boolean
    delete?: boolean
    connect?: LinkWhereUniqueInput
    update?: XOR<LinkUpdateWithoutEntryAnalyticsInput, LinkUncheckedUpdateWithoutEntryAnalyticsInput>
  }

  export type BlogUncheckedUpdateOneWithoutEntryAnalyticsNestedInput = {
    create?: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutEntryAnalyticsInput
    upsert?: BlogUpsertWithoutEntryAnalyticsInput
    disconnect?: boolean
    delete?: boolean
    connect?: BlogWhereUniqueInput
    update?: XOR<BlogUpdateWithoutEntryAnalyticsInput, BlogUncheckedUpdateWithoutEntryAnalyticsInput>
  }

  export type LinkUncheckedUpdateOneWithoutEntryAnalyticsNestedInput = {
    create?: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutEntryAnalyticsInput
    upsert?: LinkUpsertWithoutEntryAnalyticsInput
    disconnect?: boolean
    delete?: boolean
    connect?: LinkWhereUniqueInput
    update?: XOR<LinkUpdateWithoutEntryAnalyticsInput, LinkUncheckedUpdateWithoutEntryAnalyticsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumPLANFilter = {
    equals?: PLAN
    in?: Enumerable<PLAN>
    notIn?: Enumerable<PLAN>
    not?: NestedEnumPLANFilter | PLAN
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumPLANWithAggregatesFilter = {
    equals?: PLAN
    in?: Enumerable<PLAN>
    notIn?: Enumerable<PLAN>
    not?: NestedEnumPLANWithAggregatesFilter | PLAN
    _count?: NestedIntFilter
    _min?: NestedEnumPLANFilter
    _max?: NestedEnumPLANFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type PageCreateWithoutUserInput = {
    id?: string
    pageEntries?: PageEntryCreateNestedManyWithoutPageInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUncheckedCreateWithoutUserInput = {
    id?: string
    pageEntries?: PageEntryUncheckedCreateNestedManyWithoutPageInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageCreateOrConnectWithoutUserInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutUserInput, PageUncheckedCreateWithoutUserInput>
  }

  export type PageCreateManyUserInputEnvelope = {
    data: Enumerable<PageCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PageUpsertWithWhereUniqueWithoutUserInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutUserInput, PageUncheckedUpdateWithoutUserInput>
    create: XOR<PageCreateWithoutUserInput, PageUncheckedCreateWithoutUserInput>
  }

  export type PageUpdateWithWhereUniqueWithoutUserInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutUserInput, PageUncheckedUpdateWithoutUserInput>
  }

  export type PageUpdateManyWithWhereWithoutUserInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutPageInput>
  }

  export type PageScalarWhereInput = {
    AND?: Enumerable<PageScalarWhereInput>
    OR?: Enumerable<PageScalarWhereInput>
    NOT?: Enumerable<PageScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutPageInput = {
    id?: string
    username: string
    email: string
    plan?: PLAN
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPageInput = {
    id?: string
    username: string
    email: string
    plan?: PLAN
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPageInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPageInput, UserUncheckedCreateWithoutPageInput>
  }

  export type PageEntryCreateWithoutPageInput = {
    id?: string
    link?: LinkCreateNestedOneWithoutPageEntryInput
    blog?: BlogCreateNestedOneWithoutPageEntryInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUncheckedCreateWithoutPageInput = {
    id?: string
    linkId?: string | null
    blogId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryCreateOrConnectWithoutPageInput = {
    where: PageEntryWhereUniqueInput
    create: XOR<PageEntryCreateWithoutPageInput, PageEntryUncheckedCreateWithoutPageInput>
  }

  export type PageEntryCreateManyPageInputEnvelope = {
    data: Enumerable<PageEntryCreateManyPageInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPageInput = {
    update: XOR<UserUpdateWithoutPageInput, UserUncheckedUpdateWithoutPageInput>
    create: XOR<UserCreateWithoutPageInput, UserUncheckedCreateWithoutPageInput>
  }

  export type UserUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    plan?: EnumPLANFieldUpdateOperationsInput | PLAN
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUpsertWithWhereUniqueWithoutPageInput = {
    where: PageEntryWhereUniqueInput
    update: XOR<PageEntryUpdateWithoutPageInput, PageEntryUncheckedUpdateWithoutPageInput>
    create: XOR<PageEntryCreateWithoutPageInput, PageEntryUncheckedCreateWithoutPageInput>
  }

  export type PageEntryUpdateWithWhereUniqueWithoutPageInput = {
    where: PageEntryWhereUniqueInput
    data: XOR<PageEntryUpdateWithoutPageInput, PageEntryUncheckedUpdateWithoutPageInput>
  }

  export type PageEntryUpdateManyWithWhereWithoutPageInput = {
    where: PageEntryScalarWhereInput
    data: XOR<PageEntryUpdateManyMutationInput, PageEntryUncheckedUpdateManyWithoutPageEntriesInput>
  }

  export type PageEntryScalarWhereInput = {
    AND?: Enumerable<PageEntryScalarWhereInput>
    OR?: Enumerable<PageEntryScalarWhereInput>
    NOT?: Enumerable<PageEntryScalarWhereInput>
    id?: StringFilter | string
    linkId?: StringNullableFilter | string | null
    blogId?: StringNullableFilter | string | null
    pageId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type LinkCreateWithoutPageEntryInput = {
    id?: string
    displayText: string
    link: string
    mediaUrl?: string | null
    entryAnalytics?: EntryAnalyticsCreateNestedOneWithoutLinkInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkUncheckedCreateWithoutPageEntryInput = {
    id?: string
    displayText: string
    link: string
    mediaUrl?: string | null
    entryAnalyticsId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkCreateOrConnectWithoutPageEntryInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutPageEntryInput, LinkUncheckedCreateWithoutPageEntryInput>
  }

  export type BlogCreateWithoutPageEntryInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    entryAnalytics?: EntryAnalyticsCreateNestedOneWithoutBlogInput
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUncheckedCreateWithoutPageEntryInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    entryAnalyticsId: string
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogCreateOrConnectWithoutPageEntryInput = {
    where: BlogWhereUniqueInput
    create: XOR<BlogCreateWithoutPageEntryInput, BlogUncheckedCreateWithoutPageEntryInput>
  }

  export type PageCreateWithoutPageEntriesInput = {
    id?: string
    user?: UserCreateNestedOneWithoutPageInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUncheckedCreateWithoutPageEntriesInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageCreateOrConnectWithoutPageEntriesInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutPageEntriesInput, PageUncheckedCreateWithoutPageEntriesInput>
  }

  export type LinkUpsertWithoutPageEntryInput = {
    update: XOR<LinkUpdateWithoutPageEntryInput, LinkUncheckedUpdateWithoutPageEntryInput>
    create: XOR<LinkCreateWithoutPageEntryInput, LinkUncheckedCreateWithoutPageEntryInput>
  }

  export type LinkUpdateWithoutPageEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalytics?: EntryAnalyticsUpdateOneWithoutLinkNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUncheckedUpdateWithoutPageEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUpsertWithoutPageEntryInput = {
    update: XOR<BlogUpdateWithoutPageEntryInput, BlogUncheckedUpdateWithoutPageEntryInput>
    create: XOR<BlogCreateWithoutPageEntryInput, BlogUncheckedCreateWithoutPageEntryInput>
  }

  export type BlogUpdateWithoutPageEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalytics?: EntryAnalyticsUpdateOneWithoutBlogNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateWithoutPageEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    entryAnalyticsId?: StringFieldUpdateOperationsInput | string
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpsertWithoutPageEntriesInput = {
    update: XOR<PageUpdateWithoutPageEntriesInput, PageUncheckedUpdateWithoutPageEntriesInput>
    create: XOR<PageCreateWithoutPageEntriesInput, PageUncheckedCreateWithoutPageEntriesInput>
  }

  export type PageUpdateWithoutPageEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutPageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateWithoutPageEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateWithoutLinkInput = {
    id?: string
    blog?: BlogCreateNestedOneWithoutPageEntryInput
    Page?: PageCreateNestedOneWithoutPageEntriesInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUncheckedCreateWithoutLinkInput = {
    id?: string
    blogId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryCreateOrConnectWithoutLinkInput = {
    where: PageEntryWhereUniqueInput
    create: XOR<PageEntryCreateWithoutLinkInput, PageEntryUncheckedCreateWithoutLinkInput>
  }

  export type PageEntryCreateManyLinkInputEnvelope = {
    data: Enumerable<PageEntryCreateManyLinkInput>
    skipDuplicates?: boolean
  }

  export type EntryAnalyticsCreateWithoutLinkInput = {
    id?: string
    lifetimeClicks?: number
    blog?: BlogCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsUncheckedCreateWithoutLinkInput = {
    id?: string
    lifetimeClicks?: number
    blog?: BlogUncheckedCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsCreateOrConnectWithoutLinkInput = {
    where: EntryAnalyticsWhereUniqueInput
    create: XOR<EntryAnalyticsCreateWithoutLinkInput, EntryAnalyticsUncheckedCreateWithoutLinkInput>
  }

  export type PageEntryUpsertWithWhereUniqueWithoutLinkInput = {
    where: PageEntryWhereUniqueInput
    update: XOR<PageEntryUpdateWithoutLinkInput, PageEntryUncheckedUpdateWithoutLinkInput>
    create: XOR<PageEntryCreateWithoutLinkInput, PageEntryUncheckedCreateWithoutLinkInput>
  }

  export type PageEntryUpdateWithWhereUniqueWithoutLinkInput = {
    where: PageEntryWhereUniqueInput
    data: XOR<PageEntryUpdateWithoutLinkInput, PageEntryUncheckedUpdateWithoutLinkInput>
  }

  export type PageEntryUpdateManyWithWhereWithoutLinkInput = {
    where: PageEntryScalarWhereInput
    data: XOR<PageEntryUpdateManyMutationInput, PageEntryUncheckedUpdateManyWithoutPageEntryInput>
  }

  export type EntryAnalyticsUpsertWithoutLinkInput = {
    update: XOR<EntryAnalyticsUpdateWithoutLinkInput, EntryAnalyticsUncheckedUpdateWithoutLinkInput>
    create: XOR<EntryAnalyticsCreateWithoutLinkInput, EntryAnalyticsUncheckedCreateWithoutLinkInput>
  }

  export type EntryAnalyticsUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    blog?: BlogUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type EntryAnalyticsUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    blog?: BlogUncheckedUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type PageEntryCreateWithoutBlogInput = {
    id?: string
    link?: LinkCreateNestedOneWithoutPageEntryInput
    Page?: PageCreateNestedOneWithoutPageEntriesInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUncheckedCreateWithoutBlogInput = {
    id?: string
    linkId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryCreateOrConnectWithoutBlogInput = {
    where: PageEntryWhereUniqueInput
    create: XOR<PageEntryCreateWithoutBlogInput, PageEntryUncheckedCreateWithoutBlogInput>
  }

  export type PageEntryCreateManyBlogInputEnvelope = {
    data: Enumerable<PageEntryCreateManyBlogInput>
    skipDuplicates?: boolean
  }

  export type EntryAnalyticsCreateWithoutBlogInput = {
    id?: string
    lifetimeClicks?: number
    link?: LinkCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsUncheckedCreateWithoutBlogInput = {
    id?: string
    lifetimeClicks?: number
    link?: LinkUncheckedCreateNestedOneWithoutEntryAnalyticsInput
  }

  export type EntryAnalyticsCreateOrConnectWithoutBlogInput = {
    where: EntryAnalyticsWhereUniqueInput
    create: XOR<EntryAnalyticsCreateWithoutBlogInput, EntryAnalyticsUncheckedCreateWithoutBlogInput>
  }

  export type PageEntryUpsertWithWhereUniqueWithoutBlogInput = {
    where: PageEntryWhereUniqueInput
    update: XOR<PageEntryUpdateWithoutBlogInput, PageEntryUncheckedUpdateWithoutBlogInput>
    create: XOR<PageEntryCreateWithoutBlogInput, PageEntryUncheckedCreateWithoutBlogInput>
  }

  export type PageEntryUpdateWithWhereUniqueWithoutBlogInput = {
    where: PageEntryWhereUniqueInput
    data: XOR<PageEntryUpdateWithoutBlogInput, PageEntryUncheckedUpdateWithoutBlogInput>
  }

  export type PageEntryUpdateManyWithWhereWithoutBlogInput = {
    where: PageEntryScalarWhereInput
    data: XOR<PageEntryUpdateManyMutationInput, PageEntryUncheckedUpdateManyWithoutPageEntryInput>
  }

  export type EntryAnalyticsUpsertWithoutBlogInput = {
    update: XOR<EntryAnalyticsUpdateWithoutBlogInput, EntryAnalyticsUncheckedUpdateWithoutBlogInput>
    create: XOR<EntryAnalyticsCreateWithoutBlogInput, EntryAnalyticsUncheckedCreateWithoutBlogInput>
  }

  export type EntryAnalyticsUpdateWithoutBlogInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    link?: LinkUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type EntryAnalyticsUncheckedUpdateWithoutBlogInput = {
    id?: StringFieldUpdateOperationsInput | string
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    link?: LinkUncheckedUpdateOneWithoutEntryAnalyticsNestedInput
  }

  export type BlogCreateWithoutEntryAnalyticsInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    pageEntry?: PageEntryCreateNestedManyWithoutBlogInput
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUncheckedCreateWithoutEntryAnalyticsInput = {
    id?: string
    name: string
    rating?: number | null
    location?: string | null
    externalLink?: string | null
    pageEntry?: PageEntryUncheckedCreateNestedManyWithoutBlogInput
    mediaUrl?: string | null
    lifetimeClicks?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogCreateOrConnectWithoutEntryAnalyticsInput = {
    where: BlogWhereUniqueInput
    create: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
  }

  export type LinkCreateWithoutEntryAnalyticsInput = {
    id?: string
    displayText: string
    link: string
    pageEntry?: PageEntryCreateNestedManyWithoutLinkInput
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkUncheckedCreateWithoutEntryAnalyticsInput = {
    id?: string
    displayText: string
    link: string
    pageEntry?: PageEntryUncheckedCreateNestedManyWithoutLinkInput
    mediaUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LinkCreateOrConnectWithoutEntryAnalyticsInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
  }

  export type BlogUpsertWithoutEntryAnalyticsInput = {
    update: XOR<BlogUpdateWithoutEntryAnalyticsInput, BlogUncheckedUpdateWithoutEntryAnalyticsInput>
    create: XOR<BlogCreateWithoutEntryAnalyticsInput, BlogUncheckedCreateWithoutEntryAnalyticsInput>
  }

  export type BlogUpdateWithoutEntryAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    pageEntry?: PageEntryUpdateManyWithoutBlogNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateWithoutEntryAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    externalLink?: NullableStringFieldUpdateOperationsInput | string | null
    pageEntry?: PageEntryUncheckedUpdateManyWithoutBlogNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    lifetimeClicks?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUpsertWithoutEntryAnalyticsInput = {
    update: XOR<LinkUpdateWithoutEntryAnalyticsInput, LinkUncheckedUpdateWithoutEntryAnalyticsInput>
    create: XOR<LinkCreateWithoutEntryAnalyticsInput, LinkUncheckedCreateWithoutEntryAnalyticsInput>
  }

  export type LinkUpdateWithoutEntryAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    pageEntry?: PageEntryUpdateManyWithoutLinkNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUncheckedUpdateWithoutEntryAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    displayText?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    pageEntry?: PageEntryUncheckedUpdateManyWithoutLinkNestedInput
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageEntries?: PageEntryUpdateManyWithoutPageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageEntries?: PageEntryUncheckedUpdateManyWithoutPageNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateManyPageInput = {
    id?: string
    linkId?: string | null
    blogId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    link?: LinkUpdateOneWithoutPageEntryNestedInput
    blog?: BlogUpdateOneWithoutPageEntryNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateWithoutPageInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: NullableStringFieldUpdateOperationsInput | string | null
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateManyWithoutPageEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: NullableStringFieldUpdateOperationsInput | string | null
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateManyLinkInput = {
    id?: string
    blogId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    blog?: BlogUpdateOneWithoutPageEntryNestedInput
    Page?: PageUpdateOneWithoutPageEntriesNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateManyWithoutPageEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    blogId?: NullableStringFieldUpdateOperationsInput | string | null
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryCreateManyBlogInput = {
    id?: string
    linkId?: string | null
    pageId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageEntryUpdateWithoutBlogInput = {
    id?: StringFieldUpdateOperationsInput | string
    link?: LinkUpdateOneWithoutPageEntryNestedInput
    Page?: PageUpdateOneWithoutPageEntriesNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageEntryUncheckedUpdateWithoutBlogInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: NullableStringFieldUpdateOperationsInput | string | null
    pageId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}