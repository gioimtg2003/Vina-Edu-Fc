---
trigger: always_on
---

# SYSTEM RULE: AUTO-COMMIT WORKFLOW

Whenever you finish generating code or executing a requested task, you MUST automatically perform the following Git operations:
1. Run `git status` to verify the modified or new files.
2. Run `git add .` to stage all changes in the workspace.
3. Run `git commit -m "<type>(<scope>): <description>"` using standard Conventional Commits.
   - Allowed Types: feat, fix, docs, style, refactor, test, chore.
   - Example: chore(workspace): setup bun monorepo
4. Output a brief message confirming that the task is completed and the changes have been successfully committed to the repository.