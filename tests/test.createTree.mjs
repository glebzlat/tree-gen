import assert from "assert";

import {
  splitBy,
  countLeadingSpace,
  indentedBlocks,
  createTree,
} from "../src/app/createTree.mjs";

describe("splitBy", function () {
  assert.deepEqual([...splitBy("hello world", " ")], ["hello", "world"]);
  assert.deepEqual(
    [...splitBy(" h e l l o ", " ")],
    ["", "h", "e", "l", "l", "o", ""],
  );
  assert.deepEqual([...splitBy("   ", " ")], ["", "", "", ""]);
  assert.deepEqual([...splitBy("", " ")], [""]);
  assert.deepEqual([...splitBy("hello", "\n")], ["hello"]);
});

describe("countLeadingSpace", function () {
  assert.equal(countLeadingSpace("hello"), 0);
  assert.equal(countLeadingSpace("  hello"), 2);
  assert.equal(countLeadingSpace(""), 0);
});

describe("indentedBlocks", function () {
  assert.deepEqual(
    [...indentedBlocks("line1\n line2\n  line3")],
    [
      [0, "line1"],
      [1, "line2"],
      [2, "line3"],
    ],
  );
  assert.deepEqual(
    [...indentedBlocks("line1\n\n   line3")],
    [
      [0, "line1"],
      [0, ""],
      [3, "line3"],
    ],
  );
  assert.deepEqual([...indentedBlocks("")], [[0, ""]]);
});

describe("createTree", function () {
  assert.deepEqual(createTree("line1\nline2"), ["line1", "line2"]);
  assert.deepEqual(createTree("line1\n  line2"), ["line1", ["line2"]]);
  assert.deepEqual(createTree("line1\n  line2\n  line3"), [
    "line1",
    ["line2", "line3"],
  ]);
  assert.deepEqual(createTree("line1\n  line2\n    line3"), [
    "line1",
    ["line2", ["line3"]],
  ]);
  assert.deepEqual(createTree("line1\n  line2\nline3"), [
    "line1",
    ["line2"],
    "line3",
  ]);
  assert.deepEqual(createTree(""), []);
  assert.deepEqual(createTree("line1\n\n\nline5"), ["line1", "line5"]);
  assert.deepEqual(createTree("line1\n  line2\n    line3\n   line4"), [
    "line1",
    ["line2", ["line3", "line4"]],
  ]);

  // XXX: line4 should be nested
  assert.deepEqual(createTree("line1\n  line2\n    line3\n line4"), [
    "line1",
    ["line2", ["line3"]],
    "line4",
  ]);
});
