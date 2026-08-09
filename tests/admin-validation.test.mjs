import test from "node:test"
import assert from "node:assert/strict"
import {
  assertDateOrder,
  assertYearOrder,
  checkboxValue,
  colorValue,
  dateValue,
  integerValue,
  slugValue,
  uniqueCsv,
  uniqueLines,
  urlValue,
} from "../lib/admin-validation.js"

test("URLs accept http(s) and intentional internal paths", () => {
  assert.equal(urlValue("https://example.com/a", "URL"), "https://example.com/a")
  assert.equal(urlValue("/contact", "URL", { allowRelative: true }), "/contact")
  assert.throws(() => urlValue("javascript:alert(1)", "URL"), /valid http/)
  assert.throws(() => urlValue("//evil.example", "URL", { allowRelative: true }), /valid http/)
})

test("integer, year/date order, slug, and color validation reject invalid input", () => {
  assert.equal(integerValue("4", "Sort order"), 4)
  assert.throws(() => integerValue("4.5", "Sort order"), /whole number/)
  assert.equal(dateValue("2026-08-09", "Date"), "2026-08-09")
  assert.throws(() => dateValue("2026-02-30", "Date"), /valid date/)
  assert.throws(() => assertDateOrder("2026-08-10", "2026-08-09"), /cannot be before/)
  assert.throws(() => assertYearOrder(2027, 2026), /cannot be before/)
  assert.equal(slugValue("My-Project"), "my-project")
  assert.throws(() => slugValue("bad slug"), /Slug must/)
  assert.equal(colorValue("#7DD3FC", "Color"), "#7dd3fc")
})

test("checkbox and list normalization are deterministic", () => {
  assert.equal(checkboxValue("on"), true)
  assert.equal(checkboxValue(undefined), false)
  assert.deepEqual(uniqueCsv("React, react, Next.js"), ["React", "Next.js"])
  assert.deepEqual(uniqueLines("One\n one \nTwo"), ["One", "Two"])
})
