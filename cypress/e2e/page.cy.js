import { taskManager } from "../support/page-objects/page";

describe("Task Manager - add and edit", () => {
  const testTask = {
    title: "Task title",
    description: "This is a sample task from cypress",
    due: "2025-03-20",
  };
  const updatedTask = {
    title: "New title",
    description: "New description",
    due: "2025-07-21",
  };

  let initialApiResponse;

  before(() => {
    cy.intercept("GET", "/").as("getTasks");
    cy.visit("/");
    cy.wait("@getTasks").then((interception) => {
      initialApiResponse = interception.response.body;
    });
  });

  beforeEach(() => {
    cy.intercept("GET", "/", (req) => {
      if (initialApiResponse) {
        req.reply(initialApiResponse);
      }
    }).as("getTasks");

    cy.visit("/", {
      onBeforeLoad: (win) => {
        Object.defineProperty(win, "localStorage", {
          value: {
            getItem: cy.stub().returns(null),
            setItem: cy.stub(),
            removeItem: cy.stub(),
            clear: cy.stub(),
          },
        });
      },
    });
  });

  it("should not submit form with empty required fields", () => {
    taskManager.elements.taskForm.submitButton().click();
    taskManager.elements.taskFields
      .title()
      .first()
      .should("not.equal", testTask.title);
    taskManager.elements.taskFields
      .description()
      .first()
      .should("not.equal", testTask.description);
  });

  it("should be able to fill the form to add a new task", () => {
    taskManager.addNewTask(testTask);
    taskManager.elements.taskList.editButton().dblclick();
  });

  it("should add a card on the UI", () => {
    taskManager.verifyFirstTaskData(testTask);
  });

  it("task should have edit and delete buttons", () => {
    taskManager.elements.taskList
      .cards()
      .first()
      .find(".buttons-list button")
      .should("have.length", 2);
  });

  it("all task properties should be readonly initially", () => {
    taskManager.verifyTaskFieldsReadOnly(true);
  });

  it("should be able to edit the task", () => {
    cy.get(".task-list").should("exist");

    taskManager.editFirstTask(updatedTask);
    cy.wait(2000);

    taskManager.verifyFirstTaskData(updatedTask);
  });
});

describe("Task Manager - delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("DELETE", "**/rest/v1/todos*").as("deleteTodo");
  });

  it("should not delete the first card when cancelled", () => {
    cy.get(".card").then(($cards) => {
      const initialCount = $cards.length;
      cy.on("window:confirm", () => false);
      cy.get(".card").find("form").first().submit();
      cy.get("@deleteTodo.all").should("have.length", 0);
      cy.get(".card").should("have.length", initialCount);
    });
  });

  it("should delete the first card when confirmed", () => {
    cy.get(".card").then(($cards) => {
      const initialCount = $cards.length;
      cy.on("window:confirm", () => true);
      cy.get(".card").first().find(".delete-button").click();
      cy.wait("@deleteTodo").its("response.statusCode").should("eq", 204);
      cy.get(".task-list .card").should("have.length", initialCount - 1);
    });
  });
});

describe("Task Manager - navigation and filter", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have pagination bar with 2 buttons", () => {
    taskManager.verifyPaginationBar();
  });

  it("should have sort by due date and sort by status", () => {
    taskManager.verifySort();
  });

  it("should have filter by due date and filter by status", () => {
    taskManager.verifyFilter();
  });

  it("should have a reset filters button", () => {
    taskManager.verifyResetFilters();
  });
});
