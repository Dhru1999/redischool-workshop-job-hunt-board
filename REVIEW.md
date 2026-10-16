# Review checklist

Use this list to review a commit. Report findings only; do not change files.

- [ ] **Acceptance criteria met:** every "Demo acceptance criteria" item in `APP_BRIEF.md` works.
- [ ] **Brief followed:** must-have features are present, out-of-scope items are absent unless listed under "Explicit overrides", and the additional rules are kept (component files under 100 lines).
- [ ] **Labels on inputs:** every input and button has an accessible label, and errors are readable.
- [ ] **Checks pass:** `npm run lint` and `npm run build` finish without errors or warnings.
- [ ] **No unrelated changes:** the commit only touches files needed for the change.
