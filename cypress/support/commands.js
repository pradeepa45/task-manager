Cypress.Commands.add("addTask", ({ title, description, due }) => {
  cy.get('.new-task-form input[name="title"]').type(title);
  cy.get('.new-task-form textarea[name="description"]').type(description);
  cy.get('.new-task-form input[name="due"]').type(due);
  cy.get('.new-task-form button[type="submit"]').click();
});

Cypress.Commands.add("editTask", (index, { title, description, due }) => {
  cy.get(`.task-list .card`)
    .eq(index)
    .within(() => {
      cy.get(".buttons-list button").first().click(); // Edit button

      if (title) {
        cy.get('input[name="title"]').clear().type(title);
      }
      if (description) {
        cy.get('textarea[name="description"]').clear().type(description);
      }
      if (due) {
        cy.get('input[name="due"]').clear().type(due);
      }

      cy.get(".buttons-list button").first().click(); // Save button
    });
});

Cypress.Commands.add("verifyTaskData", (index, { title, description, due }) => {
  cy.get(`.task-list .card`)
    .eq(index)
    .within(() => {
      if (title) {
        cy.get('input[name="title"]').should("have.value", title);
      }
      if (description) {
        cy.get('textarea[name="description"]').should(
          "have.value",
          description
        );
      }
      if (due) {
        cy.get('input[name="due"]').should("have.value", due);
      }
    });
});

Cypress.Commands.add("deleteTask", (index) => {
  cy.get(`.task-list .card`)
    .eq(index)
    .within(() => {
      cy.get(".buttons-list button").last().click(); // Delete button
    });
});

// Usage in test file
