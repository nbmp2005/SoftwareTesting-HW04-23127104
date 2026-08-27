# Git Commit Plan and Log Guide

## Qualifying commit plan

At least eight commits must each make a meaningful change to a test script (`.spec.ts`, `.spec.js`, or equivalent). The following is a planning pattern, not a list of commits to fabricate:

| Planned commit | Meaningful test-script change | Done/SHA |
|---:|---|---|
| 1 | Feature A happy path and first assertions | `de5b1bc` |
| 2 | Feature A negative/data-driven cases | `0008e11` |
| 3 | Feature A boundary/reliability corrections | `b522511`, `296e070`, `77d3b15`, `9f90f9f`, `38028e7` |
| 4 | Feature B happy path and first assertions | `402816f` |
| 5 | Feature B negative/state cases | `402816f` |
| 6 | Feature B cross-browser corrections | `402816f` |
| 7 | Feature C happy path/authorization cases | `402816f` |
| 8 | Feature C edge cases and review fixes | `b334843` |

Each commit should capture a coherent increment that was actually reviewed or run. Documentation-only commits do not count.

## Export commands

After the real history exists, export a text log using a non-destructive command such as:

```powershell
git log --date=iso-strict --pretty=format:"%H`t%ad`t%an`t%s" --name-only
```

The exported text artifact is saved as `report/commit-log.txt`. To audit candidate commits that touched specs:

```powershell
git log --oneline -- '*.spec.ts' '*.spec.js'
```

Do not split one change artificially or rewrite public history solely to manufacture the count.
