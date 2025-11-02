import { faker } from '@faker-js/faker'

class Cadastro {
    preencherFormularioDeCadastroCompleto() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        cy.get('#id_gender1').check()
        cy.get('input#password').type('123456', {log: false})

        //Para seletores e combobox
        cy.get('[data-qa="days"]').select('13')
        cy.get('[data-qa="months"]').select('September')
        cy.get('[data-qa="years"]').select('1988')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(`${firstName}`)
        cy.get('input#last_name').type(`${lastName}`)
        cy.get('input#company').type(`PGATS ${faker.company.name()}` )


        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('United States')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())

        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('12345678')

        // Act
        cy.get('[data-qa="create-account"]').click()
    }

    clicarBotaoContinuar(){
        cy.get('[data-qa="continue-button"]').click()
    }
}
export default new Cadastro()

        