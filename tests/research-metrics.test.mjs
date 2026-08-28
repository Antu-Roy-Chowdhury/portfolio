import test from "node:test"
import assert from "node:assert/strict"
import { calculateHIndex } from "../lib/research-metrics-utils.js"

test("h-index uses the maximum number of papers with at least h citations", () => {
  assert.equal(calculateHIndex([50, 20, 10, 5, 2]), 4)
  assert.equal(calculateHIndex([3, 3, 3]), 3)
  assert.equal(calculateHIndex([1, 0, 0]), 1)
  assert.equal(calculateHIndex([]), 0)
})

test("h-index ignores invalid and negative citation counts", () => {
  assert.equal(calculateHIndex(["5", 2, null, -1, "not-a-number"]), 2)
})
