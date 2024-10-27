import moment from "moment";

export class TaskManager {
  elements = {
    taskForm: {
      form: () => cy.get(".new-task-form"),
      titleInput: () => cy.get('.new-task-form input[name="title"]'),
      descriptionInput: () =>
        cy.get('.new-task-form textarea[name="description"]'),
      dueInput: () => cy.get('.new-task-form input[name="due"]'),
      submitButton: () => cy.get('.new-task-form button[type="submit"]'),
    },
    taskList: {
      container: () => cy.get(".task-list"),
      cards: () => cy.get(".task-list .card"),
      firstCard: () => cy.get(".task-list .card").first(),
      buttonsList: () => cy.get(".buttons-list"),
      editButton: () => cy.get(".task-list .buttons-list .edit-button").first(),
      deleteButton: () =>
        cy.get(".task-list .buttons-list .delete-button").eq(1),
      saveButton: () => cy.get(".task-list .buttons-list .edit-button").eq(1),
    },
    taskFields: {
      title: () => cy.get('.task-list .card input[name="title"]'),
      description: () =>
        cy.get('.task-list .card textarea[name="description"]'),
      due: () => cy.get('.task-list .card input[name="due"]'),
      firstTitle: () => cy.get('.task-list .card input[name="title"]').first(),
      firstDescription: () =>
        cy.get('.task-list .card textarea[name="description"]').first(),
      firstdue: () => cy.get('.task-list .card input[name="due"]').first(),
    },
  };

  visitHomePage() {
    cy.visit("/");
  }

  addNewTask(taskData) {
    this.elements.taskForm.titleInput().type(taskData.title);
    this.elements.taskForm.descriptionInput().type(taskData.description);
    this.elements.taskForm.dueInput().type(taskData.due);

    this.elements.taskForm.form().submit();
  }

  editFirstTask(newTaskData) {
    const firstTask = this.elements.taskList.editButton().first();

    firstTask.click();

    this.elements.taskFields
      .title()
      .first()
      .should("be.visible")
      .and("be.enabled")
      .clear()
      .type(newTaskData.title, { delay: 50 });

    this.elements.taskFields
      .description()
      .first()
      .should("be.visible")
      .and("be.enabled")
      .clear()
      .type(newTaskData.description, { delay: 50 });

    this.elements.taskFields
      .due()
      .first()
      .should("be.visible")
      .and("be.enabled")
      .clear()
      .type(newTaskData.due, { delay: 50 });

    // Save changes (single click should be enough)
    this.elements.taskList.editButton().first().click();
  }

  verifyTaskFieldsReadOnly(shouldBeReadOnly) {
    cy.wait(3000);

    this.elements.taskFields
      .title()
      .should(shouldBeReadOnly ? "have.attr" : "not.have.attr", "readonly");
    this.elements.taskFields
      .description()
      .should(shouldBeReadOnly ? "have.attr" : "not.have.attr", "readonly");
  }

  verifyFirstTaskData(taskData) {
    cy.wait(3000);

    this.elements.taskFields
      .title()
      .first()
      .should("be.visible")
      .should("have.value", taskData.title);

    this.elements.taskFields
      .description()
      .first()
      .should("be.visible")
      .should("have.value", taskData.description);
  }

  verifyTaskFieldsEditable(shouldBeReadOnly) {
    cy.wait(3000);

    this.elements.taskFields
      .title()
      .should(shouldBeReadOnly ? "have.attr" : "not.have.attr", "readonly");
    this.elements.taskFields
      .description()
      .should(shouldBeReadOnly ? "have.attr" : "not.have.attr", "readonly");
    this.elements.taskFields
      .due()
      .should(shouldBeReadOnly ? "have.attr" : "not.have.attr", "readonly");
  }

  verifyPaginationBar() {
    cy.wait(3000);

    cy.get(".pagination-bar").find("button").should("have.length", 2);
  }

  verifyResetFilters() {
    cy.get(".reset-button", { timeout: 10000 }).should("exist");

    if (this.url !== "/") {
      cy.get(".reset-button").should("be.disabled");
    } else {
      cy.get(".reset-button").should("not.be.disabled");
    }
  }

  verifySort() {
    cy.get("details .filters .sort-button span").first().contains("due date");
    cy.get("details .filters .sort-button span").last().contains("status");

    // Open sort details and trigger sort
    cy.get("details summary").eq(1).click();
    cy.get("details .filters .sort-button").first().dblclick();

    // Verify URL parameter
    cy.url().should("include", "?sort=due");

    cy.get(".task-list .card .due-date").then(($dueTags) => {
      const dates = $dueTags
        .toArray()
        .map((el) => moment(el.textContent, "DD/MM/YYYY"));

      for (let i = 0; i < dates.length - 1; i++) {
        expect(dates[i].isSameOrAfter(dates[i + 1])).to.be.false;
      }
    });
  }

  verifyFilter() {
    cy.get("details .filters .filter-wrapper").should("have.length", 2);
    cy.get("details summary").eq(2).click();

    cy.get("details .filters .filter-wrapper")
      .eq(0)
      .find("strong")
      .contains("due date");
    cy.get("details .filters .filter-wrapper")
      .eq(1)
      .find("strong")
      .contains("status");

    cy.get("details .filters .filter-wrapper")
      .eq(1)
      .find("select")
      .select("in_progress");

    cy.url().should("include", "/?filterBy=status&value=in_progress");

    this.elements.taskList
      .cards()
      .get("#status-tag")
      .each(($el) => {
        cy.wrap($el).contains("In progress");
      });
  }
}

export const taskManager = new TaskManager();
