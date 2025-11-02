import { faker } from '@faker-js/faker'

class Login {
    preencherFormularioDePreCadastro() {
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        const timestamp = Date.now()


        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)

        cy.get('[data-qa="signup-email"]').type(faker.internet.email({firstName: `qa-tester-pgats${timestamp}`}))
        //cy.get('[data-qa="signup-email"]').type(faker.internet.email({firstName: 'qa-tester-pgats'}))

        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDePreCadastroComEmailExistente(name, email) {
        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormularioDeLogin(user, pass){
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(pass, {log: false})
        cy.get('[data-qa="login-button"]').click()
    }

}
export default new Login()


 
