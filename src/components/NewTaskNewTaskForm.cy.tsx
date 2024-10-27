import React from 'react'
import NewTaskForm from './NewTask'

describe('<NewTaskForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewTaskForm />)
  })
})