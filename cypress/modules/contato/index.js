import { faker } from '@faker-js/faker'

class Contato {
    preencherFormularioContactUs() {
        cy.get('a[href*=contact]').click()
        cy.get('[data-qa="name"]').type(faker.person.fullName())
        cy.get('[data-qa="email"]').type(faker.internet.email())
        cy.get('[data-qa="subject"]').type('Teste')
        cy.get('[data-qa="message"]').type('kskamsasasasiajsialskals')

        cy.fixture('dadosUsuario.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')

        //Act
        cy.get('[data-qa="submit-button"]').click()
    }
}

export default new Contato()