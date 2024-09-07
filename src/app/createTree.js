/** Yield parts of the string, separated by the delimiter
 *
 * @param {string} str input string
 * @param {string} delimiter one-character string
 * @yields {string}
 */
function* splitBy(str, delimiter) {
  console.assert(delimiter.length === 1);
  let i = 0,
    j = 0;
  while (true) {
    if (i === str.length) {
      yield str.slice(j, i);
      break;
    }
    if (str[i] === delimiter) {
      yield str.slice(j, i);
      j = i + 1;
    }
    ++i;
  }
}

/** Count the amount of leading space characters
 *
 * @param {string} str input string
 * @returns {int}
 */
function countLeadingSpace(str) {
  let count = 0;
  for (let c of str) {
    if (c !== " ") break;
    ++count;
  }
  return count;
}

/** Get indent amount and content for each line of string
 *
 * @param {String} str input string
 * @yields {Array<int, string>}
 */
function* indentedBlocks(str) {
  let count = 0;
  for (let line of splitBy(str, "\n")) {
    count = countLeadingSpace(line);
    yield [count, line.slice(count)];
  }
}

class TreeCreationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Go to the upper tree, unwinding indentation stack
 *
 * @param {Array<Array<int, int>>} indent_stack indentation stack
 * @param {Array<Array<string | Array>} subtree_stack outer trees stack
 * @param {int} indent current indentation level
 * @returns {Array<string | Array>}
 */
function dedent(indent_stack, subtree_stack, indent) {
  while (indent_stack.length != 0) {
    let [parent_indent, last_indent] = indent_stack.pop();
    let subtree = subtree_stack.pop();
    if (indent >= parent_indent && indent <= last_indent) {
      return subtree;
    }
  }

  throw new Error(
    "indent level less than all previous levels",
  );
}

/** Create a nested list from indented string
 *
 * @param {string} str input string
 * @returns {Array<string | Array>}
 */
function createTree(str) {
  let tree = [];
  let subtree = tree;

  let indents = [[-1, 0]];
  let subtrees = [];
  let line_count = 0;
  for (let [indent, content] of indentedBlocks(str)) {
    let [parent_indent, last_indent] = indents[indents.length - 1];

    ++line_count;
    if (line_count == 1 && indent > 0) {
      throw new TreeCreationError("first line must not be indented");
    }

    // If the current indent is greater than the last indent
    // then save current indent, create inner level subtree and save
    // current level subtree - step down.
    if (indent > last_indent) {
      // last_indent becomes parent indent as we step deeply
      indents.push([last_indent, indent]);
      let inner = [content];
      subtree.push(inner);
      subtrees.push(subtree);
      subtree = inner;
    }

    // All indents that are greater than parent indent considered
    // nested. We are on the same level, push current block to the
    // current level of the tree.
    else if (indent > parent_indent) {
      subtree.push(content);
    }

    // If the level is less than last parent's level, step up.
    else if (indent <= parent_indent) {
      subtree = dedent(indents, subtrees, indent);
      subtree.push(content);
    }
  }

  return tree;
}


// TODO: write unit tests!
// console.log([...splitBy("hello world", " ")]);
// console.log([...splitBy(" h e l l o ", " ")]);
// console.log([...splitBy("   ", " ")]);
// console.log([...splitBy("", " ")]);
// console.log([...splitBy("hello", "\n")]);
//
// console.log(countLeadingSpace("hello"));
// console.log(countLeadingSpace("  hello"));
// console.log(countLeadingSpace(""));
//
// console.log([...indentedBlocks("line1\n line2\n  line3")]);
// console.log([...indentedBlocks("line1\n\n   line3")]);
// console.log([...indentedBlocks("")]);
//
// console.log(createTree("line1\nline2"));
// console.log(createTree("line1\n  line2"));
// console.log(createTree("line1\n  line2\n  line3"));
// console.log(createTree("line1\n  line2\n    line3"));
// console.log(createTree("line1\n  line2\n    line3\n   line4"));
// console.log(createTree("line1\n  line2\n    line3\n  line4"));
// console.log(createTree("line1\n  line2\n    line3\n line4"));
// console.log(createTree("line1\n  line2\nline3"));
// console.log(createTree("  line1\n  line2\nline3"));