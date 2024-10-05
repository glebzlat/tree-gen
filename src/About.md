# What is it?

`tree-gen` is an online tree generator tool that mimics the output of the
`tree` Unix command. The reason I wrote it is because it is interesting,
obviously, and because I wanted to try React framework.

## User Interface

I briefly explain the user interface. Alhough it is pretty clear what is what,
because all buttons have icons or titles.

There are following elements in header, from left to right:
- GitHub icon, which is a link to this project's GitHub repository;
- Download button that allows you to download the rendered tree as text file,
- Copy button that allows you to copy the rendered tree,
- Share button that allows you to share the rendered tree as a link,
- Settings, button too, that, basically, opens settings,
- and Appearance switch.

And in footer there are, from left to right:
- "How to use?" button that opens About window and
- Link to my GitHub profile (you can subscribe btw)

## Settings

Settings window has a plenty of options that allow you to alter the
appearance of a rendered tree.

<details>
<summary>Fancy style</summary>

Use characters that `tree` command uses.

```
dir
├── subdir
│   └── file
└── subdif
    ├── file
    └── file
```

</details>

<details>
<summary>ASCII style</summary>

Use plain ASCII characters: `'+'`, `'|'`, and `'-'`.

```
dir
|── subdir
|   +── file
+── subdif
    |── file
    +── file
```

</details>

<details>
<summary>Insert <code>'.'</code> as root node</summary>

```
.
└── dir
    ├── subdir
    │   └── file
    └── subdir
        ├── file
        └── file
```

</details>

<details>
<summary>Full node path</summary>

This setting emulates the output of `tree -f` command.

```
dir
├── dir/subdir
│   └── dir/subdir/file
└── dir/subdir
    ├── dir/subdir/file
    └── dir/subdir/file
```

</details>

<details>
<summary>Trailing slash</summary>

This setting emulates the output of `tree -F` command.

```
dir/
├── subdir/
│   └── file
└── subdir/
    ├── file
    └── file
```

</details>

## Feedback

If you have encountered a bug or have an idea, click that GitHub link at the
top-left corner and file an issue. Also star this project if you liked it.

## License

Licensed under MIT License.
