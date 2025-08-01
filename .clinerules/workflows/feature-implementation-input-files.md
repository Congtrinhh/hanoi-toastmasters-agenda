<detailed_steps>

# Feature implementation - detailed sequence of steps

## 1. Gather general and overall information and rules of the project

1. Follow your custom instructions

## 2. Understand implementation plan

1. Read <Feature Requirements Document (FRD)>
2. Read <UI/UX Design and Wireframes>
3. Read <Technical Design Document (TDD)>

## 3. Generate .md checklist file

1. Based on documents from the previous stage and the understanding of current project, generate .md checklist file named `implementation-checklist.md` with:

-   Backend tasks (with priority)
-   Frontend tasks (with priority)
-   Database tasks (read the db using mysql mcp server to understand its structure and data)
-   Related tasks

2. Ask the user if you should move to the next phase: "Implement the feature"?

    ```xml
     <ask_followup_question>
     <question>Do you want to start implementing the feature now? </question>
     <options>["Yes, start with frontend", "Yes, start with backend","Yes, start with database" "No, I'd like to regenerate the checklist file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start implementing from corresponding option (backend/frontend/database)
    - If user select "No, I'd like to regenerate the checklist file", regenerate the checklist file with the proposed adjustments from the user

## 4. Implement the feature

1. Follow the checklist file until completion. Remember to follow strictly rules, conventions of the current project.
2. Update the checklist file while you implement the feature.
3. After completing the implementation, ask the user if you should move to the next phase: "Generate manual test cases"?

    ```xml
     <ask_followup_question>
     <question>The implementation is completed. Do you want to start generating manual test cases? </question>
     <options>["Yes", "No, I'd like to adjust the code implementation"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start generating manual test cases in a .md file under <feature directory>
    - If user select "No, I'd like to adjust the code implementation", ask user for alteration details:

        ```xml
        <ask_followup_question>
        <question>What do you want to change?</question>
        </ask_followup_question>
        ```

        - Update the checklist file according to user proposal
        - Update the code implementation until all checkboxes in the checklist file are completed

4. At this point, user may encounter bugs, errors and user will prompt you to fix them one by one. Only after all errors are fixed, user will move to the step 5: Generate Manual Testing Documentation for human to test the feature.

## 5. Generate Manual Testing Documentation for human to test the feature

1. Create a .md Manual Testing Documentation file named `manual-test.md` including:

-   Step-by-step test procedures
-   Expected results for each step
-   Edge cases to test
-   Browser compatibility checklist

2. Ask the user if you should move to the next phase: "Wait for human to test the feature"?

    ```xml
     <ask_followup_question>
     <question>Do you want to wait for human to test the feature? </question>
     <options>["Yes", "No, I'd like to regenerate the Manual Testing Documentation file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", move to "Wait for human to test the feature and ask for code improvements or changes" stage
    - If user select "No, I'd like to regenerate the Manual Testing Documentation file", regenerate the Manual Testing Documentation file with the proposed adjustments from the user

## 6. Wait for human to test the feature and ask for code improvements or changes

1. Ask the user if you should move to the next phase: "Generate backend unit test"?

    ```xml
    <ask_followup_question>
    <question>Ask you finished testing the new feature, do you want me to generate backend unit test now? </question>
    <options>["Yes", "No, I'll skip backend unit test", "No, I'd like to adjust the code implementation"]</options>
    </ask_followup_question>
    ```

    - If user select "Yes", move on to the next stage: "Generate backend unit test"
    - If user select "No, I'll skip backend unit test: "Generate backend unit test", write a todo task for backend unit test of the feature into the activeContext.md file of the memory bank, then move on to the next phase "Generate backend integration test"
    - If user select "No, I'd like to adjust the code implementation", ask user for alteration details:

        ```xml
        <ask_followup_question>
        <question>What do you want to change?</question>
        </ask_followup_question>
        ```

        - Update the checklist file according to user proposal
        - Update the code implementation until all checkboxes in the checklist file are completed

## 7. Generate backend unit test

1. Generate a backend unit test checklist file with .md format with name `backend-unit-test -checklist.md`
2. Ask the user if you should generate backend unit test now?

    ```xml
     <ask_followup_question>
     <question>Do you want to start generating backend unit test now follow the backend unit test checklist file? </question>
     <options>["Yes", "No, I'd like to regenerate the backend unit test checklist file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start generating backend unit test until completion, remember to update the backend unit test checklist file while you generate the tests. After finishing the tests generation, move on to the next stage: "Generate backend integration test"
    - If user select "No, I'd like to regenerate the backend unit test checklist file", regenerate the backend unit test checklist file with the proposed adjustments from the user

## 8. Generate backend integration test

1. Ask the user if you should generate backend integration test?

    ```xml
    <ask_followup_question>
    <question>Do you want me to generate backend integration test now? </question>
    <options>["Yes", "No, I'll skip backend integration test"]</options>
    </ask_followup_question>
    ```

    - If user select "Yes", continue with the subsequent step: Generate a backend integration test checklist file.
    - If user select "No, I'll skip backend integration test: "Generate backend integration test", write a todo task for backend integration test of the feature into the activeContext.md file of the memory bank, then move on to the next phase "Generate frontend unit test"

2. Generate a backend integration test checklist file with .md format with name `backend-integration-test-checklist.md`
3. Ask the user if you should generate backend integration test now?

    ```xml
     <ask_followup_question>
     <question>Do you want to start generating backend integration test now follow the backend integration test checklist file? </question>
     <options>["Yes", "No, I'd like to regenerate the backend integration test checklist file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start generating backend integration test until completion, remember to update the backend integration test checklist file while you generate the tests. After finishing the tests generation, move on to the next stage: "Generate frontend unit test"
    - If user select "No, I'd like to regenerate the backend integration test checklist file", regenerate the backend integration test checklist file with the proposed adjustments from the user

## 7. Generate frontend unit test

1. Ask the user if you should generate frontend unit test?

    ```xml
    <ask_followup_question>
    <question>Do you want me to generate frontend unit test now? </question>
    <options>["Yes", "No, I'll skip frontend unit test"]</options>
    </ask_followup_question>
    ```

    - If user select "Yes", continue with the subsequent step: Generate a frontend unit test checklist file.
    - If user select "No, I'll skip frontend unit test: "Generate frontend unit test", write a todo task for frontend unit test of the feature into the activeContext.md file of the memory bank, then move on to the next phase "Generate frontend integration test"

2. Generate a frontend unit test checklist file with .md format with name `frontend-unit-test-checklist.md`
3. Ask the user if you should generate frontend unit test now?

    ```xml
     <ask_followup_question>
     <question>Do you want to start generating frontend unit test now follow the frontend unit test checklist file? </question>
     <options>["Yes", "No, I'd like to regenerate the frontend unit test checklist file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start generating frontend unit test until completion, remember to update the frontend unit test checklist file while you generate the tests. After finishing the tests generation, move on to the next stage: "Generate frontend integration test"
    - If user select "No, I'd like to regenerate the frontend unit test checklist file", regenerate the frontend unit test checklist file with the proposed adjustments from the user

## 8. Generate frontend integration test

1. Ask the user if you should generate frontend integration test?

    ```xml
    <ask_followup_question>
    <question>Do you want me to generate frontend integration test now? </question>
    <options>["Yes", "No, I'll skip frontend integration test"]</options>
    </ask_followup_question>
    ```

    - If user select "Yes", continue with the subsequent step: Generate a frontend integration test checklist file.
    - If user select "No, I'll skip frontend integration test: "Generate frontend integration test", write a todo task for frontend integration test of the feature into the activeContext.md file of the memory bank, then move on to the next phase "Write documentation for the feature"

2. Generate a frontend integration test checklist file with .md format with name `frontend-integration-test-checklist.md`
3. Ask the user if you should generate frontend integration test now?

    ```xml
     <ask_followup_question>
     <question>Do you want to start generating frontend integration test now follow the frontend integration test checklist file? </question>
     <options>["Yes", "No, I'd like to regenerate the frontend integration test checklist file"]</options>
     </ask_followup_question>
    ```

    - If user select "Yes", start generating frontend integration test until completion, remember to update the frontend integration test checklist file while you generate the tests. After finishing the tests generation, move on to the next stage: "Write documentation for the feature"
    - If user select "No, I'd like to regenerate the frontend integration test checklist file", regenerate the frontend integration test checklist file with the proposed adjustments from the user

## 9. Write documentation for the feature

Create a documentation file with the format:
**Filename:** `[dd/mm/yyyy]_[brief-description].md`

**Content structure:**

```

# [Feature Name] Implementation Summary

**Date:** [DD/MM/YYYY]
**Developer:** Cline AI Agent

## Overview

Brief description of the implemented feature

## Files Added

- **Frontend:**
    - `path/to/file.tsx` - Main component description
    - `path/to/styles.css` - Styling for component
- **Backend:**
    - `path/to/controller.js` - API endpoint handler
    - `path/to/model.js` - Database model


## Files Modified

- **Frontend:**
    - `existing/file.tsx` - Added integration with new feature
- **Backend:**
    - `existing/routes.js` - Added new route definitions


## Database Changes

- **Tables Modified:**
    - `users` - Added field `age` (INT)
    - `bookings` - Added index on `user_id`


## Impact Analysis

- **Scope:** Areas of application affected
- **Dependencies:** Other features that now depend on this
- **Breaking Changes:** Any backward compatibility issues


## Risk Considerations

- **Potential Issues:** Security concerns, performance impacts
- **Monitoring Points:** What to watch after deployment
- **Rollback Plan:** How to revert if issues arise


## Next Steps

- Items added to activeContext for future work
- Recommended follow-up tasks

```

## 10. Update memory bank

1. **Analyze git changes** in both frontend and backend repos
2. **Document database changes** from the MCP operations performed
3. **Update the files** in the memory-bank:
    - `activeContext.md`: Recent changes and next steps
    - `progress.md`: Feature completion status
    - `systemPatterns.md`: New patterns or architecture changes
    - `techContext.md`: Technology updates if any

</detailed_steps>

<notes>

# COMPLETION CRITERIA

Feature development is complete when:

-   [ ] All tasks in the checklist are marked as completed
-   [ ] Unit tests pass (or are deferred to activeContext)
-   [ ] Integration tests pass (or are deferred to activeContext)
-   [ ] Manual testing documentation is completed
-   [ ] The memory bank is updated with the latest changes
-   [ ] Developer documentation is created in the documents folder
-   [ ] All newly created code is committed

# Always maintain traceability from original requirements to implementation details to ensure no requirements are missed.

# ERROR HANDLING & RECOVERY

## Implementation Errors

-   **Validation checks** before each major step
-   **Incremental commits** for rollback capability
-   **Error documentation** in progress files

## Documentation Errors

-   **Template validation** before content generation
-   **Cross-reference checking** between documents
-   **Consistency verification** across all files

</notes>

<git_commit_guide>

# Keep comment message brief and concise

Example:

-   Feature: Advanced Search with Filtering
-   Implementation stage count: 4
-   Commit message stage 1 (frontend): [Advanced Search with Filtering] Setup
-   Commit message stage 2 (backend): [Advanced Search with Filtering] Setup
-   Commit message stage 3 (frontend): [Advanced Search with Filtering] Add components: FilterPanel.vue, MCSearchResults.vue
-   Commit message stage 4 (backend): [Advanced Search with Filtering] Add Filtering API: api/posts

</git_commit_guide>
