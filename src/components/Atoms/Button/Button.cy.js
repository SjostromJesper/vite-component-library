import {mount} from 'cypress/vue'
import Button from './Button.vue'

describe('Button', () => {
    it('', () => {
        mount(Button)
        cy.get('.Button')
    })
})