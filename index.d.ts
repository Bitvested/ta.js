/**
 * Type declarations for ta.js 2.0.
 *
 * The runtime module is CommonJS (`module.exports = registry`), so it is
 * declared with `export =`. All three consumer styles type-check:
 *
 *   import ta from 'ta.js';            // the whole registry
 *   import { sma, rsi } from 'ta.js';  // individual functions
 *   const ta = require('ta.js');
 *
 * Input shapes are not uniform across the library: some functions take a plain
 * series of values, others take rows. Each group below states the row layout it
 * expects — the layout is a positional convention, so a wrong order compiles
 * but produces wrong numbers.
 *
 * Row layouts used by this library:
 *   [high, close, low]           atr, stoch, cci, supertrend, ...
 *   [high, low]                  don, mass, ao, ac, psar, zigzag, ren, fractals
 *   [high, low, volume]          emv
 *   [high, close, low, volume]   adl, cmf, chaikin_osc, kvo
 *   [open, high, low, close]     bop, rvi, ha
 *   [price, volume]              vwma, vwwma, fibbands, fi, vwap
 *   [close, volume]              nvi, pvi
 *   [volume, close]              obv
 *   [buy volume, sell volume]    mfi
 */
declare namespace ta {
  /** A point on a line returned by `support` / `resistance`. */
  interface HighLow {
    index: number;
    value: number;
  }

  /** Lower line: value where it starts, and its slope per bar. */
  interface SupportLine {
    calculate(pos: number): number;
    slope: number;
    lowest: number;
    index: number;
  }

  /** Upper line: value where it starts, and its slope per bar. */
  interface ResistanceLine {
    calculate(pos: number): number;
    slope: number;
    highest: number;
    index: number;
  }

  // ---------------------------------------------------------------- moving averages
  // Input: series of values.

  function sma(data: number[], length?: number): number[];
  function smma(data: number[], length?: number): number[];
  function wma(data: number[], length?: number): number[];
  function ema(data: number[], length?: number): number[];
  function hull(data: number[], length?: number): number[];
  function lsma(data: number[], length?: number): number[];
  function wsma(data: number[], length?: number): number[];
  function pwma(data: number[], length?: number): number[];
  function hwma(data: number[], length?: number): number[];
  function kama(data: number[], len1?: number, len2?: number, len3?: number): number[];
  function dema(data: number[], length?: number): number[];
  function tema(data: number[], length?: number): number[];
  function trima(data: number[], length?: number): number[];
  function t3(data: number[], length?: number, vfactor?: number): number[];
  function zlema(data: number[], length?: number): number[];
  function vidya(data: number[], shortLength?: number, longLength?: number, alpha?: number): number[];
  /** Weighted by an explicit weights series, not by position. */
  function cwma(data: number[], weights: number[]): number[];
  /** Input rows: [price, volume]. */
  function vwma(data: number[][], length?: number): number[];
  /** Input rows: [price, volume]. */
  function vwwma(data: number[][], length?: number): number[];

  // ---------------------------------------------------------------- indicators
  // Input: series of values unless a row layout is stated.

  function macd(data: number[], length1?: number, length2?: number): number[];
  function macd_signal(data: number[], length1?: number, length2?: number, lengthsig?: number): number[];
  function macd_bars(data: number[], length1?: number, length2?: number, lengthsig?: number): number[];
  function rsi(data: number[], length?: number): number[];
  function wrsi(data: number[], length?: number): number[];
  /** Output rows: [tsi, signal]. */
  function tsi(data: number[], long?: number, short?: number, signal?: number): [number, number][];
  /** Input rows: [open, high, low, close]. */
  function bop(data: number[][], len?: number): number[];
  /** Input rows: [close, volume]. */
  function fi(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function asi(data: number[][]): number[];
  /**
   * Input is a single price series — pass `hl2` to reproduce the standard
   * indicator. Output rows: [jaw, teeth, lips], one per input bar, each line
   * displaced right by its own shift (NaN until that line's first bar).
   */
  function alligator(
    data: number[],
    jawLength?: number,
    teethLength?: number,
    lipLength?: number,
    jawShift?: number,
    teethShift?: number,
    lipShift?: number
  ): [number, number, number][];
  function pr(data: number[], length?: number): number[];
  /** Input rows: [high, close, low]. Output rows: [%K, %D]. */
  function stoch(data: number[][], length?: number, smoothd?: number, smoothk?: number): [number, number][];
  /** Fibonacci retracement levels between two prices. */
  function fib(start: number, end: number): number[];
  function bandwidth(data: number[], length?: number, deviations?: number): number[];
  /** Input rows: [high, close, low]. Output rows: [tenkan, kijun, senkouA, senkouB, chikou]. */
  function ichimoku(
    data: number[][],
    length1?: number,
    length2?: number,
    length3?: number,
    length4?: number
  ): number[][];
  /** Input rows: [high, close, low]. */
  function atr(data: number[][], length?: number): number[];
  /** Input rows: [buy volume, sell volume]. */
  function mfi(data: number[][], length?: number): number[];
  function roc(data: number[], length?: number): number[];
  function cop(data: number[], len1?: number, len2?: number, len3?: number): number[];
  /** Output rows: [kst, signal]. */
  function kst(
    data: number[],
    r1?: number,
    r2?: number,
    r3?: number,
    r4?: number,
    s1?: number,
    s2?: number,
    s3?: number,
    s4?: number,
    sig?: number
  ): [number, number][];
  /** Input rows: [volume, close]. */
  function obv(data: number[][]): number[];
  /** Input rows: [price, volume]. */
  function vwap(data: number[][], length?: number): number[];
  /** Input rows: [high, low]. Flags index 0 as an upper fractal, index 1 as a lower. */
  function fractals(data: number[][], price?: false): boolean[][];
  function fractals(data: number[][], price: true): number[][];
  /** Index/cross of two series, one entry per bar of the shorter series. */
  function cross(d1: number[], d2: number[]): { index: number; cross: boolean }[];
  function mom(data: number[], length?: number, percent?: boolean): number[];
  /** Input rows: [high, close, low]. Output rows: [value, atr, trend, direction]. */
  function halftrend(
    data: number[][],
    atrlen: number,
    amplitude: number,
    deviation: number
  ): (number | 'long' | 'short')[][];
  /** Input rows: [high, low]. */
  function zigzag(data: number[][], perc?: number): number[];
  /** Input rows: [high, low]. */
  function psar(data: number[][], step?: number, max?: number): number[];
  /** Input rows: [high, close, low]. Output rows: [supertrend, direction]. */
  function supertrend(data: number[][], length?: number, multiplier?: number): [number, number][];
  /** Output rows: [bull power, bear power]. */
  function elderray(data: number[], length?: number): [number, number][];
  function hv(data: number[], length?: number): number[];
  /** Input rows: [open, high, low, close]. */
  function rvi(data: number[][], len?: number): number[];
  /** Post-processing of `rvi` output. */
  function rvi_signal(rv: number[]): number[];
  function rsi_divergence(
    data: number[],
    length: number,
    rs?: (data: number[], length?: number) => number[]
  ): number[];
  function divergence(data1: number[], data2: number[]): number[];
  function trix(data: number[], length?: number): number[];
  /** Input rows: [high, close, low, volume]. */
  function adl(data: number[][]): number[];
  /** Input rows: [high, close, low]. */
  function cci(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function pdm(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function mdm(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function pdi(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function mdi(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function dx(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function adx(data: number[][], length?: number): number[];
  /** Input rows: [high, close, low]. */
  function adxr(data: number[][], length?: number): number[];
  /** Output rows: [%K, %D]. */
  function stoch_rsi(
    data: number[],
    rsiLength?: number,
    stochLength?: number,
    smoothK?: number,
    smoothD?: number
  ): [number, number][];
  function ppo(data: number[], length1?: number, length2?: number): number[];
  function apo(data: number[], length1?: number, length2?: number): number[];
  /** Input rows: [high, close, low, volume]. */
  function cmf(data: number[][], length?: number): number[];
  /** Input rows: [close, volume]. */
  function nvi(data: number[][]): number[];
  /** Input rows: [close, volume]. */
  function pvi(data: number[][]): number[];
  /** Input rows: [high, low, volume]. */
  function emv(data: number[][]): number[];
  /** Input rows: [high, close, low]. */
  function natr(data: number[][], length?: number): number[];
  function dpo(data: number[], length?: number): number[];
  /** Input rows: [high, low]. */
  function mass(data: number[][], length?: number): number[];
  function ulcer(data: number[], length?: number): number[];
  /** Input rows: [high, close, low]. Output rows: [+VI, -VI]. */
  function vortex(data: number[][], length?: number): [number, number][];
  /** Input rows: [high, close, low]. Output rows: [%K, %D, %J]. */
  function kdj(data: number[][], length?: number, smoothK?: number, smoothD?: number): [number, number, number][];
  /**
   * Output rows: [upper gator, lower gator], one per input bar, NaN where
   * either line of a pair is undefined. Pass zero shifts to match TradingView's
   * Gator Oscillator, which does not displace its lines.
   */
  function gator(
    data: number[],
    jawLength?: number,
    teethLength?: number,
    lipLength?: number,
    jawShift?: number,
    teethShift?: number,
    lipShift?: number
  ): [number, number][];
  function mom_osc(data: number[], length?: number): number[];
  /** Input rows: [high, close, low, volume]. */
  function chaikin_osc(data: number[][], ema1?: number, ema2?: number): number[];
  /** Input rows: [high, low]. */
  function ao(data: number[][], length1?: number, length2?: number): number[];
  /** Input rows: [high, low]. */
  function ac(data: number[][], len1?: number, len2?: number): number[];
  function fisher(data: number[], len: number): number[];
  /** Input rows: [high, close, low]. */
  function ult(data: number[][], p1?: number, p2?: number, p3?: number): number[];
  /** Input rows: [high, close, low, volume]. */
  function kvo(data: number[][], fast?: number, slow?: number): number[];
  /** Output rows: [upper, middle, lower]. */
  function bands(data: number[], length?: number, deviations?: number): [number, number, number][];
  /** Input rows: [high, close, low]. Output rows: [upper, middle, lower]. */
  function keltner(data: number[][], length?: number, devi?: number): [number, number, number][];
  /** Input rows: [high, low]. Output rows: [upper, middle, lower]. */
  function don(data: number[][], length?: number): [number, number, number][];
  /** Input rows: [price, volume]. Output rows: 13 Fibonacci band levels. */
  function fibbands(data: number[][], length?: number, deviations?: number): number[][];
  /** Output rows: [upper, middle, lower]. */
  function envelope(data: number[], len?: number, p?: number): [number, number, number][];

  // ---------------------------------------------------------------- oscillators

  namespace aroon {
    function up(data: number[], length?: number): number[];
    function down(data: number[], length?: number): number[];
    function osc(data: number[], length?: number): number[];
  }

  // ---------------------------------------------------------------- statistics

  function sum(data: number[]): number;
  function std(data: number[], length?: number): number;
  function std_series(data: number[], length: number): number[];
  function variance(data: number[], length?: number): number[];
  function lr_slope(data: number[], length?: number): number[];
  function lr_intercept(data: number[], length?: number): number[];
  function lr_angle(data: number[], length?: number): number[];
  function tsf(data: number[], length?: number): number[];
  /** Per-column percentile of a set of rows. */
  function percentile(data: number[][], perc: number): number[];
  function ncdf(x: number, mean: number, std: number): number;
  function normsinv(p: number): number;
  function pvalue(t: number, df: number): number;
  function dif(newval: number, oldval: number): number;
  function er(data: number[]): number;
  function ar(data: number[], len?: number): number[];
  function cor(data1: number[], data2: number[]): number;
  function covariance(data1: number[], data2: number[], length: number): number[];
  function mse(data1: number[], data2: number[]): number;
  function kelly(data: number[]): number;
  function winratio(data: number[]): number;
  function avgwin(data: number[]): number;
  function avgloss(data: number[]): number;
  function return_positive(data: number[]): number[];
  function return_negative(data: number[]): number[];
  function drawdown(data: number[]): number;
  function martingale(data: number[], bet: number, max: number, multiplier?: number): number;
  function antimartingale(data: number[], bet: number, max: number, multiplier?: number): number;
  function permutations(data: number[]): number;
  function expected_trails(samples: number): number;
  function median(data: number[], length?: number): number[];
  function mad(data: number[], length?: number): number[];
  function aad(data: number[], length?: number): number[];
  function ssd(data: number[], length?: number): number[];
  function se(data: number[], size?: number): number;
  function recent_high(data: number[], lb?: number): HighLow;
  function recent_low(data: number[], lb?: number): HighLow;
  function log(data: number[]): number[];
  function exp(data: number[]): number[];
  function normalize(data: number[], margin?: number): number[];
  /** `data` is either the original series or a [highest, lowest] pair. */
  function denormalize(data: number[] | number[][], norm: number[], margin?: number): number[];
  /** Output pairs: [normalized, normalized]. */
  function normalize_pair(data1: number[], data2: number[]): number[][];
  function normalize_from(data: number[], value: number): number[];
  function standardize(data: number[]): number[];
  function zscore(data: number[], length?: number): number[];
  function cum(data: number[], length: number): number[];
  function kmeans(data: number[], clusters: number): number[][];

  /**
   * Monte Carlo simulation. With `percentile` the result is the percentile
   * series, without it the raw simulations.
   */
  function sim(data: number[], length?: number, simulations?: number): number[][];
  function sim(data: number[], length: number, simulations: number, percentile: number): number[];

  // ---------------------------------------------------------------- random
  // Every generator takes an optional PRNG from `random.prng`; without one,
  // Math.random is used.

  namespace random {
    /** Deterministic generator seeded by a string or number. */
    function prng(seed: string | number): () => number;
    function pick<T>(data: T[], rng?: () => number): T;
    function range(min: number, max: number, rng?: () => number): number;
    function float(min: number, max: number, rng?: () => number): number;
    function order<T>(data: T[], rng?: () => number): T[];
  }

  // ---------------------------------------------------------------- chart types

  /** Input and output rows: [open, high, low, close]. */
  function ha(data: number[][]): number[][];
  /** Input rows: [high, low]. Output rows: [open, high, low, close]. */
  function ren(data: number[][], bs?: number): number[][];

  // ---------------------------------------------------------------- miscellaneous

  /** First 20 Fibonacci numbers. */
  const fibnumbers: number[];
  function times_up(data: number[], len: number): number[];
  function times_down(data: number[], len: number): number[];
  /** Rising support line; without `hl` the line starts at `recent_low(data)`. */
  function support(d: number[], hl?: HighLow): SupportLine;
  /** Falling resistance line; without `hl` the line starts at `recent_high(data)`. */
  function resistance(d: number[], hl?: HighLow): ResistanceLine;
  /** One row per bar, each holding the divergence labels found for it. */
  function divergence_state(
    data1: number[],
    data2: number[],
    length: number,
    lb: number,
    smoother?: number,
    threshold_ex?: number,
    threshold_nm?: number
  ): string[][];

  // ---------------------------------------------------------------- multi threaded

  namespace multi {
    /** Same simulation as `sim`, run over worker threads. */
    function sim(data: number[], length?: number, simulations?: number): Promise<number[][]>;
    function sim(
      data: number[],
      length: number,
      simulations: number,
      percentile: number
    ): Promise<number[]>;
  }
}

export = ta;
