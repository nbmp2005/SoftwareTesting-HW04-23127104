# Git Commit Plan and Log Guide

## Qualifying commit plan

At least eight commits must each make a meaningful change to a test script (`.spec.ts`, `.spec.js`, or equivalent). The following is a planning pattern, not a list of commits to fabricate:

| Planned commit | Meaningful test-script change | Done/SHA |
|---:|---|---|
| 1 | Feature A happy path and first assertions | [TODO] |
| 2 | Feature A negative/data-driven cases | [TODO] |
| 3 | Feature A boundary/reliability corrections | [TODO] |
| 4 | Feature B happy path and first assertions | [TODO] |
| 5 | Feature B negative/state cases | [TODO] |
| 6 | Feature B cross-browser corrections | [TODO] |
| 7 | Feature C happy path/authorization cases | [TODO] |
| 8 | Feature C edge cases and review fixes | [TODO] |

Each commit should capture a coherent increment that was actually reviewed or run. Documentation-only commits do not count.

## Export commands

After the real history exists, export a text log using a non-destructive command such as:

```powershell
git log --date=iso-strict --pretty=format:"%H`t%ad`t%an`t%s" --name-only
```

Save the output as the required text artifact using your terminal/editor, then inspect it. To audit candidate commits that touched specs:

```powershell
git log --oneline -- '*.spec.ts' '*.spec.js'
```

Do not split one change artificially or rewrite public history solely to manufacture the count.
