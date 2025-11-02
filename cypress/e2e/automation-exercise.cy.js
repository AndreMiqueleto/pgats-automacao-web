

/// <reference types="cypress" />

/*
    Hooks

*/

import userData from '../fixtures/dadosUsuario.json'
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker'

describe('Automation Exercise', () => {
    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com')
        cy.get('a[href="/login"]').click()

    });

    it('Cadastrar um usuário', () => {
        cy.get('[data-qa="signup-name"]').type(userData.name)
        
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click()

        // radio ou checkboxes -> check
        // cy.get('input[type=radio]').check('Mr')
        cy.get('#id_gender1').check()

        cy.get('input#password').type('123456', {log: false})


        //Para seletores e combobox
        cy.get('[data-qa="days"]').select('13')
        cy.get('[data-qa="months"]').select('September')
        cy.get('[data-qa="years"]').select('1988')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}` )


        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('United States')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())

        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('12345678')

        // Act
        cy.get('[data-qa="create-account"]').click()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b','Account Created!') //usar visible aqui fica redundante
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')




    })


    // qa-tester-1760396019529@test.com

    it('Login de usuário com email e senha corretos', () => {

        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type(userData.password, {log: false})

        cy.get('[data-qa="login-button"]').click()

        cy.get('.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('Login de usuário com email e senha incorretos', () => {

        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type('1234', {log: false})

        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    
    })

    it('Logout de usuario', () => {
        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type(userData.password, {log: false})
        

        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', userData.name)

        //Act
        cy.get('a[href="/logout"]').should('be.visible').click()

        //Assert
        cy.url().should('contain', 'login')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain','Signup / Login')
    })


    it('Cadastrar usuario com email existente', () => {
        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(userData.email)

        //Act
        cy.contains('button', 'Signup').click()

        //Assert
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    })

    it('Preencher formulario Contact us com upload de arquivo', () => {
        cy.get('a[href*=contact]').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)
        
        
        cy.fixture('dadosUsuario.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')

        //Act
        cy.get('[data-qa="submit-button"]').click()

        //Assert
         cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
    })

})


